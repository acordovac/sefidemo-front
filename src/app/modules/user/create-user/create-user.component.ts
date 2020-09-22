import {AfterViewInit, Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../shared/models/user";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, AfterViewInit {


  public form: FormGroup;
  public closeAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  public saveAction: EventEmitter<User> = new EventEmitter<User>();
   // public sub: Subscription = this.form.valueChanges.subscribe();

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
    // this.form.
  }


  formChanged() {
    return !this.form.valueChanges;
  }

  public save(): void {
    let createdUser: User = this.form.getRawValue();
    this.saveAction.emit(createdUser);
    this.closeAction.emit(true);
  }
}
