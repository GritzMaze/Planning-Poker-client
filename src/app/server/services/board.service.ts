import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../models/board';



const board: Board = {
  id: 1,
  name: 'Board 1',
  columns: [
    {
      id: 1,
      name: 'TO DO',
      cards: [
        {
          id: 1,
          name: 'Card 1',
          created: new Date(),
          priority: "Low",
          assignedTo: "John Doe"
        },
        {
          id: 2,
          name: 'Card 2',
          created: new Date(),
          priority: "Low",
          assignedTo: "John Doe"
        },
        {
          id: 3,
          name: 'Card 3',
          created: new Date(),
          priority: "High",
          assignedTo: "John Doe"
        }
      ],
      color: '#43ADEA',
    },
    {
      id: 2,
      name: 'In Progress',
      cards: [
        {
          id: 4,
          name: 'Card 4',
          created: new Date(),
          priority: "Critical",
          assignedTo: "John Doe"
        },
        {
          id: 5,
          name: 'Card 5',
          created: new Date(),
          priority: "Medium",
          assignedTo: "John Doe"
        },
        {
          id: 6,
          name: 'Card 6',
          created: new Date(),
          priority: "High",
          assignedTo: "John Doe"
        }
      ],
      color: '#36D288',
    },
    {
      id: 3,
      name: 'Done',
      cards: [
        {
          id: 7,
          name: 'Card 7',
          created: new Date(),
          priority: "Critical",
          assignedTo: "John Doe"
        },
        {
          id: 8,
          name: 'Card 8',
          created: new Date(),
          priority: "High",
          assignedTo: "John Doe"
        },
        {
          id: 9,
          name: 'Card 9',
          created: new Date(),
          priority: "Low",
          assignedTo: "John Doe"
        }
      ],
      color: '#FFC165',
    }
  ]
}



@Injectable()
export class BoardService {

  private apiUrl: string;

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl;
  }

  getBoardById(id: number) : Observable<Board> {
    return of(board);
    // return this.http.get<Board>(`${this.apiUrl}/board/${id}`);
  }

  deleteBoardById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/board/${id}`);
  }
}
