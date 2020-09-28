import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LocationComponent} from "../../shared/components/location/location.component";

declare var ol: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public map: any;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.initMap();
  }

  ngAfterViewInit(): void {

  }

  openMap(): void {
    let mapDialog = this.dialog.open(LocationComponent, {
      width: '75%',
      maxWidth: '90%'

    });

  }


}
