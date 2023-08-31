import { Column } from './column';
import { User } from './user';

export class Board {
    id: number;
    name: string;
    owner: User;
    createdAt: string;
    columns: Column[];
}