import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';


const routes: Routes = [
  { path: 'portfolio', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: PortfolioComponent,
    // children: [
    //   { path: '', redirectTo: 'dash', pathMatch: 'full'},
    //   { path: 'dash', component: DashComponent },
    //   { path: 'general', component: GeneralComponent },
    //   { path: 'wifi', component: WifiComponent },

    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
