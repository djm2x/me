import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { Routes, RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';
import { ManageFilesModule } from 'src/app/modules/manage-files/manage-files.module';
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: ProjectComponent }
];
@NgModule({
  declarations: [ProjectComponent, UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    ManageFilesModule,
  ]
})
export class ProjectModule { }
