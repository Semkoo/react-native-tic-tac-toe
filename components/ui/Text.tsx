import { Text as RNText, StyleSheet } from 'react-native';
import React from 'react';

export default function Text({ children, style, ...props }: React.ComponentProps<typeof RNText>) {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SpaceMono',
  },
});
