import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @HostBinding('class.default-theme') defaultTheme = true;
  constructor() { }

  ngOnInit(): void {
  }

}
