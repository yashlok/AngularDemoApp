import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding',
  imports: [
    FormsModule
  ],
  templateUrl: './databinding.component.html',
  styleUrl: './databinding.component.css'
})
export class DatabindingComponent {
  productName: string = "Laptop";
  productCode: string = "P@323";
  
  showAlert(): void
  {
    alert('Product Name =' + this.productName);
  }
}
