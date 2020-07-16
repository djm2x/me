import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  intro = {
    firstName: 'Mohamed',
    lastName: 'Mourabit',
    profession: 'Developpeur web full stack',
    image: 'assets/me.jpg',
    p: 'My passion is to create from zero line to full application thats may hepls others for their lifes. so i teel my self always : "I nedd more power". Mourabit Mohamed, Dev, IT.'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
