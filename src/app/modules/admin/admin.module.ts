import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {EditUserComponent} from './edit-user/edit-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AdminComponent,
    EditUserComponent,
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
  ],
})
export class AdminModule { }
