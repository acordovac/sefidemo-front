import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";

declare var ol: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {

  public map: any;
  public clickedLocation = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new ol.Map({
      layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
      target: 'map2',
      view: new ol.View({
        // projection: 'EPSG:4326',
        center: ol.proj.fromLonLat([-96.935521,19.551221]),
        zoom: 15})
    });

  }
  //
  // private layersClick() {
  //   let that = this;
  //   let olCtrl = ol.Control.Click = ol.Class(ol.Control, {
  //
  //     defaultHandlerOptions: {
  //       'single': true,
  //       'double': false,
  //       'pixelTolerance': 0,
  //       'stopSingle': false,
  //       'stopDouble': false
  //     },
  //
  //     initialize: function(options) {
  //       this.handlerOptions = ol.Util.extend(
  //         {}, this.defaultHandlerOptions
  //       );
  //       ol.Control.prototype.initialize.apply(
  //         this, arguments
  //       );
  //       this.handler = new ol.Handler.Click(
  //         this, {
  //           'click': this.trigger
  //         }, this.handlerOptions
  //       );
  //     },
  //
  //     trigger: function(e) {
  //       var lonlat = that.map.getLonLatFromViewPortPx(e.xy);
  //       // alert("You clicked near " + lonlat.lat + " N, " +  + lonlat.lon + " E");
  //       that.clickedLocation = `${lonlat.lat}, ${lonlat.lon}`;
  //
  //     }
  //
  //   });
  // }

  catchCoordinates(event) {
    // console.log(event);
    let coordsArray = this.map.getEventCoordinate(event);
    console.log();
    this.clickedLocation = `${coordsArray[0]}, ${coordsArray[1]}`;
  }

  public toClipboard() {
    this.clipboard.copy(this.clickedLocation);
    this.snackbar.open('Coordinadas copiadas a portapapeles', 'X', {duration: 3500})
  }

}
