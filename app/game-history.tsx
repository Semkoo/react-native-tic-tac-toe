import { View, StyleSheet, FlatList } from 'react-native';
import React, { useMemo } from 'react';
import Text from '@/components/ui/Text';
import GradientBackground from '@/components/GradientBackground';
import { useGameHistory, type GameHistory } from '@/contexts/game-history-context';
import colors from '@/utils/colors';

function GameHistoryItem({ item }: { item: GameHistory }) {
  return (
    <View style={styles.item}>
      <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.result}>{item.result}</Text>
    </View>
  );
}

export default function GameHistoryScreen() {
  const { state } = useGameHistory();

  const sortedState = useMemo(
    () => state.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [state]
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Game History</Text>
        <FlatList
          data={sortedState}
          renderItem={({ item }) => <GameHistoryItem item={item} />}
          keyExtractor={item => item.id}
          style={{ width: '100%' }}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.lightGreen,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreen,
  },
  date: {
    fontSize: 16,
    color: colors.lightGreen,
  },
  result: {
    fontSize: 16,
    color: colors.lightGreen,
  },
});
