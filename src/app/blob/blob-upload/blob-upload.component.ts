import { Component } from '@angular/core';
import { BlobService } from '../../services/blob.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blob-upload',
  imports: [CommonModule],
  templateUrl: './blob-upload.component.html',
  styleUrl: './blob-upload.component.css'
})
export class BlobUploadComponent {
  selectedFile: File | null = null;
  uploading = false;
  successMessage = '';

  constructor(private blobService: BlobService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.successMessage = '';
  }

  uploadImage(): void {
    if (!this.selectedFile) return;
    
    this.uploading = true;
    this.successMessage = '';
    this.blobService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        this.uploading = false;
        this.selectedFile = null;
        this.successMessage = 'Image upload successfully';
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.uploading = false;
      }
    });
  }
}
