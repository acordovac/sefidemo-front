import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";

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
import Point from "ol/geom/Point";
import XYZ from "ol/source/XYZ";



export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {

  public map: Map;
  public clickedLocation = '';
  public coordinates = [];
  public crumLon = -96.935521;
  public crumLat = 19.551221;
  public mapEl: HTMLElement;


  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;


  constructor(
    // @Inject(MAT_DIALOG_DATA)
    // private data: any,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    private elRef: ElementRef
  ) { }


  ngOnInit(): void {
    // this.initMap();
    this.mapEl = this.elRef.nativeElement.querySelector('#map');
    this.setSize();
  }


  ngAfterViewInit(): void {
    this.initMap();
  }



  private initMap(): void {
    // this.map = new Map({
    //   target: 'map2',
    //   layers: [new TileLayer({source: new OSM()})],
    //   view: new View({
    //     // projection: 'EPSG:4326',
    //     center: olProj.fromLonLat([this.crumLon, this.crumLat]),
    //     zoom: 15})
    // });
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
           source: new OSM()
          // source: new XYZ({
          //   url: 'https://{a-c}.tile.openstreetmap.com/{z}/{x}/{y}.png'
          // })
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.crumLon, this.crumLat]),
        zoom: 10
      }),
      // controls: defaultControls({})
    });
  }

  private setMapTarget() {
    // this.map.setTarget('map2');
  }

  catchCoordinates(event) {
    console.log(event);
    // console.log(ol);
    // console.log(ol.proj.getPointResolution());
    // ol.proj.useGeographic();
    this.coordinates = this.map.getEventCoordinate(event);
    console.log(this.coordinates);
    this.clickedLocation = `${this.coordinates[0]}, ${this.coordinates[1]}`;
    // this.clickedLocation = `${parseFloat(this.coordinates[0])}, ${parseFloat(this.coordinates[1])}`;

    this.renderMarker();
  }

  public renderMarker() {
    let layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point( olProj.fromLonLat( [this.coordinates[0], this.coordinates[1]]) )
            // geometry: new olProj.geom.Point( olProj.proj.fromLonLat( [this.crumLon, this.crumLat]) )
          })
        ]
      })
    });
    this.map.addLayer(layer);
  }

  public toClipboard() {
    this.clipboard.copy(this.clickedLocation);
    this.snackbar.open('Coordinadas copiadas a portapapeles', 'X', {duration: 3500})
  }

  private setSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height || DEFAULT_HEIGHT);
      styles.width = coerceCssPixelValue(this.width || DEFAULT_WIDTH);
    }
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value:any ): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
