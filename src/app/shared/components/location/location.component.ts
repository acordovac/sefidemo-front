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
import IconAnchorUnits from "ol/style/IconAnchorUnits";


export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';
export const DEFAULT_ZOOM = 16;
export const CRUM_COORDINATES = [-96.935521, 19.551221]; // long lat


/**
 * Componente que genera un mapa con imágenes de OpenStreetMap
 * a través de la api OpenLaayers
 */
@Component({
  selector: 'osm-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {

  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number | number = DEFAULT_ZOOM;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  private map: Map;
  private markerLayer: VectorLayer;
  private markerSource: VectorSource;
  private markerFeature: Feature;
  private gmUrlBase = 'https://www.google.com/maps/search/?api=1&query='
  private markerCounter = 1;

  public clickedLocation = '';
  public mapsUrl = '';
  public mapEl: HTMLElement;
  public coordinates = [];


  constructor(
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    private elRef: ElementRef
  ) { }


  ngOnInit(): void {
    this.mapEl = this.elRef.nativeElement.querySelector('#map');
    this.setMapSize(); // important to render map
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
          preload: Infinity, // pre render lo res tiles
           source: new OSM()
        }),
        this.markerLayer,
      ],
      view: new View({
        projection: 'EPSG:3857', // se utiliza la projección default para cargar Tiles
        center: olProj.fromLonLat(CRUM_COORDINATES),
        zoom: this.zoom
      }),
    });
  }

  private initMarkerLayer(): void {
    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({source: this.markerSource,});
  }

  public catchCoordinates(event: any): void {
    console.log(event.target);
    if (event.target.tagName.includes('button')) {
      console.warn('Its button!')
    } else {
      console.warn('Its map!')
    }
    // Se convierte a las coordenadas correctas
    this.coordinates = transform(
      this.map.getEventCoordinate(event),
      'EPSG:3857',
      'EPSG:4326');
    this.clickedLocation = `${this.formatDecimals(this.coordinates[0])}, ${this.formatDecimals(this.coordinates[1])}`;
    this.mapsUrl = `${this.gmUrlBase}${this.formatDecimals(this.coordinates[1])},${this.formatDecimals(this.coordinates[0])}`;
    this.renderMarker();
  }


  public renderMarker(): void {
    const markerCoords = [parseFloat(this.formatDecimals(this.coordinates[0])), parseFloat(this.formatDecimals(this.coordinates[1]))]; // create coords format from previous catch
    if (!this.markerFeature) { // initialize feature
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
      this.markerFeature.setGeometry(new Point(olProj.fromLonLat(markerCoords)));
    }
  }

  private formatDecimals(coord: string): string {
    return parseFloat(coord).toFixed(8);
  }

  public toClipboard(option: boolean): void {
    if (option) {
      this.clipboard.copy(this.clickedLocation);
      this.snackbar.open('Coordinadas copiadas a portapapeles', 'X', {duration: 3500});
    } else {
      this.clipboard.copy(this.mapsUrl);
      this.snackbar.open('URL de maps copiada a portapapeles', 'X', {duration: 3500});
    }
  }

  private setMapSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height || DEFAULT_HEIGHT);
      styles.width = coerceCssPixelValue(this.width || DEFAULT_WIDTH);
    }
  }

  openTab() {
    window.open(this.mapsUrl, 'blank');
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
