export type Cell = 'x' | 'o' | null;
export type BoardState = Cell[];

export type Moves = number;

export type BoardResult = {
  winner: Cell;
  direction?: 'VERTICAL' | 'HORIZONTAL' | 'DIAGONAL';
  column?: 1 | 2 | 3;
  row?: 1 | 2 | 3;
  diagonal?: 'MAIN' | 'COUNTER';
};

export type GameMode = 'HUMAN' | 'BOT';
