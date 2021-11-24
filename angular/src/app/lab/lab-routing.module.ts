import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: LabComponent,
    children: [
      { path: '', redirectTo: 'mytable', pathMatch: 'full' },
      { path: 'mytable', loadChildren: () => import('./mytable/mytable.module').then(m => m.MytableModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
