import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Portfolio } from '../../services/portfolio';
import { Dashboard } from '../../features/dashboard/dashboard';
import { SideNav } from '../../shared/side-nav/side-nav';
import { BootSequence } from '../../features/boot-sequence/boot-sequence';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, Dashboard, SideNav, BootSequence],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  service = inject(Portfolio);
  activeTab = this.service.activeTab;
  crtMode = this.service.crtMode;
  mobileMenuOpen = this.service.mobileMenuOpen;
  tabs = this.service.tabs;
}
