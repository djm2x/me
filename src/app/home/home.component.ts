
  import { Component, OnInit, HostBinding, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
  import { OverlayContainer } from '@angular/cdk/overlay';
  import { MediaMatcher } from '@angular/cdk/layout';
import { SharedService } from '../service.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit {

    @HostBinding('class.default-theme') defaultTheme = true;
    @HostBinding('class.dark-theme') darkTheme = false;
    @ViewChild('div') divHTML: ElementRef;
    mobileQuery: MediaQueryList;
    currentSection = 'section1';
    userImg = 'assets/2.png';
    color = 'accent';
    checked = false;
    disabled = false;
    opened = false;
    d = new Date();
    constructor(private overlayContainer: OverlayContainer, changeDetectorRef: ChangeDetectorRef
      , media: MediaMatcher, private service: SharedService) {
      // define the limite size
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      // mobileQuery.matches is listen for the size
      // wa can now use mobileQuery.matches booleen in the template
      this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
    }
    ngOnInit(): void {
      this.themeForBtnNav('default-theme');
      setTimeout(() => this.opened = true, 800);
    }

    scrollTo(section: string) {
      document.querySelector('#' + section).scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.currentSection = section;
    }

    toggleSideNave() {
      this.divHTML.nativeElement.click();
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
