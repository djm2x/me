
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


    @ViewChild('div') divHTML: ElementRef;
    mobileQuery: MediaQueryList;
    currentSection = 'section1';
    userImg = 'assets/2.png';
    color = 'accent';
    opened = false;
    d = new Date();
    constructor(changeDetectorRef: ChangeDetectorRef
      , media: MediaMatcher) {
      // define the limite size
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      // mobileQuery.matches is listen for the size
      // wa can now use mobileQuery.matches booleen in the template
      this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
    }
    ngOnInit(): void {

      setTimeout(() => this.opened = true, 800);
    }

    scrollTo(section: string) {
      document.querySelector('#' + section).scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.currentSection = section;
    }

    toggleSideNave() {
      this.divHTML.nativeElement.click();
    }


  }

  // firebase use mourabit-mohamed
  // firebase init
  // firebase deploy
