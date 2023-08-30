import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent {
  public formGroup: FormGroup;

  private numberOfColumnsSubject$ = new BehaviorSubject<string[]>([]);
  public numberOfColumns$: Observable<string[]> =
    this.numberOfColumnsSubject$.asObservable();

  constructor(
    private dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      columns: this.formBuilder.array([]),
    });
  }

  addColumn() {
    const numberOfColumns = this.numberOfColumnsSubject$.getValue();
    const columnNumber = numberOfColumns.length + 1;
    console.log(columnNumber);
    this.numberOfColumnsSubject$.next(
      numberOfColumns.concat(`column${columnNumber}`)
    );
    const columns = this.formGroup.get('columns') as FormArray;
    columns.push(
      new FormControl({}, [Validators.required])
    );

    console.log(this.formGroup.value);
  }

  removeColumn(index: number) {
    const numberOfColumns = this.numberOfColumnsSubject$.getValue();
    numberOfColumns.splice(index, 1);
    this.numberOfColumnsSubject$.next(numberOfColumns);
    const columns = this.formGroup.get('columns') as FormArray;
    columns.removeAt(index);
  }

  submit() {
    const formValue = this.formGroup.value;
    const columns = formValue.columns.map((column: any) => {
      return {
        name: column.name,
        color: column.color,
      };
    });
    const board = {
      name: this.formGroup.get('name')?.value,
      columns: columns,
    }

    this.dialogRef.close(board);
  }

  close() {
    this.dialogRef.close();
  }
}
