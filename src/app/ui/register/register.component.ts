import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl(''),

  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Output() submitEM = new EventEmitter();

  get errors() {
    const errors = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].errors) {
        errors.push(`${name} is ${Object.keys(controls[name].errors || {}).join(', ')}`)
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
