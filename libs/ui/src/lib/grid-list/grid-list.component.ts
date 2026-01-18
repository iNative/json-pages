import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItem } from '@json-pages/shared-data';
import { CardComponent } from '../card/card.component'; // Import relativo interno alla lib

@Component({
  selector: 'lib-grid-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.scss',
})
export class GridListComponent {
  @Input({ required: true }) items: ContentItem[] = [];
}