import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { Board } from 'src/app/server/models/board';
import { User } from 'src/app/server/models/user';
import { BoardService } from 'src/app/server/services/board.service';
import { CardService } from 'src/app/server/services/card.service';
import { ColumnService } from 'src/app/server/services/column.service';
import { UserService } from 'src/app/server/services/user.service';
import { DestroyableComponent } from 'src/app/ui/destroyable/destroyable.component';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends DestroyableComponent implements OnInit {
  public formGroup: FormGroup;

  public board$: Observable<Board>;

  public users$: Observable<User[]>;
  public priorities = ['Low', 'Medium', 'High', 'Critical'];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private columnService: ColumnService,
    private boardService: BoardService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    super();

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      column: ['', Validators.required],
      assignedTo: [null],
      dueDate: [null],
      priority: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      const card$ = this.preventLeak(this.cardService.getCardById(id));
      const columnId$ = card$.pipe(map((card) => card.columnId));
      const column$ = this.preventLeak(
        columnId$.pipe(
          switchMap((columnId) => this.columnService.getColumnById(columnId))
        )
      );

      combineLatest([card$, column$]).subscribe(([card, column]) => {
        this.formGroup.patchValue({
          name: card.name,
          description: card.description,
          column: column.id,
          assignedTo: card.assignedTo?.id,
          priority: card.priority,
        });
      });

      this.board$ = this.preventLeak(
        column$.pipe(
          switchMap((column) => this.boardService.getBoardById(column.boardId))
        )
      );
    } else {
      const columnId = Number(
        this.route.snapshot.queryParamMap.get('columnId')
      );
      const column$ = this.preventLeak(
        this.columnService.getColumnById(columnId)
      );
      column$.subscribe((column) => {
        this.formGroup.patchValue({
          name: '',
          description: '',
          column: column.id,
          assignedTo: '',
          priority: '',
        });
      });

      this.board$ = this.preventLeak(
        column$.pipe(
          switchMap((column) => this.boardService.getBoardById(column.boardId))
        )
      );
    }

    this.users$ = this.preventLeak(this.userService.getUsers()).pipe(
      map((users) => {
        users.push({ id: null, name: 'Unassigned', email: '', username: '' });
        return users;
      })
    );
  }

  private updateCard(formValue: any) {
    const card = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      name: formValue.name,
      description: formValue.description,
      columnId: formValue.column,
      assignedToId: formValue.assignedTo,
      priority: formValue.priority,
      createdAt: new Date().toISOString(),
      boardId: 0,
    };

    this.preventLeak(this.board$)
      .pipe(
        switchMap((board) => {
          card.boardId = board.id;
          return this.cardService.updateCard(card);
        })
      )
      .subscribe(() => {
        this.messageService.showInfo('Card updated successfully');
      });
  }

  submit() {
    const formValue = this.formGroup.value;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      this.updateCard(formValue);
    } else {
      const card = {
        id: id,
        name: formValue.name,
        description: formValue.description,
        columnId: formValue.column,
        assignedToId: formValue.assignedTo,
        priority: formValue.priority,
        createdAt: new Date().toISOString(),
        boardId: 0,
      };

      this.preventLeak(this.board$)
        .pipe(
          switchMap((board) => {
            card.boardId = board.id;
            return this.cardService.createCard(card);
          })
        )
        .subscribe(() => {
          this.messageService.showInfo('Card created successfully');
        });
    }
  }
}
