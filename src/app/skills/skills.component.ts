import { Component, OnInit } from '@angular/core';
import { animations } from '../animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: animations
})
export class SkillsComponent implements OnInit {
  devWeb = [];
  software = [];
  personal = [];
  state = 'hide';

  constructor() { }

  ngOnInit() {
    this.setSkilles();
  }

  onSectionChange(pos) {
    // console.log('>>>>>>>>>>>>>>>>>>>');
    if (pos === 3) {
      this.state = 'show';
    }
  }

  setSkilles() {
    this.devWeb.push(
      { name: 'Angular', accuracy: 90 },
      { name: 'Asp.Net core', accuracy: 90 },
      { name: 'Entity framework core', accuracy: 90 },
      { name: 'Node & Express js', accuracy: 80 },
      { name: 'MongoDB & Mongoose js', accuracy: 80 },
      { name: 'MySql & Sql server', accuracy: 80 },
      { name: 'Electron js', accuracy: 70 },
    );
    this.software.push(
      { name: 'Visual Studio code', accuracy: 90 },
      { name: 'Fl Studio', accuracy: 90 },
      { name: 'Photoshop', accuracy: 70 },
      { name: 'Git & Gitup', accuracy: 40 },
    );
    this.personal.push(
      { name: 'self learning', accuracy: 98 },
      { name: 'Teamwork', accuracy: 90 },
      { name: 'Communication', accuracy: 80 },
      { name: 'Creativity', accuracy: 70 },
    );
  }
}
