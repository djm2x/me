import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DbService, DataBase } from 'src/app/db.service';
import { PdfService } from '../pdf.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service.service';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.scss']
})
export class CurriculumVitaeComponent implements OnInit {
  @ViewChild('cv') cv: ElementRef;
  o = new DataBase();
  isPrivate = false;
  constructor(private service: DbService, private pdf: PdfService
    , private route: ActivatedRoute, private service2: SharedService) { }

  ngOnInit(): void {
    this.isPrivate = this.route.snapshot.paramMap.get('isPrivate') === 'with-private';
    this.service2.private = this.isPrivate ? '/with-private' : '';
    this.service.all().subscribe(r => {
      this.o = r;
      this.o.experiences = this.o.experiences.reverse();
      this.o.educations = this.o.educations.reverse();
      // console.log(this.o.experiences.reverse())
    });
  }

  openPDF() {
    this.pdf.captureScreen(this.cv.nativeElement);
  }

  downloadPDF() {
    this.pdf.downloadPDF(this.cv.nativeElement);
  }

  displayUrl(links: string): string[] {
    const r = links.split(';');

    r.pop();

    return r.filter(e => this.isPrivate ? true : e.endsWith('0')).map(e => e.startsWith('http') ? e.slice(0, -1) : `https://${e.slice(0, -1)}.herokuapp.com` );
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }


}
