import { Component, OnInit, signal } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';
import { IStaticMethods } from 'preline';
import { MainLayout } from "./layouts/main-layout/main-layout";

// Declare the global window interface to satisfy TypeScript
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angw');

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        // Re-initialize Preline components on page navigation
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }
}
