import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';
import { ThemeModule } from '../shared/theme.module';
import { MyMenuModule } from '../modules/menu/my.menu.module';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule), },
      { path: 'languages', loadChildren: () => import('./language/language.module').then(m => m.LanguageModule), },
      { path: 'projects', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), },
      { path: 'skills', loadChildren: () => import('./skill/skill.module').then(m => m.SkillModule), },
      { path: 'experiences', loadChildren: () => import('./experience/experience.module').then(m => m.ExperienceModule), },
      { path: 'infos', loadChildren: () => import('./info/info.module').then(m => m.InfoModule), },
      { path: 'educations', loadChildren: () => import('./education/education.module').then(m => m.EducationModule), },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
    ThemeModule,
    MyMenuModule,
  ]
})
export class AdminModule { }
