import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.getTheme() === 'dark';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
