import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: string = 'light';

  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.setTheme(this.theme);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.setTheme(this.theme);
  }

  private setTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  getTheme(): string {
    return this.theme;
  }
}
