import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GastoCard({ item, onPress }) {
    const isDespesa = item.tipo === 'despesa';

    const getIconName = (categoria) => {
        switch (categoria) {
            case 'Alimentação': return 'restaurant-outline';
            case 'Transporte': return 'car-outline';
            case 'Moradia': return 'home-outline';
            case 'Lazer': return 'game-controller-outline';
            default: return 'cart-outline';
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={getIconName(item.categoria)} size={20} color="#333" />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{item.descricao}</Text>
                <Text style={styles.sub}>{item.data} • {item.categoria}</Text>
            </View>
            <Text style={[styles.valor, { color: isDespesa ? '#D32F2F' : '#00875A' }]}>
                {isDespesa ? '-' : '+'}R$ {Number(item.valor).toFixed(2)}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: { flex: 1, marginLeft: 12 },
    title: { color: '#111', fontSize: 15, fontWeight: 'bold' },
    sub: { color: '#777', fontSize: 12, marginTop: 2 },
    valor: { fontSize: 15, fontWeight: 'bold' }
});