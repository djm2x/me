import { Component, OnInit } from '@angular/core';
import { animations } from '../animations';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  animations: animations
})
export class EducationComponent implements OnInit {
  list = [
    { icon: 'school', name: '2018: Degree in IT development' },
    { icon: 'book', name: '2018: Microsoft certified Querying Microsoft SQL Server 2012/2014' },
    { icon: 'book', name: '2017: Microsoft certified Developing ASP.NET MVC Web Applications' },
    { icon: 'book', name: '2017: Microsoft certified Programming in HTML with JavaScript and CSS3' },
    { icon: 'book', name: '2017: Microsoft certified Programming in C#' },
    { icon: 'book', name: '2017: Microsoft certified Windows 7, Entreprise Desktop Support Technician' },
    { icon: 'school', name: '2015: Licence degree in fishing' },
    { icon: 'school', name: '2010: lieutenant degree in fishing' },
    { icon: 'school', name: `2008: bachelor's degree in experimental science` },
  ];
  state = 'hide';
  constructor() { }

  ngOnInit() {
  }

  onSectionChange(pos) {
    if (pos === 2) {
      this.state = 'show';
    }
  }

}
