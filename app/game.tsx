import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import Board from '@/components/board/Board';
import colors from '@/utils/colors';
import { BoardState, Cell, GameMode } from '@/utils/types';
import { getBoardResult, isEmpty } from '@/utils/board';
import { getBestMove } from '@/utils/minimax';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

const INITIAL_BOARD_STATE = Array(9).fill(null) as BoardState;

//Advantage to finish on first move
const CENTER_AND_CORNERS = [0, 2, 6, 8, 4];

const SCREEN_SIZE = Dimensions.get('window').width;
const BOARD_SIZE = SCREEN_SIZE * 0.8;

export default function Game() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [state, setState] = useState<BoardState>(INITIAL_BOARD_STATE);
  const [turn, setTurn] = useState<GameMode>();
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

  const gameResult = useMemo(() => getBoardResult(state), [state]);

  const getWinner = useCallback(
    (winnerSymbol: Cell): 'HUMAN' | 'BOT' | 'DRAW' => {
      if (winnerSymbol === 'x') {
        return isHumanMaximizing ? 'HUMAN' : 'BOT';
      }
      if (winnerSymbol === 'o') {
        return isHumanMaximizing ? 'BOT' : 'HUMAN';
      }
      return 'DRAW';
    },
    [isHumanMaximizing]
  );

  const insertCell = useCallback(
    (index: number, value: Cell) => {
      const stateCopy = [...state];
      stateCopy[index] = value as Cell;
      setState(stateCopy as BoardState);
    },
    [state]
  );

  const handleOnCellPressed = useCallback(
    (index: number) => {
      if (turn !== 'HUMAN') {
        return;
      }
      insertCell(index, isHumanMaximizing ? 'x' : 'o');
      setTurn('BOT');
    },
    [insertCell, isHumanMaximizing, turn]
  );

  const startGame = useCallback((humanFirst: boolean) => {
    setGameStarted(true);
    setTurn(humanFirst ? 'HUMAN' : 'BOT');
    setIsHumanMaximizing(humanFirst);
  }, []);

  const newGame = useCallback(() => {
    setGameStarted(false);
    setState(INITIAL_BOARD_STATE);
    setTurn('HUMAN');
    setIsHumanMaximizing(true);
  }, []);

  useEffect(() => {
    if (turn === 'BOT') {
      // Add a small delay before the bot makes its move
      const timeoutId = setTimeout(() => {
        if (isEmpty(state)) {
          const firstMove =
            CENTER_AND_CORNERS[Math.floor(Math.random() * CENTER_AND_CORNERS.length)];
          insertCell(firstMove, 'x');
          setIsHumanMaximizing(false);
          setTurn('HUMAN');
        } else {
          const best = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(best, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }, 500); // 500ms delay

      // Cleanup timeout on unmount or when dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, [insertCell, isHumanMaximizing, state, turn]);

  return (
    <GradientBackground>
      <View style={styles.container}>
        {!gameStarted ? (
          <View style={styles.startOptions}>
            <Text style={styles.startTitle}>Who goes first?</Text>
            <View style={styles.buttonContainer}>
              <Button title="You" onPress={() => startGame(true)} />
              <Button title="Computer" onPress={() => startGame(false)} />
            </View>
          </View>
        ) : (
          <>
            <Board
              state={state}
              disabled={Boolean(gameResult) || turn === 'BOT'}
              onCellPressed={handleOnCellPressed}
              gameResult={gameResult}
              size={BOARD_SIZE}
            />
            {!gameResult && (
              <Text style={styles.turnIndicator}>
                {turn === 'HUMAN' ? 'Your turn' : "Opponent's turn"}
              </Text>
            )}

            {gameResult && (
              <View style={styles.modal}>
                <Text style={styles.modalText}>
                  {getWinner(gameResult.winner) === 'HUMAN' && 'You Won'}
                  {getWinner(gameResult.winner) === 'BOT' && 'You Lost'}
                  {getWinner(gameResult.winner) === 'DRAW' && "It's a Draw"}
                </Text>
                <Button onPress={newGame} title="Play Again" />
              </View>
            )}
          </>
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  startOptions: {
    alignItems: 'center',
    marginTop: 100,
  },
  startTitle: {
    color: colors.lightGreen,
    fontSize: 28,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },

  difficulty: {
    color: colors.lightGreen,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
  },
  resultsBox: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.lightPurple,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
  },
  resultsTitle: {
    color: colors.darkPurple,
    fontSize: 14,
  },
  resultsCount: {
    color: colors.darkPurple,
    fontSize: 20,
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.darkPurple,
    bottom: 40,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: colors.lightGreen,
  },
  modalText: {
    color: colors.lightGreen,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
  },
  turnIndicator: {
    color: colors.lightGreen,
    fontSize: 24,
    marginTop: 30,
    textAlign: 'center',
  },
});
