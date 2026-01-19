import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '@json-pages/data-access';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="nav-container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary-3 fixed-top" data-sticky="top">
        <div class="container">
          
          <a class="navbar-brand fade-page" routerLink="/">
            <img *ngIf="config.site?.logoUrl" [src]="config.site?.logoUrl" alt="Logo">
          </a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-menu"></span> </button>

          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li *ngFor="let item of config.menu" class="nav-item">
                <a class="nav-link" [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                    {{ item.label }}
                </a>
              </li>
              <li class="nav-item ml-lg-3">
                 <a href="#" class="btn btn-primary">Area Soci</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  `
})
export class HeaderComponent {
  public config = inject(ConfigService);
}