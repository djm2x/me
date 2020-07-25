import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { animations } from '../../animations';
import { SharedService } from '../../service.service';
import { DbService, About } from 'src/app/db.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: animations,
})
export class AboutComponent implements OnInit {
  @Input() events = new Observable<number>();
  counter = 5;
  // list = [1, 2, 3, 4];
  img = 'assets/skills.png';
  state = 'hide';
  list = [
    { icon: 'fas fa-envelope', name: 'mohamed.mourabit@outlook.com' },
    { icon: 'fas fa-globe', name: 'https://mourabit-mohamed.firebaseapp.com' },
    { icon: 'fab fa-linkedin', name: 'https://www.linkedin.com/in/mohamed-mourabit' },
    { icon: 'fab fa-github', name: 'https://github.com/djm2x' },
    // { icon: 'fas fa-phone', name: '(+212) 6 71 26 54 78' },
    { icon: 'fas fa-map-marker-alt', name: 'Hay maamoura-TEMARA' },
  ];
  o = new About();
  constructor(private service: DbService, public service2: SharedService) {}

  ngOnInit(): void {
    this.service.about().subscribe(r => {
      this.o = r;
    })
    setTimeout(() => this.state = 'show', 500);
  }

  // add() {
  //   this.list.push(this.counter++);
  // }

  // remove(index) {
  //   if (!this.list.length) {
  //     return;
  //   }
  //   this.list.splice(index, 1);
  // }

}
