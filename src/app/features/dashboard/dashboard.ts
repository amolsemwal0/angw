import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Portfolio } from '../../services/portfolio';
import { GlitchCard } from '../glitch-card/glitch-card';
import { Terminal } from '../terminal/terminal';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GlitchCard, Terminal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly service = inject(Portfolio);
  activeTab = this.service.activeTab;
  skills = this.service.skills;
  projects = this.service.projects;
  gameStats = this.service.gameStats;
}
