import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MytableComponent } from './mytable.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../table/table.module';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: '', component: MytableComponent },
  { path: 'update/:id', component: UpdateComponent },
];

@NgModule({
  declarations: [
    MytableComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
  ]
})
export class MytableModule { }
