// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://raw.githubusercontent.com/dev-solus/json-db/main/cv.json';
  private apiUrl2 = 'https://api.github.com/repos/dev-solus/json-db/contents/cv.json'; // Replace with your own URL
  private token = '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'; 

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createData(updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(this.apiUrl2, { headers: headers }).pipe(
      mergeMap((fileData: any) => {
        // Parse the content of the JSON file
        const content = atob(fileData.content);

        console.warn(content);

        // Update the content with your new data
        const updatedContent = JSON.stringify(updatedData);

        // Create a new content object
        const updatedFile = {
          message: 'Update JSON data',
          content: btoa(updatedContent),
          sha: fileData.sha
        };

        // Make a PUT request to update the file
        return this.http.put(this.apiUrl2, updatedFile, { headers: headers });
      })
    );
  }
}
