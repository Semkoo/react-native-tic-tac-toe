import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import colors from '@/utils/colors';
import { BoardState, BoardResult, Moves } from '@/utils/types';
import * as Haptics from 'expo-haptics';
import BoardLine from './BoardLine';
type BoardProps = {
  state: BoardState;
  size?: number;
  disabled?: boolean;
  gameResult?: BoardResult | false;
  onCellPressed?: (index: number) => void;
  loading?: Moves[] | false;
};

export default function Board({
  state = Array(9).fill(null) as BoardState,
  onCellPressed,
  size = 300,
  disabled = false,
  gameResult = false,
}: BoardProps) {
  const gridSize = Math.sqrt(state.length); // Calculate grid dimensions (3 for 3x3, 4 for 4x4, etc.)
  const cellPercentage = (100 / gridSize).toFixed(5) + '%';

  const animatedValues = React.useRef(state.map(() => new Animated.Value(0))).current;

  React.useEffect(() => {
    state.forEach((cell, index) => {
      if (cell !== null) {
        Animated.spring(animatedValues[index], {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 40,
        }).start();
      } else {
        animatedValues[index].setValue(0);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Grid Lines */}
      {[...Array(gridSize - 1)].map((_, index) => (
        <React.Fragment key={`grid-lines-${index}`}>
          <View style={[styles.verticalLine, { left: `${((index + 1) * 100) / gridSize}%` }]} />
          <View style={[styles.horizontalLine, { top: `${((index + 1) * 100) / gridSize}%` }]} />
        </React.Fragment>
      ))}

      <View style={styles.board}>
        {state.map((cell, index) => (
          <TouchableOpacity
            key={index}
            disabled={cell !== null || disabled}
            onPress={() => {
              if (process.env.EXPO_OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }

              onCellPressed?.(index);
            }}
            activeOpacity={0.7}
            style={[
              styles.cell,
              { width: cellPercentage as `${number}%`, height: cellPercentage as `${number}%` },
            ]}>
            <Animated.Text
              style={[
                styles.cellText,
                {
                  fontSize: size / (gridSize * 2.5),
                  opacity: animatedValues[index],
                  transform: [{ scale: animatedValues[index] }],
                },
              ]}>
              {cell}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>
      {gameResult && <BoardLine size={size} gameResult={gameResult} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  board: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cellText: {
    color: colors.lightGreen,
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: colors.lightGreen,
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: colors.lightGreen,
  },
});
