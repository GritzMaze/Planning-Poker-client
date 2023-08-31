import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { tap } from 'rxjs';


const COLORS = [
  { name: 'Red', value: '#CC0000'},
  { name: 'Blue', value: '#4666ab'},
  { name: 'Green', value: '#106633'},
  { name: 'Yellow', value: '#FFC165'},
  { name: 'Aqua', value: '#2B6662'},
  { name: 'purple', value: '#CC00B8'},
]
@Component({
  selector: 'app-column-row',
  templateUrl: './column-row.component.html',
  styleUrls: ['./column-row.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColumnRowComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ColumnRowComponent),
      multi: true
    }
  ]
})
export class ColumnRowComponent implements ControlValueAccessor, Validator {

  @Output() deleted = new EventEmitter<void>();
  public formGroup: FormGroup;
  public colors = COLORS;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required)
    });
   }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'Column fields are invalid'}};
  }
   delete() {
      this.deleted.emit();
   }

  writeValue(obj: any): void {
    this.formGroup.patchValue(obj, { emitEvent: false });
  }
  
  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnTouched(fn: any): void { }
  

}
