import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-column-row',
  templateUrl: './column-row.component.html',
  styleUrls: ['./column-row.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColumnRowComponent),
      multi: true
    },
  ]
})
export class ColumnRowComponent implements ControlValueAccessor {

  @Output() deleted = new EventEmitter<void>();
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: '',
      color: ''
    });
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
