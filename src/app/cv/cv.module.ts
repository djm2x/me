import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from '../mat.module';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';


@NgModule({
  declarations: [CvComponent, CurriculumVitaeComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    HttpClientModule,
    MatModule,
  ]
})
export class CvModule { }
