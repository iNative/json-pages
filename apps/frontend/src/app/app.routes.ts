import { Route } from '@angular/router';
// Importiamo il nuovo motore dalla libreria UI
import { DynamicPageComponent } from '@json-pages/ui';

export const appRoutes: Route[] = [
  // 1. HOME PAGE
  // Quando il path è vuoto, carichiamo DynamicPage forzando lo slug 'home'
  { 
    path: '', 
    component: DynamicPageComponent,
    data: { slug: 'home' } 
  },
  
  // 2. PAGINE GENERICHE (es. /chi-siamo, /contatti)
  // Il componente leggerà lo slug dall'URL
  { 
    path: ':slug', 
    component: DynamicPageComponent 
  }
];