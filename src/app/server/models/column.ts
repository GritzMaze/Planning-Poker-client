import { Card } from './card';

export class Column {
    id: number;
    name: string;
    color: string;
    boardId: number;
    cards: Card[];
}