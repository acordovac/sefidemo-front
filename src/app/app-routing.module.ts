import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {LoginComponent} from "./shared/components/login/login.component";
import {MapDialogComponent} from './shared/components/map-dialog/map-dialog.component';
import {MapDocComponent} from "./modules/osm-map/map-doc/map-doc.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  // {path: 'location', component: MapDialogComponent},
  {path: 'location', component: MapDocComponent},
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
