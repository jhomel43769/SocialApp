import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoading = true;
  error: string | null = null;

  profileImageUrl: string | null = null;
  backgroundImageUrl: string | null = null;

  isModalOpen = false;
  modalTitle = '';
  selectedFile: File | null = null;
  currentImageType: 'profile' | 'background' | null = null;

  activeSection: 'Publicaciones' | 'Amigos' | 'Configuración' = 'Publicaciones';

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.user = response;

        this.profileImageUrl =
          localStorage.getItem('profileImage') || this.user.profilePicture;
        this.backgroundImageUrl =
          localStorage.getItem('backgroundImage') ||
          this.user.backgroundPicture;

        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el perfil';
        this.isLoading = false;
        console.error('Error al cargar el perfil:', error);
      },
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  openEditModal(type: 'profile' | 'background'): void {
    this.currentImageType = type;
    this.modalTitle =
      type === 'profile' ? 'Editar foto de perfil' : 'Editar fondo';
    this.selectedFile = null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentImageType = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveImage(): void {
    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageUrl = e.target.result;

      if (this.currentImageType === 'profile') {
        this.profileImageUrl = imageUrl;
        localStorage.setItem('profileImage', imageUrl);
      } else if (this.currentImageType === 'background') {
        this.backgroundImageUrl = imageUrl;
        localStorage.setItem('backgroundImage', imageUrl);
      }

      this.closeModal();
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
