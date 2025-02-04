export type Cell = 'x' | 'o' | null;
export type BoardState = Cell[];

export type Moves = number;

export type BoardResult = {
  winner: Cell;
  direction?: 'VERTICAL' | 'HORIZONTAL' | 'DIAGONAL';
  column?: number;
  row?: number;
  diagonal?: 'MAIN' | 'COUNTER';
};

export type GameMode = 'HUMAN' | 'BOT';
