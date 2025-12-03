import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mytest',
  imports: [FormsModule],
  templateUrl: './mytest.component.html',
  styleUrl: './mytest.component.css'
})
export class MytestComponent {
 mySelectedValue: string = '';
 currentTime = new Date();
 str1 = signal<string>('Hello');
  constructor() { }

  onSelectChange(event: any) {
      this.mySelectedValue = event.target.value;
    console.log('Selected value:', this.mySelectedValue);
    this.str1.set(this.mySelectedValue);

    // let selectVal = e.target as HTMLSelectElement;
    //this.currentFilter.set(selectVal.value as myFilter);
  }
}


