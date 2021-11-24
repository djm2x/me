import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../mat.module';
import { MyMenuModule } from '../modules/menu/my.menu.module';
import { ThemeModule } from '../shared/theme.module';


@NgModule({
  declarations: [
    LabComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
    ThemeModule,
    MyMenuModule,
  ]
})
export class LabModule { }
