import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async captureScreen(data: HTMLElement) {

    const canvas = await html2canvas(data);
    // Few necessary setting options
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)

    window.open(pdf.output('bloburl', { filename: 'fileName.pdf' }), '_blank');

    // pdf.save('pdfobjectnewwindow'); // Generated PDF
    // pdf.output('pdfobjectnewwindow'); // Generated PDF
    // pdf.output('save', 'filename.pdf'); // Generated PDF
  }
}
