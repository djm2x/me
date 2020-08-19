import { Injectable, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { SharedService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isChecked = new FormControl(false);
  
  @HostBinding('class.default-theme') defaultTheme = true;
  @HostBinding('class.dark-theme') darkTheme = false;

  constructor(private overlayContainer: OverlayContainer, public service: SharedService) { 
    const b = localStorage.getItem('checked');
    
    // console.log(b)
    // console.log(JSON.parse(b))
    // this.changeTheme(JSON.parse(b) as boolean);

    this.isChecked.valueChanges.subscribe((checked: boolean) => this.changeTheme(checked));
  }

  changeTheme(checked: boolean) {
      // console.log(checked)
      localStorage.setItem('checked', JSON.stringify(checked));
      this.defaultTheme = !checked;
      this.darkTheme = checked;
      this.service.filter = checked ? 'brightness(85%)' : '';

      this.themeForBtnNav(checked ? 'dark-theme' : 'default-theme');
  }

  themeForBtnNav(theme: string) {
    // this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(theme);
  }
}
