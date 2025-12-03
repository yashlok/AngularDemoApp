import { Component, computed, effect, Signal, signal } from '@angular/core';
import { Product } from '../models/product';

type myFilter = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-signal-demo',
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.css'
})
export class SignalDemoComponent {
  num1 = signal<number>(1);
  num2 = signal<number>(1);
  total: Signal<number>;
  products = signal<Product[]>([
    // { productId: 1, productName: 'test', price: 1234, productCode: 'P001', active: false }
    // , { productId: 2, productName: 'test2', price: 545454, productCode: 'P002', active: false }
    // , { productId: 3, productName: 'test3', price: 65656, productCode: 'P003', active: true }
  ])
  filteredProducts: Signal<Product[]>;

  currentFilter = signal<myFilter>('all');

  activeCount = computed(()=> this.products().filter(f=>f.active == true).length);

  inactiveCount = computed(()=> this.products().filter(f=>f.active == false).length);

  constructor() {
    this.total = computed(() => {
      let totalNum = this.num1() + this.num2();
      return totalNum;
    })

    this.filteredProducts = computed(() => {
      return this.products().filter(p => {
        switch (this.currentFilter()) {
          case "all":
            return true;
          case "active":
            return p.active;
          case "inactive":
            return !p.active;
          default:
            return true;
        }
      })
    })

    effect(()=> {
      console.log('Print Num1:' + this.num1());
    })
  }

  update1() {
    this.num1.update(n => n * 2);
  }

  update2() {
    this.num2.update(n => n * 4);
  }

  updateFilter(e: Event) {
    let selectVal = e.target as HTMLSelectElement;
    this.currentFilter.set(selectVal.value as myFilter);
  }
}
