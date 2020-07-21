import { Component, OnInit } from '@angular/core';
import { animations } from '../../animations';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: animations
})
export class ExperienceComponent implements OnInit {
  state = 'hide';
  reccete = 'assets/recette.jpg';
  artisant = 'assets/artisant.jpg';
  list = this.service.projects();
  constructor(private service: DbService) { }

  ngOnInit() {}

  onSectionChange(pos) {
    if (pos === 4) {
      this.state = 'show';
    }
  }

  goto(url) {
    return window.open(url, '_blank');
  }

  get gotoRecette() {
    return window.open('https://recette-cuisine.herokuapp.com', '_blank');
  }

  get gotoOuvrier() {
    return window.open('https://ouvrier.herokuapp.com', '_blank');
  }

}
