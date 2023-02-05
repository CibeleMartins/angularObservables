import { Component, OnInit} from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-interacting-with-observables',
  templateUrl: './interacting-with-observables.component.html',
  styleUrls: ['./interacting-with-observables.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        display: "flex",
        opacity: 1,
  
      })),
      state('closed', style({
        opacity: 0.8,
        display: "none"
      })),
      transition('open => closed', [
        style({transform:'scale(0.7)'}),
        animate('0.5s')
      ]),
      transition('closed => open', [
        style({transform:'scale(0.7)'}),
        animate('0.5s')
      ]),
    ]),
  ]
})
export class InteractingWithObservablesComponent implements OnInit {

  private storeObservable: Subscription;

  valueInput: string = '';

  constructor() { }

  ngOnInit(): void {

  }

  showDiv = true;

  showElement() {

    if (this.showDiv === false) {

      this.showDiv = !this.showDiv

    } else if (this.showDiv === true) {

      this.showDiv = !this.showDiv
    
    }
  }
 
  activeObservable(value: string) {

    const customObservable = new Observable((observer)=> {

     observer.next(value)

     if(value.length > 10) {

      observer.error(new Error ("Palavra muito grande!"))
     }

     if(value.length >= 6) {
      observer.complete();
     }
    })

    this.storeObservable = customObservable.pipe(map((v: string)=> {
      return v.toUpperCase()
    })).subscribe((string)=> {

      console.log("Valor digitado: " + string)
    }, (error)=> {

      alert(error.message)
    }, ()=> {
      alert("Observável concluído!")
    })

    this.valueInput = '';
  }

}
