import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Board } from '../models/board';
import { EnvironmentService } from 'src/app/core/services/environment.service';

export interface BoardsWithCount {
  total: number;
  boards: Board[];
}

@Injectable()
export class BoardService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    environmentService: EnvironmentService
  ) {
    this.apiUrl = environmentService.apiUrl;
  }

  getBoardById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/boards/${id}`);
  }

  getBoards(
    filter?: string,
    offset?: number,
    limit?: number
  ): Observable<BoardsWithCount> {
    filter = filter || '';
    offset = offset || 0;
    limit = limit || 10;
    const query = `?filter=${filter}&offset=${offset}&limit=${limit}`;
    return this.http
      .get<BoardsWithCount>(`${this.apiUrl}/boards/${query}`)
      .pipe(
        map((boardsWithCount: BoardsWithCount) => ({
          total: boardsWithCount.total,
          boards: boardsWithCount.boards.map((board: Board) => {
            board.createdAt = new Date(board.createdAt).toLocaleString();
            return board;
          }),
        }))
      );
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/boards`, board);
  }

  deleteBoardById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/boards/${id}`);
  }

  updateBoard(board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/boards/${board.id}`, board);
  }
}
