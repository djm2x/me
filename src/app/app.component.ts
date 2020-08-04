import { Component, OnInit, HostBinding } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';
import { SharedService } from './service.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.default-theme') defaultTheme = true;
  @HostBinding('class.dark-theme') darkTheme = false;
  checked = false;
  disabled = false;
  constructor(private sp: SplashScreenService, private service: SharedService
    , private overlayContainer: OverlayContainer,) { }

  ngOnInit(): void {
    this.themeForBtnNav('default-theme');
  }

  changeTheme() {
    console.log(this.checked);
    this.checked ? this.checked = false : this.checked = true;
    switch (this.checked) {
      case true:
        console.log('>>>>>>>>>>>>>');
        this.defaultTheme = false;
        this.darkTheme = true;
        this.service.filter = 'brightness(85%)';
        break;
      default:
        this.darkTheme = false;
        this.defaultTheme = true;
        this.service.filter = '';
        break;
    }
    // this.themeForBtnNav(theme);
  }

  themeForBtnNav(theme) {
    // this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(theme);
  }
}

// firebase use mourabit-mohamed
// firebase init
// firebase deploy
