import React, { ReactElement } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Text from './Text';

type ButtonProps = {
  title: string;
  loading?: boolean;
} & TouchableOpacityProps;

export default function Button({ title, style, loading, ...props }: ButtonProps): ReactElement {
  return (
    <TouchableOpacity disabled={loading} {...props} style={[styles.button, style]}>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dafaf7',
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#221a36',
    textAlign: 'center',
  },
});
