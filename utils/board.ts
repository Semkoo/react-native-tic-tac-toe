import { BoardState, BoardResult, Moves } from './types';

export const isEmpty = (board: BoardState): boolean => {
  return board.every(cell => cell === null);
};

export const isBoardFull = (board: BoardState): boolean => {
  return board.every(cell => cell !== null);
};

export const getAvailableMoves = (board: BoardState): Moves[] => {
  const movies: Moves[] = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      movies.push(i as Moves);
    }
  }

  return movies;
};

export const generateWinningLines = (size: number): number[][] => {
  const lines: number[][] = [];

  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(j * size + i);
    }
    lines.push(column);
  }

  // Main diagonal
  const mainDiagonal = [];
  for (let i = 0; i < size; i++) {
    mainDiagonal.push(i * size + i);
  }
  lines.push(mainDiagonal);

  // Counter diagonal
  const counterDiagonal = [];
  for (let i = 0; i < size; i++) {
    counterDiagonal.push(i * size + (size - 1 - i));
  }
  lines.push(counterDiagonal);

  return lines;
};

export const getBoardResult = (board: BoardState): BoardResult | false => {
  if (isEmpty(board)) {
    return false;
  }

  // Possible winning lines - rows, columns, diagonals
  const size = Math.sqrt(board.length); // 3x3 board for now
  const winningLines = generateWinningLines(size);

  for (const line of winningLines) {
    const [first, ...rest] = line;
    if (board[first] && rest.every(cell => board[cell] === board[first])) {
      const result: BoardResult = {
        winner: board[first],
      };

      // Calculate row number (1-based)
      if (line.every(cell => Math.floor(cell / size) === Math.floor(first / size))) {
        result.direction = 'HORIZONTAL';
        result.row = (Math.floor(first / size) + 1) as 1 | 2 | 3;
      }
      // Calculate column number (1-based)
      else if (line.every(cell => cell % size === first % size)) {
        result.direction = 'VERTICAL';
        result.column = ((first % size) + 1) as 1 | 2 | 3;
      }
      // Diagonal checks
      else {
        result.direction = 'DIAGONAL';
        result.diagonal = first === 0 ? 'MAIN' : 'COUNTER';
      }

      return result;
    }
  }

  if (isBoardFull(board)) {
    return {
      winner: null,
    };
  }

  return false;
};
