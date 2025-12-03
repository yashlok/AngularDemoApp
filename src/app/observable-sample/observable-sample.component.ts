import { Component } from '@angular/core';
import { delay, filter, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-observable-sample',
  imports: [],
  templateUrl: './observable-sample.component.html',
  styleUrl: './observable-sample.component.css'
})
export class ObservableSampleComponent {

  observableData!: Observable<string>;
  subscription!: Subscription;

  constructor() {

  }

  create() {
    this.observableData = new Observable<string>(ob => {
      ob.next('test1');
      ob.next('xyz2');
      ob.next('test3');
      setInterval(() => {
        ob.next('test' + Math.random());
      }, 1000);
      setTimeout(() => {
        ob.error('OOPS');
      }, 5000);
    })

  }

  fetch() {
    var observer = {
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: any) => {
        console.log('Error', err);
      },
      complete: () => {
        console.log('End of stream');
      }
    }

    this.subscription = this.observableData.subscribe(observer);
  }

  operate() {
    this.observableData = this.observableData.pipe(
      map(d => d.toLocaleUpperCase())
      ,filter(f=>f.includes("TEST"))
      ,retry({ count:2, delay:2000 })
    )
  }

  unsubscribe(){
    this.subscription.unsubscribe();
    console.log('UnSubscribed');
  }

}
