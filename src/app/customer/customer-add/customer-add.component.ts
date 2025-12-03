import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CustomerListComponent } from "../customer-list/customer-list.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-add',
  imports: [
    CustomerListComponent
    , FormsModule
    , CommonModule
  ],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent {
  customerName: string | undefined;
  customers: string[];

  @ViewChild('custlistComp')
  customerListComp!: CustomerListComponent;

  @ViewChild('divAlert')
  divAlert!: ElementRef;

  @ViewChildren('divAlert1')
  divAlerts!: QueryList<ElementRef>;

  constructor() {
    this.customers = [];
  }

  addCustomer() {
    //this.customers.push(this.customerName??"");

    this.customerListComp.customerList.push(this.customerName ?? "");
    if (this.divAlert != null) {
      this.divAlert.nativeElement.style.display = 'block';
      this.divAlert.nativeElement.innerHTML = 'New Customer Added';
      setTimeout(() => {
        this.divAlert.nativeElement.style.display = 'none';
      }, 2000);
    }

    this.divAlerts.forEach((ele)=>{
      ele.nativeElement.innerHTML = Math.random();
    })
  }

  readValues(msg: string) {
    this.customerName = msg;
  }
}
