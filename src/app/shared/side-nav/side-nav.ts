import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Portfolio } from '../../services/portfolio';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  private readonly service = inject(Portfolio);
  mobileMenuOpen = this.service.mobileMenuOpen;
  activeTab = this.service.activeTab;
  tabs = this.service.tabs;
  selectTab(id: string) {
    this.service.setActiveTab(id);
  }
}
