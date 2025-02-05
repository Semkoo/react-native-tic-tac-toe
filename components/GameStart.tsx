import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import colors from '@/utils/colors';

type GameStartProps = {
  onStartGame: (humanFirst: boolean) => void;
};

export const GameStart = ({ onStartGame }: GameStartProps) => (
  <View style={styles.startOptions}>
    <Text style={styles.startTitle}>Who goes first?</Text>
    <View style={styles.buttonContainer}>
      <Button title="You" onPress={() => onStartGame(true)} />
      <Button title="Computer" onPress={() => onStartGame(false)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});
