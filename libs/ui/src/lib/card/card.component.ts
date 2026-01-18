// libs/ui/src/lib/card/card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItem } from '@json-pages/shared-data'; // Libs imports Libs -> OK

@Component({
  selector: 'lib-card', // O 'app-card', basta essere coerenti
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) item!: ContentItem;
}