import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  imports: [
    CommonModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit, AfterContentInit {
  currentDate: Date;

  @ContentChild('footer')
  footerDiv!: ElementRef;

  constructor() {
    this.currentDate = new Date();
  }

  ngAfterContentInit(): void {
    this.footerDiv.nativeElement.innerHTML = this.footerDiv.nativeElement.innerHTML + "(Draft Mode)";
  }

  ngOnInit(): void {
  }
}
