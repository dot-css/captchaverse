import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native';

const Leaderboard = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const users = Array.from({ length: 100 }, (_, i) => ({
    id: `${i + 1}`,
    name: `User ${i + 1}`,
    uc: Math.floor(Math.random() * 5000) + 500,
  })).sort((a, b) => b.uc - a.uc);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const renderUser = ({ item, index }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={[styles.rank, index === 0 ? styles.topRank : null]}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.uc}>{item.uc} UC</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={users.slice(0, 100)}
        renderItem={renderUser}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 20 },
  title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 5 },
  rank: { color: '#7A1CAC', fontSize: 20, fontWeight: 'bold' },
  topRank: { color: '#E4E4E4', fontSize: 22 },
  name: { color: '#FFF', fontSize: 18 },
  uc: { color: '#CCCCCC', fontSize: 16 },
});

export default Leaderboard;
