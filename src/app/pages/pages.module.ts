import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class PagesModule { }
