import { InjectionToken } from '@angular/core';

// Un token semplice per iniettare l'URL base del backend (es. http://localhost:3000/api)
export const API_URL = new InjectionToken<string>('API_URL');