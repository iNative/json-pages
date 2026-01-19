import { Component, Input, inject, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GridWrapperComponent } from '../blocks/grid-wrapper.component'; 
import { PageDefinition } from '@json-pages/shared-data';

// 👇 ORA IMPORTIAMO CORRETTAMENTE DALLA LIB (Non più ../../../apps...)
import { ContentService, TenantService, API_URL } from '@json-pages/data-access';

@Component({
  selector: 'lib-dynamic-page',
  standalone: true,
  imports: [CommonModule, GridWrapperComponent],
  template: `
    <div *ngIf="loading()" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div *ngIf="page$ | async as page" class="page-container">
      <ng-container *ngFor="let block of page.blocks">

        <section *ngIf="block.type === 'hero'"
                 [class]="block.settings?.cssClass"
                 [style.background-color]="block.settings?.backgroundColor"
                 class="hero-block relative">
          
          <ng-container *ngIf="block.data.layout !== 'split'">
            <div class="bg-cover-layer" 
                 [style.background-image]="'url(' + resolveAsset(block.data.backgroundImage) + ')'">
            </div>
            
            <div class="container relative z-10 py-20 text-white h-full flex flex-col justify-center">
               <h1 class="text-5xl font-bold mb-4 leading-tight max-w-4xl">{{ block.data.title }}</h1>
               <p class="text-xl mb-8 max-w-2xl opacity-90 leading-relaxed">{{ block.data.subtitle }}</p>
               <div *ngIf="block.data.ctaUrl">
                <a [href]="block.data.ctaUrl" class="btn btn-primary px-6 py-3 rounded font-bold bg-yellow-500 text-black hover:bg-yellow-400 transition">{{ block.data.ctaLabel }}</a>
               </div>
            </div>
          </ng-container>

          <ng-container *ngIf="block.data.layout === 'split'">
             <div class="flex gap-8 items-center flex-wrap justify-center md:justify-start">
                <ng-container *ngFor="let logo of block.data.logos; let i = index">
                  <img [src]="resolveAsset(logo.src)" 
                       [alt]="logo.alt" 
                       class="h-12 brightness-0 invert opacity-70 hover:opacity-100 transition">
                </ng-container>
             </div>
          </ng-container>
        </section>

        <section *ngIf="block.type === 'text' || block.type === 'html'" 
                 [class]="block.settings?.cssClass"
                 [style.background-color]="block.settings?.backgroundColor">
            <div [class]="block.settings?.container === 'fluid' ? 'container-fluid' : 'container mx-auto px-4'">
               <div [innerHTML]="block.data.content"></div>
            </div>
        </section>

        <section *ngIf="block.type === 'grid'" [class]="block.settings?.cssClass">
            <div class="container mx-auto px-4">
                <lib-grid-wrapper 
                    [collection]="block.data.sourceCollection"
                    [limit]="block.data.limit"
                    [title]="block.data.title"> 
                </lib-grid-wrapper>
            </div>
        </section>

      </ng-container>
    </div>
  `,
  styles: [`
    /* ... stili precedenti ... */
    .bg-cover-layer {
      position: absolute; top:0; left:0; right:0; bottom:0;
      background-size: cover; background-position: center;
      filter: brightness(0.4); 
      z-index: 0;
    }
    /* ... */
  `]
})
export class DynamicPageComponent implements OnChanges {
  @Input() slug: string = '';
  
  private contentService = inject(ContentService);
  private tenantService = inject(TenantService);
  private apiUrl = inject(API_URL); // 👇 Ci serve anche l'URL base per le immagini
  
  page$: Observable<PageDefinition | null> = of(null);
  loading = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    const targetSlug = this.slug || 'home';
    this.loading.set(true);
    this.page$ = this.contentService.getPage(targetSlug).pipe(
      catchError(err => {
        console.error(`Errore pagina ${targetSlug}:`, err);
        return of(null);
      })
    );
    this.page$.subscribe(() => this.loading.set(false));
  }

  resolveAsset(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const finalPath = cleanPath.replace(/^assets\//, ''); // Rimuove prefisso assets/ se c'è

    // 👇 Costruisce l'URL usando i pezzi iniettati correttamente
    return `${this.apiUrl}/assets/${this.tenantService.tenantId}/${finalPath}`;
  }
}