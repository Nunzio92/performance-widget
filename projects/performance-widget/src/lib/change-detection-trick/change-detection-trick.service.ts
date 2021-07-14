import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, timer } from 'rxjs';
import { switchMapTo } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ChangeDetectionTrickService {
  private _totalCount = 0;
  private _subCount = 0;
  private _max_intreval = 50;
  private _current_max_interval = 0;
  private _prev_date = 0;
  private _error_intercepted = 0;
  private _wizardCreated = false;
  private _eventSubject = new BehaviorSubject<{ totalCount: number, errorCount: number, jsHeap: string }>({
    totalCount: 0,
    errorCount: 0,
    jsHeap: ''
  });

  constructor(private ngZone: NgZone) {
    let scrollEnd$ = fromEvent(document, 'scroll').pipe(
      map(v => false),
      switchMapTo(
        timer(1000).pipe(map(v => true)), // on every scroll, restart a timer
      ),
    );
    scrollEnd$.subscribe(v => console.log(v));
    this.ngZone.onUnstable.subscribe(_ => {
      this.emitEvent();
    });
  }

  emitEvent() {
    this._totalCount++;
    this._subCount++;
    this._prev_date = this._prev_date === 0 ? new Date().getTime() : this._prev_date;
    this._current_max_interval = Math.max(this._current_max_interval, new Date().getTime() - this._prev_date);
    this._prev_date = new Date().getTime();
    if (this._current_max_interval <= this._max_intreval && this._subCount > 20) {
      this._error_intercepted++;
      this._subCount = 0;
    }
    this._eventSubject.next({ totalCount: this._totalCount, errorCount: this._error_intercepted,
    jsHeap: `${Math.round((performance as any).memory.usedJSHeapSize / Math.pow(1024,2))} MB`});

  }

  getEventStream() {
    return this._eventSubject.asObservable();
  }

}
