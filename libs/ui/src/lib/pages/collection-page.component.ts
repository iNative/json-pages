import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';



//import { ContentService } from '../../../../../../apps/frontend/src/app/services/content.service'; 
// Path relativo brutto ma necessario finché non spostiamo i servizi in una lib shared (Step futuro)
//Nota Architetturale: Qui stiamo importando ContentService dall'App verso la Lib. È un anti-pattern (Circular Dependency risk). Per oggi va bene per chiudere lo Step, ma nel Refactoring finale dovremmo spostare ContentService e ConfigService in una libreria libs/core o libs/data-access.

// 👇 FIX: Importiamo dalla lib sorella, non dall'app padre
import { ContentService } from '@json-pages/data-access'

import { ContentItem } from '@json-pages/shared-data';
import { Observable, of } from 'rxjs';
import { GridListComponent } from '../grid-list/grid-list.component';

@Component({
  selector: 'lib-collection-page',
  standalone: true,
  imports: [CommonModule, GridListComponent],
  template: `
    <h2 class="section-title text-capitalize">{{ collectionName }}</h2>

    <ng-container *ngIf="items$ | async as items">
      <lib-grid-list [items]="items"></lib-grid-list>
    </ng-container>
  `,
  styles: [`
    .text-capitalize { text-transform: capitalize; }
    .section-title {
      border-left: 5px solid var(--secondary-color);
      padding-left: 15px;
      margin-bottom: 25px;
      color: #333;
    }
  `]
})
export class CollectionPageComponent implements OnChanges {
  // 👇 Questo Input viene riempito magicamente dal Router grazie a withComponentInputBinding
  @Input() collection: string = ''; 
  
  // Per ora iniettiamo il servizio dell'app. 
  // TODO: In futuro spostare ContentService in una libreria @json-pages/core
  private contentService = inject(ContentService);
  
  items$: Observable<ContentItem[]> = of([]);
  collectionName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // Quando cambia l'URL (es. da /atleti a /news), Angular aggiorna l'input
    if (changes['collection'] && this.collection) {
      this.loadData();
    }
  }

  private loadData() {
    this.collectionName = this.collection;
    this.items$ = this.contentService.getCollection(this.collection);
  }
}