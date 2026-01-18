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