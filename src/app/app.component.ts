import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private sp: SplashScreenService) { }

  ngOnInit(): void {

  }


}

// firebase use mourabit-mohamed
// firebase init
// firebase deploy
