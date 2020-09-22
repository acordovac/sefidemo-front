import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {EditUserComponent} from '../user/edit-user/edit-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ListUserComponent} from "../user/list-user/list-user.component";
import {CreateUserComponent} from "../user/create-user/create-user.component";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";



@NgModule({
  declarations: [
    AdminComponent,
    CreateUserComponent,
    ListUserComponent,
    EditUserComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
})
export class AdminModule { }
