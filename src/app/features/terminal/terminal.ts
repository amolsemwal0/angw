import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Portfolio } from '../../services/portfolio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class Terminal {
  service = inject(Portfolio);
  logs = this.service.terminalLogs;
  currentCmd = '';

  @ViewChild('scrollContainer') private readonly scrollContainer!: ElementRef;
  @ViewChild('cmdInput') private readonly cmdInput!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  focusInput() {
    this.cmdInput.nativeElement.focus();
  }
  runCmd() {
    if (!this.currentCmd) return;
    this.service.executeCommand(this.currentCmd);
    this.currentCmd = '';
  }
}
