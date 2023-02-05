import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    //  this.firstSubscription = interval(1000).subscribe(count => {
    //     console.log(count)
    //   })

    const customObservable = new Observable<number>((observator) => {
      let count = 0;
      setInterval(() => {
        observator.next(count);
        count++;

        if(count === 3) {
          observator.complete()
        }

        if (count > 7) {
          observator.error(new Error("Maior que 7!"))
        }
      }, 1000);
    });

    this.firstSubscription = customObservable.pipe(map((data)=> {
      return "Round: " + (data + 1)
    })).subscribe((count) => {
      console.log(count);
    }, (error)=> {
      alert(error.message)
    }, ()=> {
      alert("Observável concluído!")
    });
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
