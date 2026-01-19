import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '@json-pages/data-access';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-primary-3 text-white links-white pb-4 footer-1">
      <div class="container">
        <div class="row">
          <div class="col-xl-auto mr-xl-5 col-md-3 mb-4 mb-md-0">
            <h5 class="mb-2">Contatti</h5>
            <ul class="nav flex-row flex-md-column">
              <li class="nav-item mr-3 mr-md-0">
                <a href="mailto:info@canottieritrinacria.it" class="nav-link fade-page px-0 py-2">info@canottieritrinacria.it</a>
              </li>
            </ul>
          </div>
          <div class="col mt-4 mt-md-0 mt-lg-5 mt-xl-0 order-lg-3 order-xl-2">
            <h5 class="mb-2">Link Utili</h5>
            <ul class="nav flex-row flex-md-column">
              <li *ngFor="let item of config.menu" class="nav-item mr-3 mr-md-0">
                <a [href]="item.path" class="nav-link fade-page px-0 py-2">{{ item.label }}</a>
              </li>
            </ul>
          </div>
          <div class="col-lg mt-2 mt-md-5 mt-lg-0 order-lg-3 order-xl-4 text-lg-right">
            <small class="text-muted">
                &copy; 2024 {{ config.site?.title }}
            </small>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public config = inject(ConfigService);
}