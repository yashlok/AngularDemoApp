import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {

  @Input('customer-list')
  customerList: string[];

  @Output('on-selection')
  onSelect: EventEmitter<string>;

   @Output('my-click')
   myClick: EventEmitter<string>;

  constructor() {
    this.customerList = [];
    this.onSelect = new EventEmitter<string>();
    this.myClick = new EventEmitter<string>();
  }

  selectCustomer(msg: string) {
    this.onSelect.emit(msg);
  }
}
