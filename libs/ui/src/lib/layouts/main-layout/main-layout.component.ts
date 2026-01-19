import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'lib-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <lib-header></lib-header>
    
    <div class="main-content" style="padding-top: 72px;"> 
      <router-outlet></router-outlet>
    </div>
    
    <lib-footer></lib-footer>
  `
})
export class MainLayoutComponent {}