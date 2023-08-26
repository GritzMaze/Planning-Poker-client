import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Item {
  title: string;
  content: string;
}
interface Column {
  title: string;
  tasks: Item[];
}

const COLUMNS: Column[] = [
  {
    title: 'To do',
    tasks: [
      {
        title: 'Task 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Task 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Task 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    title: 'In progress',
    tasks: [
      {
        title: 'Task 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Task 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    title: 'Done',
    tasks: [
      {
        title: 'Task 6',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
];

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

public columns: Column[] = COLUMNS;
  drop(event: CdkDragDrop<string>) {
    if (event.previousContainer === event.container) {
      this.columns.forEach((column) => {
        if (column.title === event.container.id) {
          moveItemInArray(
            column.tasks,
            event.previousIndex,
            event.currentIndex
          );
        }
      });
    } else {
      this.columns.forEach((column) => {
        if (column.title === event.previousContainer.id) {
          transferArrayItem(
            column.tasks,
            this.columns.find((col) => col.title === event.container.id)
              ?.tasks as Item[],
            event.previousIndex,
            event.currentIndex
          );
        }
      });
    }
    console.log(event);
  }
}
