import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DbService, DataBase } from 'src/app/db.service';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.scss']
})
export class CurriculumVitaeComponent implements OnInit {
  @ViewChild('cv') cv: ElementRef;
  o = new DataBase();
  constructor(private service: DbService, private pdf: PdfService) { }

  ngOnInit(): void {
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


}
