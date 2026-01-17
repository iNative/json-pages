import 'zone.js';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentService } from './services/content.service';
import { ConfigService } from './services/config.service';
import { Observable } from 'rxjs';
import { ContentItem } from '@json-pages/shared-data';
import { CardComponent } from './components/ui/card.component';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, CardComponent],
  selector: 'app-root',
  // 👇 Riferimenti ai file esterni
  templateUrl: './app.html',
  styleUrl: './app.scss' 
})
export class App implements OnInit {
  private contentService = inject(ContentService);
  
  // Public perché usato nell'HTML (config.site.title)
  public config = inject(ConfigService);
  
  items$!: Observable<ContentItem[]>;

  ngOnInit() {
    this.items$ = this.contentService.getCollection('items');
  }
}