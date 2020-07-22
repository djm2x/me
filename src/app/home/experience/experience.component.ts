import { Component, OnInit } from '@angular/core';
import { animations } from '../../animations';
import { DbService, Project } from 'src/app/db.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';

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
  constructor(private service: DbService, public dialog: MatDialog) { }

  ngOnInit() {}

  onSectionChange(pos) {
    if (pos === 4) {
      this.state = 'show';
    }
  }

  goto(url) {
    return window.open(url, '_blank');
  }

  detail(o: Project) {
    this.dialog.open(DetailComponent, {
      width: '750px',
      disableClose: true,
      data: { model: o, title: o.title }
    });
  }

}
