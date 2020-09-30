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
import Point from 'ol/geom/Point';
import XYZ from 'ol/source/XYZ';
import MousePosition from 'ol/control/MousePosition';
import {transform} from 'ol/proj';



export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';
export const DEFAULT_ZOOM = 16;


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

  private map: Map;
  private markerLayer: VectorLayer;
  private iconStyle = new Style({
    image: new Icon({
      anchor: [12, 12],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: 'data/icon.png',
    }),
  });


  public clickedLocation = '';
  public coordinates = [];
  private crumCoordinates = [-96.935521, 19.551221]; // long lat
  public mapEl: HTMLElement;


  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number | number = DEFAULT_ZOOM;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;


  constructor(
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    private elRef: ElementRef
  ) { }


  ngOnInit(): void {
    // this.initMap();
    this.mapEl = this.elRef.nativeElement.querySelector('#map');
    this.setMapSize(); // important to render map
    this.initMarkerLayer(); // setup vectorLayer for marker
  }


  ngAfterViewInit(): void {
    this.initMap(); // wait to safely initialize
  }

  private initMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: Infinity,
           source: new OSM()
        })
      ],
      view: new View({
        projection: 'EPSG:3857', // se utiliza la projección default para cargar Tiles
        center: olProj.fromLonLat(this.crumCoordinates),
        zoom: this.zoom
      }),
    });
  }

  private initMarkerLayer(): VectorLayer {
    const iconFeature = new Feature({
      geometry: new Point([0, 0]),
      name: 'Incident',
    });

    // const iconStyle = new Style({
    //   image: new Icon({
    //     anchor: [0.5, 46],
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'pixels',
    //     src: 'data/icon.png',
    //   }),
    // });

    iconFeature.setStyle(this.iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    return vectorLayer;
  }

  public catchCoordinates(event: any): void {
    // Se convierte a las coordenadas correctas
    this.coordinates = transform(
      this.map.getEventCoordinate(event),
      'EPSG:3857',
      'EPSG:4326');
    this.clickedLocation = `${this.coordinates[0]}, ${this.coordinates[1]}`;
    this.renderMarker();
  }

  public renderMarker(): void {
    const layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point( olProj.fromLonLat( [this.coordinates[0], this.coordinates[1]]) )
            // geometry: new olProj.geom.Point( olProj.proj.fromLonLat( [this.crumLon, this.crumLat]) )
          })
        ]
      })
    });

    // get markerLayer, set the point coords in
    this.map.addLayer(layer);
  }

  public toClipboard(): void {
    this.clipboard.copy(this.clickedLocation);
    this.snackbar.open('Coordinadas copiadas a portapapeles', 'X', {duration: 3500});
  }

  private setMapSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height || DEFAULT_HEIGHT);
      styles.width = coerceCssPixelValue(this.width || DEFAULT_WIDTH);
    }
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
