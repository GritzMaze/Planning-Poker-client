import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestroyableComponent } from '../destroyable/destroyable.component';
import { catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends DestroyableComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
      this.preventLeak(this.authService.login(this.form.value)).subscribe(() => {
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

    return errors;
  }
}
