import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public continueAction: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
  ) { }

  ngOnInit(): void {
  }

  goOn(): void {
    this.continueAction.emit(true);
  }
}
