import { User } from './user';

export class Card {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    priority: string;
    assignedTo?: User;
    assignedToId?: number;
    columnId: number;
    boardId: number;

}