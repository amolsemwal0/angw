import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Portfolio } from '../../services/portfolio';
import { Dashboard } from "../../features/dashboard/dashboard";
import { SideNav } from "../../shared/side-nav/side-nav";

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, Dashboard, SideNav],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private readonly service = inject(Portfolio);
  activeTab = this.service.activeTab;
  toggleMobileMenu() {
    this.service.toggleMobileMenu();
  }
}
