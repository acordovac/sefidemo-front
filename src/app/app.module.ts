import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import { UserPipe } from './shared/pipes/user/user.pipe';
import { LoginComponent } from './shared/components/login/login.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import { LocationComponent } from './shared/components/location/location.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MapDialogComponent } from './shared/components/map-dialog/map-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule} from "@angular/material/autocomplete";
import { MapDocComponent } from './modules/osm-map/map-doc/map-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserPipe,
    LoginComponent,
    LocationComponent,
    MapDialogComponent,
    MapDocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // vendor
  //  material modules
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,



    // OSM

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
