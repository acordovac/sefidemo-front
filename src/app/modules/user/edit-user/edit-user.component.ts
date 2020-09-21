import {AfterViewInit, Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, AfterViewInit {

  public form: FormGroup;
  public closeAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  public saveAction: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public formBuilder: FormBuilder) {
    this.form =  this.formBuilder.group({
      nombre: [''],
      primerApellido: [''],
      segundoApellido: ['']
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form.patchValue(this.data.object);
  }

  public closeBtn(): void {
    this.closeAction.emit(true);
  }

}
