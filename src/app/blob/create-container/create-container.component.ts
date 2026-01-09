import { Component } from '@angular/core';
import { BlobService } from '../../services/blob.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-container',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-container.component.html',
  styleUrl: './create-container.component.css'
})
export class CreateContainerComponent {
  containerName = '';
  creating = false;
  successMessage = '';
  errorMessage = '';

  constructor(private blobService: BlobService) { }

  createContainer(): void {
    if (!this.containerName) return;
    
    this.creating = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.blobService.createContainer(this.containerName).subscribe({
      next: (response) => {
        this.creating = false;
        this.successMessage = 'Container created successfully';
        this.containerName = '';
      },
      error: (error) => {
        console.error('Container creation failed:', error);
        this.creating = false;
        this.errorMessage = error.error || 'Container creation failed. It may already exist.';
      }
    });
  }
}
