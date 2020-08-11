import { Component, OnInit } from '@angular/core';
import { animations } from '../../animations';
import { DbService, Project } from 'src/app/db.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: animations
})
export class ExperienceComponent implements OnInit {
  state = 'hide';
  list = [];
  constructor(private service: DbService, public dialog: MatDialog
    , private route: ActivatedRoute) { }

  ngOnInit() {
    const isPrivate = this.route.snapshot.paramMap.get('isPrivate') === 'with-private';

    this.service.projects().subscribe(r => {
      this.list = r.filter(e => isPrivate ? true : e.isPrivate === false );
    });
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
