import { View, StyleSheet, ScrollView, Image } from 'react-native';
import colors from '@/utils/colors';
import Text from '@/components/ui/Text';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import Button from '@/components/ui/Button';

export default function Index() {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.heading}>Tic Tac Toe</Text>
        <Text style={styles.subHeading}>THE UNBEATABLE AI</Text>

        <View style={styles.buttons}>
          <Button title="New Game" onPress={() => router.push('/game')} />
          <Button title="Game History" onPress={() => router.push('/game-history')} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 120,
  },
  logo: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'contain',
  },
  buttons: {
    marginTop: 80,
    gap: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
  },
  heading: {
    color: colors.lightGreen,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },

  subHeading: {
    color: colors.lightGreen,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
});
