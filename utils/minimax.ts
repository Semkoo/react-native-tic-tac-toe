import { BoardState } from './types';
import { getAvailableMoves, getBoardResult } from './board';

/**
 * Finds the best move for the current player using the minimax algorithm
 * @param state Current board state
 * @param maximizing True if it's X's turn (maximizing player), false for O (minimizing player)
 * @param depth Current depth in the game tree
 * @param maxDepth Maximum depth to search (-1 for unlimited)
 * @returns The index of the best move
 */
export const getBestMove = (
  state: BoardState,
  maximizing: boolean,
  depth = 0,
  maxDepth = -1
): number => {
  // Stores possible moves and their scores
  const moveScores: { [score: string]: string } = {};

  const minimax = (state: BoardState, maximizing: boolean, depth = 0, maxDepth = -1): number => {
    // Check for terminal state or max depth reached
    const result = getBoardResult(state);
    if (result || depth === maxDepth) {
      if (!result) return 0;
      return result.winner === 'x' ? 100 - depth : -100 + depth;
    }

    // Handle maximizing player (X)
    if (maximizing) {
      let bestScore = -100;

      getAvailableMoves(state).forEach(moveIndex => {
        const childState: BoardState = [...state];
        childState[moveIndex] = 'x';

        const score = minimax(childState, false, depth + 1, maxDepth);
        bestScore = Math.max(bestScore, score);

        // Store moves at root level for random selection among equal scores
        if (depth === 0) {
          moveScores[score] = moveScores[score]
            ? `${moveScores[score]},${moveIndex}`
            : `${moveIndex}`;
        }
      });

      // At root level, randomly select among best moves
      if (depth === 0) {
        const bestMoves = moveScores[bestScore].split(',');
        return parseInt(bestMoves[Math.floor(Math.random() * bestMoves.length)]);
      }

      return bestScore;
    }

    // Handle minimizing player (O)
    else {
      let bestScore = 100;

      getAvailableMoves(state).forEach(moveIndex => {
        const childState: BoardState = [...state];
        childState[moveIndex] = 'o';

        const score = minimax(childState, true, depth + 1, maxDepth);
        bestScore = Math.min(bestScore, score);

        // Store moves at root level for random selection among equal scores
        if (depth === 0) {
          moveScores[score] = moveScores[score]
            ? `${moveScores[score]},${moveIndex}`
            : `${moveIndex}`;
        }
      });

      // At root level, randomly select among best moves
      if (depth === 0) {
        const bestMoves = moveScores[bestScore].split(',');
        return parseInt(bestMoves[Math.floor(Math.random() * bestMoves.length)]);
      }

      return bestScore;
    }
  };

  return minimax(state, maximizing, depth, maxDepth);
};
