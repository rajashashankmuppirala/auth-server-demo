import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuccessComponent} from "./success.component";

//const routes: Routes = [];
const routes: Routes = [
  { path: '/success', component: SuccessComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
