import { Component, OnInit, HostBinding } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';
import { SharedService } from './service.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.default-theme') defaultTheme = true;
  @HostBinding('class.dark-theme') darkTheme = false;
  checked = false;
  isChecked = new FormControl(false);
  disabled = false;
  constructor(private sp: SplashScreenService, public service: SharedService
    , private overlayContainer: OverlayContainer,) { }

  ngOnInit(): void {
    this.themeForBtnNav('default-theme');

    this.changeTheme();
  }

  changeTheme() {
    this.isChecked.valueChanges.subscribe((checked: boolean) => {
      console.log(checked)

      this.defaultTheme = !checked;
      this.darkTheme = checked;
      this.service.filter = checked ? 'brightness(85%)' : '';

      this.themeForBtnNav(checked ? 'dark-theme' : 'default-theme');

    })
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
