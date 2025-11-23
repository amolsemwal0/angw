import { Component, inject, OnInit, signal } from '@angular/core';
import { Portfolio } from '../../services/portfolio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boot-sequence',
  imports: [CommonModule],
  templateUrl: './boot-sequence.html',
  styleUrl: './boot-sequence.scss',
})
export class BootSequence implements OnInit{
  service = inject(Portfolio);
  lines = signal<string[]>([]);
  progress = signal<number>(0);

  private readonly bootLogs = [
    'CPU: AMD Ryzen 9 5900X 12-Core Processor @ 4.80GHz',
    'Memory Test: 65536K OK',
    'Detected Primary Master: SAMSUNG 980 PRO 2TB',
    'Booting from Hard Disk...',
    'Loading Linux Kernel 6.5.0-generic...',
    '[ OK ] Reached target Local File Systems.',
    '[ OK ] Started Network Manager Script.',
    '[ OK ] Reached target Network.',
    '[ OK ] Started Docker Application Container Engine.',
    '[ OK ] Started Kubernetes Cluster Protocol.',
    '[ OK ] Reached target Graphical Interface.',
    'Welcome to ZeroOS.',
  ];

  ngOnInit() {
    this.runSequence();
  }

  async runSequence() {
    // Add logs one by one
    for (const log of this.bootLogs) {
      await this.delay(Math.random() * 300 + 100);
      this.lines.update((l) => [...l, log]);
      this.progress.update((p) => Math.min(p + 10, 100));
    }

    // Final delay before entry
    await this.delay(800);
    this.service.completeBoot();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}