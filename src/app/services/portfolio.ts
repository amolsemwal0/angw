import { Injectable, signal } from '@angular/core';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}
interface Project {
  title: string;
  role: string;
  stack: string[];
  status: 'Live' | 'Compiling' | 'Decommissioned';
  desc: string;
}
interface GameStat {
  game: string;
  role: string;
  rank: string;
  hours: string;
  winRate: string;
  mainChar: string;
}
interface NavTab {
  id: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class Portfolio {
  activeTab = signal<string>('home');
  mobileMenuOpen = signal<boolean>(false);

  tabs: NavTab[] = [
    { id: 'home', label: 'Dashboard' },
    { id: 'skills', label: 'Tech Stack' },
    { id: 'projects', label: 'Active Quests' },
    { id: 'gaming', label: 'Game Stats' },
  ];

  skills = signal<Skill[]>([
    {
      name: 'Java / Spring Boot',
      level: 95,
      color: '#ef4444',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
    },
    {
      name: 'Linux / Bash',
      level: 90,
      color: '#eab308',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20 19V7H4v12h16m0-16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h16m-7 14v-2h5v2h-5m-3.42-4L5.57 9H8.4l3.3 3.3c.39.39.39 1.03 0 1.42L8.42 17H5.59l3.99-4z"/></svg>',
    },
    {
      name: 'Angular / Tailwind',
      level: 85,
      color: '#a855f7',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z"/></svg>',
    },
    {
      name: 'Docker / K8s',
      level: 75,
      color: '#3b82f6',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M2 13h2v6H2v-6m4-4h2v10H6V9m4-4h2v14h-2V5m4-4h2v18h-2V1zm4 8h2v10h-2V9z"/></svg>',
    },
  ]);

  projects = signal<Project[]>([
    {
      title: 'Distributed Payment Gateway',
      role: 'Backend Architect',
      stack: ['Java 17', 'Spring Cloud', 'Kafka', 'Redis'],
      status: 'Live',
      desc: 'Microservices architecture handling 10k transactions/sec.',
    },
    {
      title: 'Linux Kernel Tuner UI',
      role: 'Full Stack',
      stack: ['Rust', 'Angular', 'Electron'],
      status: 'Compiling',
      desc: 'A GUI for adjusting kernel parameters on the fly.',
    },
  ]);

  gameStats = signal<GameStat[]>([
    {
      game: 'DOTA 2',
      role: 'Hard Support',
      rank: 'Divine 3',
      hours: '4,200 hrs',
      winRate: '54.2%',
      mainChar: 'Crystal Maiden',
    },
    {
      game: 'CS:GO / CS2',
      role: 'Entry Fragger',
      rank: 'Global Elite',
      hours: '1,800 hrs',
      winRate: '49.8%',
      mainChar: 'AK-47',
    },
  ]);

  setActiveTab(id: string) {
    this.activeTab.set(id);
    this.mobileMenuOpen.set(false);
  }
  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }
}