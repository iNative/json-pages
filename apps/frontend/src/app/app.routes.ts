import { Route } from '@angular/router';
// Importiamo la pagina dinamica dalla libreria UI
import { CollectionPageComponent } from '@json-pages/ui';

export const appRoutes: Route[] = [
  // 1. Redirect dalla Home (vuota) verso 'atleti'
  { path: '', redirectTo: 'atleti', pathMatch: 'full' },
  
  // 2. Rotta Dinamica: :collection cattura tutto (es. "atleti", "news")
  { 
    path: ':collection', 
    component: CollectionPageComponent 
  }
];