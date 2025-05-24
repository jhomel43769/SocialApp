import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../../services/message.service';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    ThemeToggleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef<HTMLDivElement>;

  user: any;
  imgUrl = '/assets/profile.jpg';

  isSidebarOpen = true;
  isDropdownOpen = false;

  message: string = '';
  messages: any[] = [];
  maxLength = 50000;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getProfile().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.error('Failed to fetch profile', error);
        this.router.navigate(['/login']);
      },
    });

    this.messages = this.messageService.getMessages();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  editProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  sendMessage() {
    if (!this.message.trim() || this.message.length > this.maxLength) return;

    this.messageService.addMessage('user', this.message);
    this.messages = this.messageService.getMessages();

    this.message = '';
    this.resetTextareaHeight();

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
  resetTextareaHeight() {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = '56px';
  }
}
