import { Component, OnInit } from '@angular/core';
import { BlobService } from '../services/blob.service';
import { Blob } from '../models/blob';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blob',
  imports: [CommonModule],
  templateUrl: './blob.component.html',
  styleUrl: './blob.component.css'
})
export class BlobComponent implements OnInit {
  blobs: Blob[] = [];

  constructor(private blobService: BlobService) { }

  ngOnInit(): void {
    this.getBlobs();
  }

  getBlobs(): void {
    this.blobService.getBlobs().subscribe({
      next: (data) => this.blobs = data,
      error: (error) => console.error('Error fetching blobs:', error)
    });
  }
}
