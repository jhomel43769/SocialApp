import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ImageUploadComponent {
  description: string = '';
  imageUrl: string = '';
  imageName: string = '';
  imageUrlToDisplay: string | null = null;
  apiUrl = 'http://localhost:3000/api/image/images';

  async uploadImage() {
    if (!this.description || !this.imageUrl) {
      alert('Please enter a description and a valid image URL.');
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: this.description,
          imageUrl: this.imageUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Image uploaded successfully! ID: ' + data.image._id);
        this.imageName = data.image._id;
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  }

  async getImage() {
    if (!this.imageName) {
      alert('Please enter an image ID.');
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}/${this.imageName}`);
      const data = await response.json();

      if (response.ok) {
        if (data.url) {
          this.imageUrlToDisplay = data.url;
        } else {
          alert('Invalid response from server');
          console.error('Unexpected API response:', data);
        }
      } else {
        alert(data.error || 'Failed to fetch image');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      alert('Failed to fetch image.');
    }
  }
}
