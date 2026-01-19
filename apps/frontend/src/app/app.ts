/* previous 3.3
import { Component, inject } from '@angular/core'; // Rimosso OnInit
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'zone.js'; // Fondamentale per evitare White Screen
import { ConfigService } from '@json-pages/data-access';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss' 
})
export class App { // Rimosso implements OnInit
  // ContentService non serve più qui! Lo usa la pagina interna.
  public config = inject(ConfigService);
  
  // Niente più items$ o ngOnInit
}
*/
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigService } from '@json-pages/data-access';
import { ThemeLoaderService } from './services/theme-loader.service'; // Importa

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`, // Il Layout sarà gestito dentro, o qui
  styles: [] 
})
export class App implements OnInit {
  public config = inject(ConfigService);
  private themeLoader = inject(ThemeLoaderService);

  ngOnInit() {
    // Carica gli asset del tema Trinacria
    this.themeLoader.loadTenantTheme();
  }
}