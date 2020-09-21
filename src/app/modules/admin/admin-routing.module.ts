import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {ListUserComponent} from "../user/list-user/list-user.component";

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'users', component: ListUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
