import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MapDialogComponent} from "../../../shared/components/map-dialog/map-dialog.component";

@Component({
  selector: 'app-map-doc',
  templateUrl: './map-doc.component.html',
  styleUrls: ['./map-doc.component.css']
})
export class MapDocComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public openMap():void {
    this.dialog.open(MapDialogComponent, {
      width: '80%'
    })
  }
}
