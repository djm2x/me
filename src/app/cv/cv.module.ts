import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from '../mat.module';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CvComponent, CurriculumVitaeComponent,],
  imports: [
    CommonModule,
    CvRoutingModule,
    HttpClientModule,
    // MatModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
  ]
})
export class CvModule { }
