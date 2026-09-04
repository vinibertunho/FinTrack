import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { gastoService } from '../services/gastoService';

const CHART_SIZE = 190;
const CENTER = CHART_SIZE / 2;
const RADIUS = 78;

const polarToCartesian = (angle) => ({
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
});

const slicePath = (startAngle, endAngle) => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
        `M ${CENTER} ${CENTER}`,
        `L ${start.x} ${start.y}`,
        `A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
        'Z',
    ].join(' ');
};

const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

export default function StatsScreen({ refreshKey }) {
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        let ativo = true;

        gastoService.listar().then((data) => {
            if (ativo) setGastos(data);
        });

        return () => {
            ativo = false;
        };
    }, [refreshKey]);

    const entradas = gastos
        .filter((gasto) => String(gasto.tipo).toLowerCase() === 'receita')
        .reduce((total, gasto) => total + Number(gasto.valor), 0);
    const saidas = gastos
        .filter((gasto) => String(gasto.tipo).toLowerCase() === 'despesa')
        .reduce((total, gasto) => total + Number(gasto.valor), 0);
    const total = entradas + saidas;
    const entradaAngle = total ? (entradas / total) * Math.PI * 2 : 0;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.eyebrow}>ANÁLISE FINANCEIRA</Text>
                    <Text style={styles.title}>Estatísticas</Text>
                </View>
                <View style={styles.headerIcon}>
                    <Ionicons name="stats-chart" size={21} color="#006C3B" />
                </View>
            </View>

            <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                    <View style={[styles.dot, { backgroundColor: '#006C3B' }]} />
                    <Text style={styles.summaryLabel}>Ganhos</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(entradas)}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <View style={[styles.dot, { backgroundColor: '#D32F2F' }]} />
                    <Text style={styles.summaryLabel}>Gastos</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(saidas)}</Text>
                </View>
            </View>

            <View style={styles.chartCard}>
                <Text style={styles.cardTitle}>Gastos x ganhos</Text>
                <Text style={styles.cardSubtitle}>Visão geral de todas as transações</Text>
                <View style={styles.chartWrap}>
                    <Svg width={CHART_SIZE} height={CHART_SIZE} viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}>
                        <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#EEF5F0" />
                        {total > 0 && entradas > 0 && (
                            <Path d={slicePath(-Math.PI / 2, -Math.PI / 2 + entradaAngle)} fill="#006C3B" />
                        )}
                        {total > 0 && saidas > 0 && (
                            <Path
                                d={slicePath(-Math.PI / 2 + entradaAngle, -Math.PI / 2 + Math.PI * 2)}
                                fill="#D32F2F"
                            />
                        )}
                        <Circle cx={CENTER} cy={CENTER} r={48} fill="#FFF" />
                    </Svg>
                    <View style={styles.chartCenter}>
                        <Text style={styles.chartTotal}>{formatCurrency(total)}</Text>
                        <Text style={styles.chartCaption}>total movimentado</Text>
                    </View>
                </View>
                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#006C3B' }]} />
                        <Text style={styles.legendText}>Ganhos {formatCurrency(entradas)}</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#D32F2F' }]} />
                        <Text style={styles.legendText}>Gastos {formatCurrency(saidas)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.insightCard}>
                <View style={styles.insightIcon}>
                    <Ionicons name="trending-up-outline" size={20} color="#006C3B" />
                </View>
                <View style={styles.insightCopy}>
                    <Text style={styles.insightTitle}>Saldo atual</Text>
                    <Text style={styles.insightValue}>{formatCurrency(entradas - saidas)}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    content: { padding: 22, paddingTop: 48, paddingBottom: 110 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    eyebrow: { color: '#006C3B', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
    title: { color: '#111', fontSize: 30, fontWeight: 'bold', marginTop: 5 },
    headerIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#E7F5EA', justifyContent: 'center', alignItems: 'center' },
    summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    summaryCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E8ECE9' },
    dot: { width: 9, height: 9, borderRadius: 5, marginBottom: 10 },
    summaryLabel: { color: '#777', fontSize: 13 },
    summaryValue: { color: '#111', fontSize: 17, fontWeight: 'bold', marginTop: 5 },
    chartCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E8ECE9' },
    cardTitle: { color: '#111', fontSize: 18, fontWeight: 'bold' },
    cardSubtitle: { color: '#888', fontSize: 13, marginTop: 5 },
    chartWrap: { alignItems: 'center', justifyContent: 'center', marginTop: 18 },
    chartCenter: { position: 'absolute', alignItems: 'center' },
    chartTotal: { color: '#111', fontSize: 17, fontWeight: 'bold' },
    chartCaption: { color: '#888', fontSize: 10, marginTop: 3 },
    legend: { gap: 12, marginTop: 12 },
    legendItem: { flexDirection: 'row', alignItems: 'center' },
    legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    legendText: { color: '#555', fontSize: 13 },
    insightCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAF7EE', borderRadius: 16, padding: 16, marginTop: 16 },
    insightIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
    insightCopy: { marginLeft: 12 },
    insightTitle: { color: '#47705A', fontSize: 12 },
    insightValue: { color: '#006C3B', fontSize: 18, fontWeight: 'bold', marginTop: 2 },
});
