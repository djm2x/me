import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.scss']
})
export class MytableComponent implements OnInit {
  o = new User();
  constructor() { }

  ngOnInit() { }
}
