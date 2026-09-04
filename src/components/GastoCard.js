import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GastoCard({ item, onPress }) {
  const isDespesa = item.tipo === 'despesa';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={isDespesa ? "cart-outline" : "wallet-outline"} size={22} color="#007AFF" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.descricao}</Text>
        <Text style={styles.sub}>{item.data} • {item.categoria}</Text>
      </View>
      <Text style={[styles.valor, { color: isDespesa ? '#FF3B30' : '#34C759' }]}>
        {isDespesa ? '-' : '+'} R$ {Number(item.valor).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121721',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E2638'
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    justify: 'center',
    alignItems: 'center'
  },
  info: { flex: 1, marginLeft: 12 },
  title: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  sub: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
  valor: { fontSize: 15, fontWeight: 'bold' }
});