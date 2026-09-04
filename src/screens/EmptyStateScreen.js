import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyStateScreen({ onAddPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
                <Text style={styles.headerTitle}>FinTrack</Text>
                <Ionicons name="notifications-outline" size={24} color="#000" />
            </View>

            <View style={styles.content}>
                <View style={styles.imagePlaceholder}>
                    <Ionicons name="wallet-outline" size={80} color="#006C3B" />
                </View>

                <Text style={styles.title}>Nenhum gasto registrado ainda.</Text>
                <Text style={styles.subtitle}>
                    Toque no botão + para adicionar sua primeira transação e começar seu controle.
                </Text>

                <TouchableOpacity style={styles.btnAction} onPress={onAddPress}>
                    <Ionicons name="add" size={20} color="#FFF" />
                    <Text style={styles.btnText}>Adicionar Gasto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    avatar: { width: 36, height: 36, borderRadius: 18 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
    imagePlaceholder: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    btnAction: {
        flexDirection: 'row',
        backgroundColor: '#006C3B',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
    },
});
