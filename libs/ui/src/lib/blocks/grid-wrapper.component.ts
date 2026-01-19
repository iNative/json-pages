import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '@json-pages/data-access';
import { ContentItem } from '@json-pages/shared-data';
// Assicurati che il percorso import sia corretto verso il tuo grid-list esistente
import { GridListComponent } from '../grid-list/grid-list.component'; 
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lib-grid-wrapper',
  standalone: true,
  imports: [CommonModule, GridListComponent],
  template: `
    <h3 *ngIf="title" class="text-3xl font-bold text-center mb-8 mt-4">{{ title }}</h3>
    
    <ng-container *ngIf="items$ | async as items">
        <lib-grid-list [items]="items"></lib-grid-list>
        
        <p *ngIf="items.length === 0" class="text-center text-gray-500 py-4">
            Nessun contenuto trovato in "{{ collection }}".
        </p>
    </ng-container>
  `
})
export class GridWrapperComponent implements OnInit {
  @Input({ required: true }) collection: string = '';
  @Input() limit: number = 10;
  @Input() title?: string;

  private contentService = inject(ContentService);
  items$: Observable<ContentItem[]> = of([]);

  ngOnInit() {
    if (!this.collection) return;

    // Chiamata al servizio e applicazione del limite
    this.items$ = this.contentService.getCollection(this.collection).pipe(
      map(items => items.slice(0, this.limit))
    );
  }
}