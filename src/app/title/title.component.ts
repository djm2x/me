import { Component, OnInit, Input } from '@angular/core';
import { animations } from '../animations';
import { SharedService } from '../service.service';
const ASSETS = '../../../assets/';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  animations: animations
})
export class TitleComponent implements OnInit {
  static i = 0;
  @Input() title = '';
  img2 = '';
  @Input() section: number;
  state = 'hide';
  list = [
    // {img: ASSETS + 'skills.png'},
    {img: ASSETS + 'intro.jpg'},
    {img: ASSETS + 'edu.jpg'},
    {img: ASSETS + 'contact.png'},
    {img: ASSETS + '1.jpg'},
  ];
  constructor(public service: SharedService) { }

  ngOnInit() {
    this.img2 = this.list[TitleComponent.i++].img;
    // console.log(this.img2);
  }

  onSectionChange(pos: number) {
    // console.log(pos + '===' + this.section);
    // console.log('title = ', pos.toString() === this.section.toString());
    if (pos.toString() === this.section.toString()) {
      this.state = 'show';
    }
  }

}
