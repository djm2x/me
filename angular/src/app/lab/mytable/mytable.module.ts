import { UpdateComponent } from './table/update/update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MytableComponent } from './mytable.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';


const routes: Routes = [
  { path: '', component: MytableComponent }
];

@NgModule({
  declarations: [
    MytableComponent,
    TableComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
  ]
})
export class MytableModule { }
