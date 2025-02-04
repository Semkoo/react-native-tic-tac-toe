import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Text from '@/components/ui/Text';
import GradientBackground from '@/components/GradientBackground';
import colors from '@/utils/colors';

export default function NotFoundScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Click here to go back!</Text>
        </Link>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  text: {
    color: colors.lightGreen,
    fontSize: 28,
    marginBottom: 30,
  },
  linkText: {
    color: colors.lightGreen,
    fontSize: 28,
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
});
