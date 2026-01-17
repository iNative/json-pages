import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentItem } from '@json-pages/shared-data'; // La nostra lib condivisa
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // Iniezione moderna delle dipendenze
  private http = inject(HttpClient);
  
  // Il proxy di Nx (proxy.conf.json) girerà le chiamate '/api' verso localhost:3000
  private apiUrl = '/api/content'; 

  /**
   * Recupera una intera collezione (es. 'items', 'posts')
   */
  getCollection(collection: string): Observable<ContentItem[]> {
    return this.http.get<ContentItem[]>(`${this.apiUrl}/${collection}`);
  }
}