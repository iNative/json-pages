import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItem } from '@json-pages/shared-data'; // La nostra interfaccia condivisa

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  // Assicurati che questi percorsi corrispondano ai nomi attuali dei tuoi file
  templateUrl: './card.component.html', 
  styleUrl: './card.component.scss',
})
export class CardComponent {
  // Input obbligatorio: Il componente riceve un oggetto ContentItem
  @Input({ required: true }) item!: ContentItem;
}