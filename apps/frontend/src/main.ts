import 'zone.js'; // 👈 IMPORTANTE: Deve essere la prima importazione!
// in Angular standalone, zone.js è fondamentale per la change detection. Solitamente va importato nel punto di ingresso dell'applicazione.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
