import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentItem, PageDefinition } from '@json-pages/shared-data'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  private apiUrl = '/api'; 

  getCollection(collection: string): Observable<ContentItem[]> {
    return this.http.get<ContentItem[]>(`${this.apiUrl}/content/${collection}`);
  }

  getPage(slug: string): Observable<PageDefinition> {
    return this.http.get<PageDefinition>(`${this.apiUrl}/pages/${slug}`);
  }
}