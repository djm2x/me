import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  o = {
    title: 'Skills',
    list: [
      {
        domaine: 'front-end',
        items: [
          { name: 'Angular', value: 95 },
          { name: 'Angular Material', value: 95 },
          { name: 'Bootstrap', value: 70 },
        ],
      },
      {
        domaine: 'back-end',
        items: [
          { name: 'ASP.NET  core', value: 95 },
          { name: 'Node js (Express Js & Ts)', value: 90 },
          { name: 'Laravel', value: 90 },
        ],
      },
      {
        domaine: 'Mobile',
        items: [
          { name: 'Ionic (Angular)', value: 70 },
        ],
      },
      {
        domaine: 'Database',
        items: [
          { name: 'Sqlite', value: 90 },
          { name: 'MySQL', value: 80 },
          { name: 'SQL Server', value: 80 },
          { name: 'MongoDB', value: 90 },
        ],
      },
      {
        domaine: 'Dev-ops',
        items: [
          { name: 'Github', value: 80 },
          { name: 'Npm', value: 90 },
          { name: 'heroku deployment', value: 90 },
        ],
      },
      {
        domaine: 'Outils',
        items: [
          { name: 'Visual Studio code', value: 90 },
          { name: 'Adobe XD', value: 70 },
          { name: 'Adobe Photoshop', value: 90 },
          { name: 'FileZilla', value: 80 },
          { name: 'FL Studio', value: 90 },
        ],
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
