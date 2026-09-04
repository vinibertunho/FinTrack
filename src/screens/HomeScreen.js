import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { gastoService } from '../services/gastoService';
import GastoCard from '../components/GastoCard';

export default function HomeScreen({ navigation }) {
    const [gastos, setGastos] = useState([]);

    useFocusEffect(
        useCallback(() => {
            carregarGastos();
        }, [])
    );

    const carregarGastos = async () => {
        const data = await gastoService.getAll();
        setGastos(data);
    };

    const entradas = gastos.filter(g => g.tipo === 'receita').reduce((acc, c) => acc + Number(c.valor), 0);
    const saidas = gastos.filter(g => g.tipo === 'despesa').reduce((acc, c) => acc + Number(c.valor), 0);
    const saldoTotal = entradas - saidas;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userRow}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }}
                        style={styles.avatar}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.greeting}>Olá,</Text>
                        <Text style={styles.userName}>João!</Text>
                    </View>
                </View>
                <Ionicons name="notifications-outline" size={24} color="#333" />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Card de Saldo */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceTitle}>Saldo Total</Text>
                    <Text style={styles.balanceValue}>R$ {saldoTotal.toFixed(2)}</Text>

                    <View style={styles.balanceRow}>
                        <View>
                            <Text style={{ color: '#00875A', fontSize: 11, fontWeight: 'bold' }}>↓ ENTRADAS</Text>
                            <Text style={{ color: '#00875A', fontWeight: 'bold', fontSize: 16 }}>R$ {entradas.toFixed(2)}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#D32F2F', fontSize: 11, fontWeight: 'bold' }}>↑ SAÍDAS</Text>
                            <Text style={{ color: '#D32F2F', fontWeight: 'bold', fontSize: 16 }}>R$ {saidas.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Últimas Transações</Text>
                    {gastos.length > 0 && <Text style={styles.seeAll}>Ver todas</Text>}
                </View>

                {/* Estado Vazio (Sem Transações) */}
                {gastos.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIllustration}>
                            <Ionicons name="book-outline" size={60} color="#00875A" />
                        </View>
                        <Text style={styles.emptyTitle}>Nenhum gasto registrado ainda.</Text>
                        <Text style={styles.emptySub}>Toque no botão + para adicionar sua primeira transação e começar seu controle.</Text>
                        <TouchableOpacity
                            style={styles.emptyBtn}
                            onPress={() => navigation.navigate('Form', { gasto: null })}
                        >
                            <Ionicons name="add" size={20} color="#FFF" />
                            <Text style={styles.emptyBtnText}>Adicionar Gasto</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    gastos.map((item) => (
                        <GastoCard
                            key={item.id}
                            item={item}
                            onPress={() => navigation.navigate('Details', { gasto: item })}
                        />
                    ))
                )}
            </ScrollView>

            {/* FAB Botão Flutuante */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Form', { gasto: null })}
            >
                <Ionicons name="add" size={32} color="#FFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 20, paddingTop: 40 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    userRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    greeting: { color: '#777', fontSize: 12 },
    userName: { color: '#111', fontSize: 18, fontWeight: 'bold' },
    balanceCard: {
        backgroundColor: '#F0FDF4',
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#DCFCE7'
    },
    balanceTitle: { color: '#555', fontSize: 13 },
    balanceValue: { color: '#111', fontSize: 30, fontWeight: 'bold', marginVertical: 8 },
    balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { color: '#111', fontSize: 18, fontWeight: 'bold' },
    seeAll: { color: '#777', fontSize: 13 },
    emptyContainer: { alignItems: 'center', marginTop: 30, paddingHorizontal: 20 },
    emptyIllustration: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    emptyTitle: { color: '#111', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    emptySub: { color: '#666', fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 20 },
    emptyBtn: { flexDirection: 'row', backgroundColor: '#00875A', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginTop: 20 },
    emptyBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 6 },
    fab: { position: 'absolute', right: 20, bottom: 25, backgroundColor: '#005236', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 }
});