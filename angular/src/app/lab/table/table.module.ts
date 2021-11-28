import { UpdateComponent } from './update/update.component';
import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from '../../mat.module';
import { UpdatePageComponent } from './update-page/update-page.component';

@NgModule({
  declarations: [
    TableComponent,
    UpdateComponent,
    UpdatePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
  ],
  exports: [
    TableComponent,
    UpdatePageComponent,
  ]
})
export class TableModule { }
