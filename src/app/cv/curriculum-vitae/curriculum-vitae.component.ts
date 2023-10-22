import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DbService, DataBase } from 'src/app/shared/db.service';
import { PdfService } from '../pdf.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/service.service';
import { animations } from 'src/app/shared/animations';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript'
@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: [
    './curriculum-vitae.component.scss',
  // './tailwind-classes.scss'
],
  // encapsulation: ViewEncapsulation.None,
  animations: animations,
})
export class CurriculumVitaeComponent implements OnInit {
  zoom = 1;
  state = 'hide';
  @ViewChild('cv') cv: ElementRef<HTMLDivElement>;
  o = new DataBase();
  isPrivate = false;
  timeoutHandler = null;

  constructor(private service: DbService, public pdf: PdfService
    , private route: ActivatedRoute, public service2: SharedService) { }

  ngOnInit(): void {
    // setTimeout(() => this.zoom = 1.36, 300);

    this.isPrivate = +this.route.snapshot.paramMap.get('isPrivate') === 1;
    this.service2.private = this.isPrivate ? '/with-private' : '';
    this.service.all().subscribe(r => {
      this.o = r;
      this.o.experiences = this.o.experiences.reverse();
      this.o.educations = this.o.educations.reverse();
      // console.log(this.o.experiences.reverse())
    });

    setTimeout(() => this.state = 'show', 300);
  }

  toList(e: string) {
    return e.split(',')
  }

  public mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  public mousedown(i: number) {
    this.timeoutHandler = setInterval(() => {
      this.zoom += i;
    }, 100);
  }

  openPDF() {
    this.zoom = 1;
    this.pdf.captureScreen(this.cv.nativeElement);
  }

  downloadPDF() {
    this.zoom = 1;
    this.pdf.downloadPDF(this.cv.nativeElement);
  }

   async generateWordDocument() {
      const htmlContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
  body {
    font-family: Calibri, sans-serif;
    line-height: 1;
    background-color: #ccc;
  }
  a {
    color: black;
    // text-decoration: none;
    text-decoration: underline;
  }
  h3, h4, h5 {
    margin-top: 10px;
    margin-bottom: 2px;
  }
  p, a {
    margin-top: 0;
    font-size: 10pt;
    // margin-bottom: 5px;
  }

  hr {
    margin-top: 0;
    height: 1px;
    margin-bottom: 0px;
    color: #ccc;
    background-color: #ccc;
  }
  </style>
</head>
<body>
    ${this.cv.nativeElement.innerHTML}
</body>
</html>
      `;

      //default: 1440, i.e. 2.54 cm
      const scale = 1440 / 2.54;

      // console.warn(this.cv.nativeElement.innerHTML)

      asBlob(htmlContent, {
        // orientation: 'landscape',

        margins: {
          top: 0.3 * scale ,
          right: 0.5 * scale,
          bottom: 0.3 * scale,
          left: 0.5 * scale,
          // header: 0,
          // footer: 0,
          gutter: 0,
        },
      }).then(data => {
        console.log(data)
        saveAs(data, 'file.docx') // save as docx file
      })

      // const blob: Blob = await HTMLtoDOCX(htmlContent)

      // this.downloadBlobAsFile(blob as any, 'document.docx');

      // Use docx as a Blob to save or open in Microsoft Word
      // saveAs(docx, 'document.docx'); // You can use the FileSaver library to save it as a file
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
