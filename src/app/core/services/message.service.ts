import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages$ = new Subject<string>();

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.messages$.subscribe(message => {
      this.snackBar.open(message, 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
   }

    showInfo(message: string): void {
    this.messages$.next(message);
    }

   showError(error: string): void {
    this.messages$.next(`Error: ${this.toErrorMessage(error)}`);
   }

   private toErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (typeof error.message === 'string') {
      return error.message;
    }

    return JSON.stringify(error);
   }
}
