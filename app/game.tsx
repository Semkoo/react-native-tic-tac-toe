import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import Board from '@/components/Board';
import colors from '@/utils/colors';
import { BoardState, Cell, GameMode } from '@/utils/types';
import { getBoardResult, isEmpty } from '@/utils/board';
import { getBestMove } from '@/utils/minimax';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function Game() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [state, setState] = useState<BoardState>(Array(9).fill(null) as BoardState);
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

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);

      if (winner === 'DRAW') {
        // TODO:: ADD a Notification Haptic
        Alert.alert('Game Over', 'It is a draw!');
      } else if (winner === 'HUMAN') {
        // TODO:: ADD a Notification Haptic
        Alert.alert('Game Over', 'You won!');
      } else {
        // TODO:: ADD a Notification Haptic
        Alert.alert('Game Over', 'You lost!');
      }
    } else {
      if (turn === 'BOT') {
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];
          const firstMove = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
          insertCell(firstMove, 'x');
          setIsHumanMaximizing(false);
          setTurn('HUMAN');
        } else {
          const best = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(best, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }
    }
  }, [gameResult, getWinner, insertCell, isHumanMaximizing, state, turn]);

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
          <Board
            state={state}
            disabled={Boolean(gameResult) || turn === 'BOT'}
            onCellPressed={handleOnCellPressed}
          />
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
    backgroundColor: colors.lightPurple,
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
});
