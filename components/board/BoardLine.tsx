import React, { ReactElement, useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { BoardResult } from '@/utils/types';
import colors from '@/utils/colors';

type BoardLineProps = {
  size: number;
  gameResult?: BoardResult | false;
};

export default function BoardLine({ size, gameResult }: BoardLineProps): ReactElement {
  const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));
  const animationRef = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === 'VERTICAL' && (
        <Animated.View
          style={[
            style.line,
            style.vLine,
            {
              left: `${33.3333 * gameResult.column - 16.6666}%`,
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      )}
      {gameResult && gameResult.row && gameResult.direction === 'HORIZONTAL' && (
        <Animated.View
          style={[
            style.line,
            style.hLine,
            {
              top: `${33.3333 * gameResult.row - 16.6666}%`,
              width: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      )}
      {gameResult && gameResult.diagonal && gameResult.direction === 'DIAGONAL' && (
        <Animated.View
          style={[
            style.line,
            style.dLine,
            {
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, diagonalHeight],
              }),
              transform: [
                {
                  translateY: animationRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [size / 2, -(diagonalHeight - size) / 2],
                  }),
                },
                {
                  rotateZ: gameResult.diagonal === 'MAIN' ? '-45deg' : '45deg',
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
}

const style = StyleSheet.create({
  line: {
    position: 'absolute',
    backgroundColor: colors.lightGreen,
  },
  vLine: {
    width: 4,
  },
  hLine: {
    height: 4,
  },
  dLine: {
    width: 4,
    top: 0,
    left: '50%',
  },
});
