import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ResourceComponent} from "./resource.component";
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SuccessComponent} from "./success.component";

@NgModule({
  declarations: [
    AppComponent,
    ResourceComponent,
    HomeComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {path: 'success', component: SuccessComponent}], {onSameUrlNavigation: 'reload'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
