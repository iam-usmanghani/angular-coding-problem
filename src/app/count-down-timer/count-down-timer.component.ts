import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down-timer',
  imports: [],
  providers: [],
  templateUrl: './count-down-timer.component.html',
  styleUrl: './count-down-timer.component.scss'
})
export class CountDownTimerComponent implements OnInit, OnDestroy {

  private URL = '/api/deadline'; //API endpoint 
  
  secondsLeft: number | null = null;
  private countdownSubscription: Subscription | null = null;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchDeadline();
  }

  private fetchDeadline() {
    fetch(this.URL)
      .then(response => response.json())
      .then((data: DeadlineResponse) => {
        this.secondsLeft = data.secondsLeft || 0;
        this.startCountdown();
      })
      .catch(error => console.error('Error fetching deadline:', error));
  }

  private startCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.secondsLeft !== null && this.secondsLeft > 0) {
        this.secondsLeft--;
        this._cdr.markForCheck();
      } else {
        this.countdownSubscription?.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.countdownSubscription?.unsubscribe();
  }

}

export interface DeadlineResponse {
  secondsLeft: number;
}
