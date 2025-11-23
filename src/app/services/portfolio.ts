import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// --- Interfaces matching your JSON structure ---
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
interface ResumeConfig {
  filename: string;
  path: string;
}

// The shape of the external JSON file
interface PortfolioData {
  skills: Skill[];
  projects: Project[];
  gameStats: GameStat[];
  resume: ResumeConfig;
}

interface CommandLog {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class Portfolio {
  private http = inject(HttpClient);

  // Global State
  booted = signal<boolean>(false);
  activeTab = signal<string>('home');
  crtMode = signal<boolean>(true);
  mobileMenuOpen = signal<boolean>(false);

  // Data Signals -> Initialized as EMPTY arrays, populated by JSON
  skills = signal<Skill[]>([]);
  projects = signal<Project[]>([]);
  gameStats = signal<GameStat[]>([]);

  // Resume Config -> Default fallback, overwritten by JSON
  resumeConfig = signal<ResumeConfig>({
    filename: 'resume.pdf',
    path: '/assets/resume.pdf',
  });

  // Terminal State
  terminalLogs = signal<CommandLog[]>([{ type: 'system', text: 'Initializing ZeroOS v2.0...' }]);

  tabs = [
    { id: 'home', label: 'Dashboard' },
    { id: 'skills', label: 'Tech Tree' },
    { id: 'projects', label: 'Quests' },
    { id: 'gaming', label: 'Stats' },
  ];

  constructor() {
    this.loadData();
  }

  // --- 1. FETCH ALL DATA FROM EXTERNAL JSON ---
  private loadData() {
    // Using absolute path /assets/data.json to ensure it works in all environments
    this.http.get<PortfolioData>('/assets/data.json').subscribe({
      next: (data) => {
        // Populate signals with data from the file
        this.skills.set(data.skills);
        this.projects.set(data.projects);
        this.gameStats.set(data.gameStats);

        if (data.resume) {
          this.resumeConfig.set(data.resume);
        }

        this.addLog('system', 'Data modules loaded successfully.');
        this.addLog('system', 'Type "help" to see available commands.');
      },
      error: (err) => {
        this.addLog('error', 'CRITICAL ERROR: Failed to load /assets/data.json');
        console.error('Portfolio Data Error:', err);
      },
    });
  }

  // --- ACTIONS ---
  setActiveTab(id: string) {
    this.activeTab.set(id);
    this.mobileMenuOpen.set(false);
    this.addLog('system', `Mounted ./${id}`);
  }

  toggleCrt() {
    this.crtMode.update((v) => !v);
  }
  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }
  completeBoot() {
    this.booted.set(true);
  }

  addLog(type: 'input' | 'output' | 'error' | 'system', text: string) {
    this.terminalLogs.update((logs) => [...logs, { type, text }]);
  }

  // --- CLI LOGIC ---
  executeCommand(cmd: string) {
    const cleanCmd = cmd.trim().toLowerCase();
    this.addLog('input', `root@portfolio:~$ ${cmd}`);

    if (cleanCmd === 'help') {
      this.addLog(
        'output',
        'Available commands: help, clear, ls, cd [page], whoami, date, sudo [cmd], wget resume'
      );
    } else if (cleanCmd === 'ls') {
      // 2. Use dynamic filename from JSON
      this.addLog(
        'output',
        `dashboard  tech_tree  quests  game_stats  ${this.resumeConfig().filename}`
      );
    } else if (cleanCmd === 'clear') {
      this.terminalLogs.set([]);
    } else if (cleanCmd === 'whoami') {
      this.addLog('output', 'Amol Semwal AKA Zero');
    } else if (cleanCmd === 'date') {
      this.addLog('output', new Date().toString());
    } else if (cleanCmd.startsWith('cd')) {
      const parts = cleanCmd.split(' ');
      const target = parts.length > 1 ? parts[1] : '';

      if (['dashboard', 'home'].includes(target)) this.setActiveTab('home');
      else if (['tech_tree', 'skills'].includes(target)) this.setActiveTab('skills');
      else if (['quests', 'projects'].includes(target)) this.setActiveTab('projects');
      else if (['game_stats', 'gaming'].includes(target)) this.setActiveTab('gaming');
      else this.addLog('error', `cd: ${target}: No such file or directory`);
    }
    // === 3. DYNAMIC RESUME DOWNLOAD ===
    else if (cleanCmd.startsWith('wget') || cleanCmd.startsWith('curl')) {
      if (cleanCmd.includes('resume')) {
        const config = this.resumeConfig();

        this.addLog('system', 'Resolving host portfolio.dev...');
        setTimeout(() => this.addLog('system', 'Connecting... connected.'), 400);
        setTimeout(
          () => this.addLog('system', 'HTTP request sent, awaiting response... 200 OK'),
          800
        );

        setTimeout(() => {
          this.addLog('output', `Length: 42KB [application/pdf]`);
          this.addLog('output', `Saving to: ${config.filename}`);

          // --- Actual Download using JSON path ---
          const link = document.createElement('a');
          link.href = config.path; // Dynamic Path from JSON
          link.download = config.filename; // Dynamic Name from JSON
          link.target = '_blank';
          link.click();
          // -----------------------

          this.addLog('system', '100%[===================>] 42K  --.-KB/s    in 0s');
          this.addLog('system', `${config.filename} saved.`);
        }, 1500);
      } else {
        this.addLog('error', 'usage: wget resume');
      }
    } else if (cleanCmd.startsWith('sudo')) {
      this.addLog('error', 'User is not in the sudoers file. This incident will be reported.');
    } else {
      this.addLog('error', `bash: ${cleanCmd}: command not found`);
    }
  }
}
