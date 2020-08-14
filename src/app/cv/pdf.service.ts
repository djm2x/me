import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async captureScreen(data: HTMLElement) {
    const pdf = await this.shared(data);
    window.open(pdf.output('bloburl', { filename: 'cv.pdf' }), '_blank');
  }

  async downloadPDF(data: HTMLElement) {

    const pdf = await this.shared(data);
    pdf.save('cv.pdf'); // Generated PDF
  }

  async shared(data: HTMLElement) {
    const canvas = await html2canvas(data);
    // Few necessary setting options
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png', 1.0);
    const pdf = new jspdf('p', 'mm', 'a4', 1); // A4 size page of PDF
    const position = 0;
    const format = 'JPEG';
    const compression = 'SLOW' || 'FAST' || 'MEDIUM' || 'NONE';

    pdf.addImage(contentDataURL, format, 0, position, imgWidth, imgHeight, undefined, compression);
    // window.open(pdf.output('bloburl', { filename: 'fileName.pdf' }), '_blank');

    // pdf.save('pdfobjectnewwindow'); // Generated PDF
    // pdf.output('pdfobjectnewwindow'); // Generated PDF
    // pdf.save('cv.pdf'); // Generated PDF

    return pdf;
  }
}
