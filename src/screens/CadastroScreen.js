import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { gastoService } from '../services/gastoService';

export default function CadastroScreen({ visible, onClose, onSaveSuccess, itemParaEditar }) {
    const [tipo, setTipo] = useState(itemParaEditar?.tipo || 'Despesa');
    const [valor, setValor] = useState(itemParaEditar?.valor ? String(itemParaEditar.valor) : '');
    const [nome, setNome] = useState(itemParaEditar?.nome || '');
    const [data, setData] = useState(
        itemParaEditar?.data || new Date().toLocaleDateString('pt-BR'),
    );
    const [categoria, setCategoria] = useState(itemParaEditar?.categoria || 'Alimentação');

    const categorias = [
        { id: 'Alimentação', icon: 'fast-food-outline' },
        { id: 'Transporte', icon: 'car-outline' },
        { id: 'Moradia', icon: 'home-outline' },
        { id: 'Lazer', icon: 'game-controller-outline' },
    ];

    const handleSalvar = async () => {
        if (!valor || !nome) return;

        const novoGasto = {
            id: itemParaEditar?.id || null,
            nome,
            valor: parseFloat(valor.replace(',', '.')),
            tipo,
            data,
            categoria,
            pagamento: 'Cartão de Crédito final 4321',
            observacoes: 'Registro manual via aplicativo.',
        };

        await gastoService.salvar(novoGasto);
        onSaveSuccess();
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {itemParaEditar ? 'Editar Transação' : 'Nova Transação'}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Toggle Despesa/Receita */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleBtn,
                                    tipo === 'Despesa' && styles.toggleActive,
                                ]}
                                onPress={() => setTipo('Despesa')}>
                                <Text
                                    style={[
                                        styles.toggleText,
                                        tipo === 'Despesa' && styles.toggleTextActive,
                                    ]}>
                                    Despesa
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleBtn,
                                    tipo === 'Receita' && styles.toggleActive,
                                ]}
                                onPress={() => setTipo('Receita')}>
                                <Text
                                    style={[
                                        styles.toggleText,
                                        tipo === 'Receita' && styles.toggleTextActive,
                                    ]}>
                                    Receita
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Valor Input */}
                        <View style={styles.valorContainer}>
                            <Text style={styles.currencyPrefix}>R$</Text>
                            <TextInput
                                style={[
                                    styles.valorInput,
                                    { color: tipo === 'Despesa' ? '#D32F2F' : '#006C3B' },
                                ]}
                                placeholder="0,00"
                                keyboardType="numeric"
                                value={valor}
                                onChangeText={setValor}
                            />
                        </View>

                        {/* Inputs de Nome e Data */}
                        <View style={styles.inputBox}>
                            <Ionicons name="pencil-outline" size={20} color="#666" />
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do gasto"
                                value={nome}
                                onChangeText={setNome}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <Ionicons name="calendar-outline" size={20} color="#666" />
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/AAAA"
                                value={data}
                                onChangeText={setData}
                            />
                        </View>

                        {/* Seleção de Categoria */}
                        <Text style={styles.sectionTitle}>Categoria</Text>
                        <View style={styles.categoriaContainer}>
                            {categorias.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={styles.catItem}
                                    onPress={() => setCategoria(cat.id)}>
                                    <View
                                        style={[
                                            styles.iconCircle,
                                            categoria === cat.id && styles.iconActive,
                                        ]}>
                                        <Ionicons
                                            name={cat.icon}
                                            size={22}
                                            color={categoria === cat.id ? '#FFF' : '#333'}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.catLabel,
                                            categoria === cat.id && styles.catLabelActive,
                                        ]}>
                                        {cat.id}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Botões */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
                                <Text style={styles.btnCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSave} onPress={handleSalvar}>
                                <Text style={styles.btnSaveText}>Salvar Transação</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 4,
        marginBottom: 20,
    },
    toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 16 },
    toggleActive: { backgroundColor: '#FFF' },
    toggleText: { color: '#666', fontWeight: '500' },
    toggleTextActive: { color: '#D32F2F', fontWeight: 'bold' },
    valorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    currencyPrefix: { fontSize: 24, fontWeight: 'bold', color: '#666', marginRight: 5 },
    valorInput: { fontSize: 32, fontWeight: 'bold', minWidth: 100, textAlign: 'center' },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },
    input: { flex: 1, marginLeft: 10, fontSize: 16 },
    sectionTitle: { fontSize: 12, color: '#666', marginTop: 10, marginBottom: 10 },
    categoriaContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    catItem: { alignItems: 'center' },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    iconActive: { backgroundColor: '#1C274C' },
    catLabel: { fontSize: 12, color: '#666' },
    catLabelActive: { fontWeight: 'bold', color: '#000' },
    buttonRow: { flexDirection: 'row', gap: 12 },
    btnCancel: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnCancelText: { color: '#333', fontWeight: 'bold' },
    btnSave: {
        flex: 2,
        backgroundColor: '#006C3B',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnSaveText: { color: '#FFF', fontWeight: 'bold' },
});
