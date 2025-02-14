// Create a context for the game history

import { createContext, useCallback, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_HISTORY_KEY = '@gameHistory';

export type GameHistory = {
  id: string;
  date: string;
  result: string;
  streak?: {
    type: 'winning' | 'losing';
    count: number;
  };
};

export interface GameStats {
  totalGames: number;
  aiWins: number;
  draws: number;
  winLossRatio: number;
  longestWinStreak: number;
  longestLoseStreak: number;
}

export interface GameHistoryMethods {
  state: GameHistory[];
  stats: GameStats;
  set: (state: GameHistory[]) => void;
  add: (addState: GameHistory) => void;
}

const GameHistoryContext = createContext<GameHistoryMethods>({
  state: [],
  stats: {
    totalGames: 0,
    aiWins: 0,
    draws: 0,
    winLossRatio: 0,
    longestWinStreak: 0,
    longestLoseStreak: 0,
  },
  set: () => {},
  add: () => {},
});

export enum GameHistoryActionType {
  ADD_GAME_HISTORY = 'ADD_GAME_HISTORY',
  SET_GAME_HISTORY = 'SET_GAME_HISTORY',
}

type GameHistoryAction = {
  type: GameHistoryActionType;
  payload: GameHistory[];
};

function reducer(state: GameHistory[], action: GameHistoryAction): GameHistory[] {
  switch (action.type) {
    case GameHistoryActionType.ADD_GAME_HISTORY:
      return [...state, ...action.payload];
    case GameHistoryActionType.SET_GAME_HISTORY:
      return action.payload;
    default:
      return state;
  }
}

function calculateStats(history: GameHistory[]): GameStats {
  const stats: GameStats = {
    totalGames: history.length,
    aiWins: history.filter(game => game.result === 'loss').length,
    draws: history.filter(game => game.result === 'draw').length,
    winLossRatio: 0,
    longestWinStreak: 0,
    longestLoseStreak: 0,
  };

  // Calculate win/loss ratio
  const wins = history.filter(game => game.result === 'win').length;
  const losses = stats.aiWins;
  stats.winLossRatio = losses === 0 ? wins : wins / losses;

  // Calculate streaks
  let currentWinStreak = 0;
  let currentLoseStreak = 0;

  history.forEach(game => {
    if (game.result === 'win') {
      currentWinStreak++;
      currentLoseStreak = 0;
      stats.longestWinStreak = Math.max(stats.longestWinStreak, currentWinStreak);
    } else if (game.result === 'loss') {
      currentLoseStreak++;
      currentWinStreak = 0;
      stats.longestLoseStreak = Math.max(stats.longestLoseStreak, currentLoseStreak);
    } else {
      currentWinStreak = 0;
      currentLoseStreak = 0;
    }
  });

  return stats;
}

async function deriveBaseState(): Promise<GameHistory[]> {
  try {
    const storedHistory = await AsyncStorage.getItem(GAME_HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error('Error loading game history:', error);
    return [];
  }
}

export function GameHistoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);
  const stats = calculateStats(state);

  // Load initial state from AsyncStorage
  useEffect(() => {
    deriveBaseState().then(baseState => {
      if (baseState.length > 0) {
        set(baseState);
      }
    });
  }, []);

  const add = useCallback(
    async (add: GameHistory) => {
      dispatch({ type: GameHistoryActionType.ADD_GAME_HISTORY, payload: [add] });
      try {
        const newState = [...state, add];
        await AsyncStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('Error saving game history:', error);
      }
    },
    [state]
  );

  const set = useCallback(async (newState: GameHistory[]) => {
    dispatch({ type: GameHistoryActionType.SET_GAME_HISTORY, payload: newState });
    try {
      await AsyncStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving game history:', error);
    }
  }, []);

  return (
    <GameHistoryContext.Provider
      value={{
        state,
        stats,
        set,
        add,
      }}>
      {children}
    </GameHistoryContext.Provider>
  );
}

export const useGameHistory = () => {
  const context = useContext(GameHistoryContext);

  if (!context) {
    throw new Error('useGameHistory must be used within a GameHistoryProvider');
  }

  return context;
};
