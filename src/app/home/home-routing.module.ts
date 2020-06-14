import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
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
export class HomeRoutingModule { }
