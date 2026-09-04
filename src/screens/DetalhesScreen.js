import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { gastoService } from '../services/gastoService';

export default function DetalhesScreen({ visible, gasto, onClose, onEdit, onDeleteSuccess }) {
    const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);

    if (!gasto) return null;

    const handleExcluir = () => {
        setConfirmandoExclusao(true);
    };

    const confirmarExclusao = async () => {
        await gastoService.remover(gasto.id);
        setConfirmandoExclusao(false);
        onDeleteSuccess();
        onClose();
    };

    return (
        <>
            <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                {/* Header Navegação */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Detalhes do Gasto</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Card de Valor */}
                    <View style={styles.valueCard}>
                        <Text style={styles.labelValor}>Valor</Text>
                        <Text
                            style={[
                                styles.valor,
                                { color: gasto.tipo === 'Despesa' ? '#D32F2F' : '#006C3B' },
                            ]}>
                            {gasto.tipo === 'Despesa' ? '-' : '+'} R${' '}
                            {Number(gasto.valor).toFixed(2).replace('.', ',')}
                        </Text>
                    </View>

                    {/* Card de Nome e Categoria */}
                    <View style={styles.infoCard}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="restaurant-outline" size={24} color="#333" />
                        </View>
                        <View>
                            <Text style={styles.itemTitle}>{gasto.nome}</Text>
                            <Text style={styles.itemSub}>{gasto.categoria}</Text>
                        </View>
                    </View>

                    {/* Detalhes Adicionais */}
                    <View style={styles.detailsGroup}>
                        <View style={styles.detailRow}>
                            <Ionicons name="calendar-outline" size={20} color="#666" />
                            <Text style={styles.detailText}>{gasto.data}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Ionicons name="card-outline" size={20} color="#666" />
                            <Text style={styles.detailText}>
                                {gasto.pagamento || 'Cartão de Crédito final 4321'}
                            </Text>
                        </View>
                    </View>

                    {/* Observações */}
                    <View style={styles.obsCard}>
                        <Text style={styles.obsTitle}>OBSERVAÇÕES</Text>
                        <Text style={styles.obsContent}>
                            {gasto.observacoes || 'Sem observações cadastradas para este item.'}
                        </Text>
                    </View>

                    {/* Ações */}
                    <TouchableOpacity
                        style={styles.btnEdit}
                        onPress={() => {
                            onClose();
                            onEdit(gasto);
                        }}>
                        <Ionicons name="pencil" size={18} color="#333" />
                        <Text style={styles.btnEditText}>Editar Transação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDelete} onPress={handleExcluir}>
                        <Ionicons name="trash-outline" size={18} color="#D32F2F" />
                        <Text style={styles.btnDeleteText}>Excluir Transação</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </Modal>
            <Modal
                visible={confirmandoExclusao}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmandoExclusao(false)}>
                <View style={styles.confirmOverlay}>
                    <View style={styles.confirmCard}>
                        <Text style={styles.confirmTitle}>Excluir transação?</Text>
                        <Text style={styles.confirmText}>Esse registro será removido permanentemente.</Text>
                        <View style={styles.confirmButtons}>
                            <TouchableOpacity
                                style={styles.confirmCancel}
                                onPress={() => setConfirmandoExclusao(false)}>
                                <Text style={styles.confirmCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmDelete} onPress={confirmarExclusao}>
                                <Text style={styles.confirmDeleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    valueCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
    },
    labelValor: { fontSize: 12, color: '#888', marginBottom: 4 },
    valor: { fontSize: 28, fontWeight: 'bold' },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemTitle: { fontSize: 16, fontWeight: 'bold' },
    itemSub: { fontSize: 12, color: '#888' },
    detailsGroup: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 16 },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
    detailText: { fontSize: 14, color: '#444' },
    obsCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 24 },
    obsTitle: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 8 },
    obsContent: { fontSize: 13, color: '#555', lineHeight: 18 },
    btnEdit: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    btnEditText: { fontWeight: 'bold', color: '#333' },
    btnDelete: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        padding: 14,
    },
    btnDeleteText: { fontWeight: 'bold', color: '#D32F2F' },
    confirmOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    confirmCard: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 22,
    },
    confirmTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    confirmText: { fontSize: 14, color: '#666', marginTop: 8, marginBottom: 20 },
    confirmButtons: { flexDirection: 'row', gap: 10 },
    confirmCancel: {
        flex: 1,
        padding: 13,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
    },
    confirmCancelText: { color: '#333', fontWeight: 'bold' },
    confirmDelete: {
        flex: 1,
        padding: 13,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#D32F2F',
    },
    confirmDeleteText: { color: '#FFF', fontWeight: 'bold' },
});
