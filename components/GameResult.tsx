import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

import { Cell } from '@/utils/types';
import colors from '@/utils/colors';

type GameResultProps = {
  winner: Cell;
  isHumanMaximizing: boolean;
  onNewGame: () => void;
};

export const GameResult = ({ winner, isHumanMaximizing, onNewGame }: GameResultProps) => {
  const getWinnerText = useCallback(() => {
    if (winner === 'x') return isHumanMaximizing ? 'You Won' : 'You Lost';
    if (winner === 'o') return isHumanMaximizing ? 'You Lost' : 'You Won';
    return "It's a Draw";
  }, [winner, isHumanMaximizing]);

  return (
    <View style={styles.modal}>
      <Text style={styles.modalText}>{getWinnerText()}</Text>
      <Button onPress={onNewGame} title="Play Again" />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
