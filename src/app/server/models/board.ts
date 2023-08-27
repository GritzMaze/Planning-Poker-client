import { Column } from './column';

export class Board {
    id: number;
    name: string;
    owner: string;
    created: string;
    columns: Column[];
}