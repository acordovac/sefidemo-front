import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import {transform} from 'ol/proj';
import Point from 'ol/geom/Point';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import Interaction from 'ol/interaction/Interaction';
import Collection from 'ol/Collection';
import DragRotate from 'ol/interaction/DragRotate';
import DragPan from 'ol/interaction/DragPan';
import PinchRotate from 'ol/interaction/PinchRotate';
import PinchZoom from 'ol/interaction/PinchZoom';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import KeyboardZoom from 'ol/interaction/KeyboardZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import DragZoom from 'ol/interaction/DragZoom';
import {NominatimOsmService} from "../../../core/services/nominatim-osm/nominatim-osm.service";
import {FormControl} from "@angular/forms";
import {Coordinate} from "ol/coordinate";
import {NominatimResponse} from "../../models/nominatim-response";
import {debounceTime, filter, switchMap, tap} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";


export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';
export const DEFAULT_ZOOM = 16;
export const CRUM_COORDINATES = [-96.935521, 19.551221]; // long lat
export const GM_URL_BASE = 'https://www.google.com/maps/search/?api=1&';



/**
 * Component to draw a OpenStreetMap style map with custom marker
 * a través de la api OpenLaayers
 */
@Component({
  selector: 'osm-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit, AfterViewInit {

  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number | number = DEFAULT_ZOOM;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  private map: Map;
  public mapEl: HTMLElement;
  private markerLayer: VectorLayer;
  private markerSource: VectorSource;
  private markerFeature: Feature;

  private markerCounter = 1;
  public clickedLocation = '';
  public displayAddress = '';
  public mapsUrl = '';
  public coordinates = [];
  public searchInput = new FormControl('');
  public foundAddresses: NominatimResponse[];

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private elRef: ElementRef,
    private searchService: NominatimOsmService,
  ) { }


  ngOnInit(): void {
    this.mapEl = this.elRef.nativeElement.querySelector('#map');
    this.setMapSize(); // IMPORTANT to render map
    this.nominatimSearch();
  }

  ngAfterViewInit(): void {
    this.initMarkerLayer(); // setup vectorLayer for marker
    this.initMap(); // wait to safely initialize
  }

  private initMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: Infinity, // preload low res tiles
           source: new OSM()
        }),
        this.markerLayer,
      ],
      view: new View({
        projection: 'EPSG:3857', // default projection used for coordinate values
        center: olProj.fromLonLat(CRUM_COORDINATES),
        zoom: this.zoom
      }),
      interactions: new Collection<Interaction>([
        new DragRotate(),
        // new DoubleClickZoom().setActive(false),  // omitted to disable
        new DragPan(),
        new PinchRotate(),
        new PinchZoom(),
        new KeyboardPan(),
        new KeyboardZoom(),
        new MouseWheelZoom(),
        new DragZoom(),
      ])
    });
  }

  /**
   * Initialize a Layer fot the marker
   */
  private initMarkerLayer(): void {
    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({source: this.markerSource});
  }

  /**
   * Handler por double click, it will obtain the EPSG:3857 coordinates from the click event,
   * and transform it to EPSG:44326 format, readable by google maps.
   * @param event the UI event
   */
  public catchCoordinates(event: any): void {
    // prevent rendering a marker when double click on a control
    if (event.target.tagName !== 'BUTTON') {
      // Parse to correct projection coordinate format
      this.coordinates = transform(
        this.map.getEventCoordinate(event),
        'EPSG:3857',
        'EPSG:4326');
      this.clickedLocation = `${this.formatDecimals(this.coordinates[0])}, ${this.formatDecimals(this.coordinates[1])}`;
      this.displayAddress = this.clickedLocation;
      this.mapsUrl = this.buildGMapsURL();
      this.renderMarker();
    }
  }

  /**
   * @desc Read this instance's coordinates to create a Point and attempt to initialize a Feature
   * with a custom icon. If a markerFeature already exists, it will update the feature with the newly created Point.
   */
  private renderMarker(): void {
    // parse coords from previous event catch
    const markerCoords = [parseFloat(this.formatDecimals(this.coordinates[0])), parseFloat(this.formatDecimals(this.coordinates[1]))];
    if (!this.markerFeature) {
      // initialize and set feature
      this.markerFeature = new Feature({
        geometry: new Point(olProj.fromLonLat(markerCoords)),
        name: 'marker' + this.markerCounter,
      });

      this.markerCounter++; // advance counter
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 400],
          anchorXUnits: IconAnchorUnits.FRACTION,
          anchorYUnits: IconAnchorUnits.PIXELS,
          src: 'assets/images/pinpoint2.png',
          scale: 0.05,
        }),
      });

      this.markerFeature.setStyle(iconStyle);
      this.markerSource.addFeature(this.markerFeature);

    } else {
      // update feature's Point
      this.markerFeature.setGeometry(
        new Point( olProj.fromLonLat(markerCoords) )
      );
    }
  }

  /**
   * Setup a listener for the search input change, then consume the nominatim service to return matches
   */
  public nominatimSearch(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(500), // debounce user input to prevent too many requests
      tap(value => this.foundAddresses = []),
      filter(value => value != '' && value.length > 2), // prevent requests while value is empty or less than 3 chars long
      switchMap(value => this.searchService.getCoordsFromOpenSearch(value))
    ).subscribe( res => {
      if (res.length > 0) {
        this.foundAddresses = res;
      } else {
        this.foundAddresses = [];
        this.snackBar.open('No se ha encontrado una dirección. Intente de nuevo', 'X', {duration: 3500});
      }
    });
  }

  /**
   * Center map at this instance's coordinates
   */
  private setCenter() {
    const view = this.map.getView();
    view.setCenter(olProj.fromLonLat(this.coordinates));
    view.setZoom(18);
  }

  /**
   * handler to render markers from search input's auto complete options
   * @param addressObj
   */
  renderSearchItem(addressObj: NominatimResponse) {
    // set this instances coordinates
    this.coordinates = addressObj.getCoordinate();
    this.mapsUrl = this.buildGMapsURL();
    this.renderMarker();
    // set address display name in chip
    this.displayAddress = addressObj.address;
    this.setCenter();
  }

  public toClipboard(option: boolean): void {
    if (this.clickedLocation) {
      if (option) {
        this.clipboard.copy(this.clickedLocation);
        this.snackBar.open('Coordinadas copiadas a portapapeles', 'X', {duration: 3500});
      } else {
        this.clipboard.copy(this.mapsUrl);
        this.snackBar.open('URL de maps copiada a portapapeles', 'X', {duration: 3500});
      }
    }
  }

  private setMapSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height || DEFAULT_HEIGHT);
      styles.width = coerceCssPixelValue(this.width || DEFAULT_WIDTH);
    }
  }

  /**
   * Open new browser tab with generated google maps URL
   */
  public openTab(): void {
    window.open(this.mapsUrl, 'blank');
  }

  private buildGMapsURL(): string {
    return `${GM_URL_BASE}query=${this.formatDecimals(this.coordinates[1])},${this.formatDecimals(this.coordinates[0])}`;
  }

  private formatDecimals(coord: string): string {
    return parseFloat(coord).toFixed(8);
  }


  /**
   * Passes empty string to searchInput after choosing an option, in order to prevent firing unwanted search request
   */
  public displayFn(): string {
    return '';
  }

}


const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
