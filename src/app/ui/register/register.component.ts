import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DestroyableComponent } from '../destroyable/destroyable.component';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends DestroyableComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
    ) {
    super();
  }

  submit() {
    if (this.form.valid) {
      this.preventLeak(this.authService.register(this.form.value)).pipe(
        switchMap(() => this.authService.login({username: this.form.controls['username'].value, password: this.form.controls['password'].value})),
      ).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  get errors() {
    const errors = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].errors) {
        errors.push(
          `${name} is ${Object.keys(controls[name].errors || {}).join(', ')}`
        );
      }
    }

    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  }
}
