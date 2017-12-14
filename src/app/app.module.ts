import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from 'ngx-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    //HttpModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
