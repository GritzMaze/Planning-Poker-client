import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export abstract class DestroyableComponent implements OnDestroy{
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected preventLeak<T>(observable: Observable<T>) {
    return observable.pipe(takeUntil(this.destroy$));
  }
}
