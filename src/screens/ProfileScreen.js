import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Modal, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@fintrack_perfil';
const defaultProfile = { name: 'João Silva', email: 'joao.silva@email.com' };

export default function ProfileScreen() {
    const [profile, setProfile] = useState(defaultProfile);
    const [draft, setDraft] = useState(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem(PROFILE_KEY).then((savedProfile) => {
            if (!savedProfile) return;
            const parsedProfile = JSON.parse(savedProfile);
            setProfile({ ...defaultProfile, ...parsedProfile });
        });
    }, []);

    const abrirEdicao = () => {
        setDraft(profile);
        setEditing(true);
    };

    const salvarPerfil = async () => {
        const name = draft.name.trim();
        const email = draft.email.trim();
        if (!name || !email || !email.includes('@')) return;

        const updatedProfile = { name, email };
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
        setEditing(false);
    };

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.eyebrow}>SUA CONTA</Text>
                <Text style={styles.title}>Perfil</Text>

                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.email}>{profile.email}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={abrirEdicao}>
                        <Ionicons name="create-outline" size={17} color="#006C3B" />
                        <Text style={styles.editText}>Editar perfil</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Configurações</Text>
                <View style={styles.optionsCard}>
                    <TouchableOpacity style={styles.option} onPress={abrirEdicao}>
                        <View style={styles.optionIcon}>
                            <Ionicons name="person-outline" size={20} color="#006C3B" />
                        </View>
                        <Text style={styles.optionLabel}>Dados pessoais</Text>
                        <Ionicons name="chevron-forward" size={18} color="#AAA" />
                    </TouchableOpacity>
                    <View style={[styles.option, styles.optionBorder]}>
                        <View style={styles.optionIcon}>
                            <Ionicons name="notifications-outline" size={20} color="#006C3B" />
                        </View>
                        <Text style={styles.optionLabel}>Notificações</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#D8DDDA', true: '#A8D6B5' }}
                            thumbColor={notificationsEnabled ? '#006C3B' : '#FFF'}
                        />
                    </View>
                    <TouchableOpacity style={[styles.option, styles.optionBorder]}>
                        <View style={styles.optionIcon}>
                            <Ionicons name="lock-closed-outline" size={20} color="#006C3B" />
                        </View>
                        <Text style={styles.optionLabel}>Privacidade e segurança</Text>
                        <Ionicons name="chevron-forward" size={18} color="#AAA" />
                    </TouchableOpacity>
                </View>

                <View style={styles.aboutRow}>
                    <Text style={styles.aboutText}>FinTrack</Text>
                    <Text style={styles.version}>Versão 1.0.0</Text>
                </View>
            </ScrollView>

            <Modal visible={editing} transparent animationType="slide" onRequestClose={() => setEditing(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.editModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Editar perfil</Text>
                            <TouchableOpacity onPress={() => setEditing(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.inputLabel}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            value={draft.name}
                            onChangeText={(name) => setDraft({ ...draft, name })}
                            placeholder="Seu nome"
                        />
                        <Text style={styles.inputLabel}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={draft.email}
                            onChangeText={(email) => setDraft({ ...draft, email })}
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={salvarPerfil}>
                            <Ionicons name="checkmark" size={18} color="#FFF" />
                            <Text style={styles.saveText}>Salvar alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    content: { padding: 22, paddingTop: 48, paddingBottom: 110 },
    eyebrow: { color: '#006C3B', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
    title: { color: '#111', fontSize: 30, fontWeight: 'bold', marginTop: 5, marginBottom: 24 },
    profileCard: { backgroundColor: '#FFF', borderRadius: 20, alignItems: 'center', padding: 24, borderWidth: 1, borderColor: '#E8ECE9' },
    avatar: { width: 78, height: 78, borderRadius: 39, marginBottom: 13 },
    name: { color: '#111', fontSize: 20, fontWeight: 'bold' },
    email: { color: '#888', fontSize: 13, marginTop: 5 },
    editButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#B9D9C2', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 9, marginTop: 18 },
    editText: { color: '#006C3B', fontSize: 13, fontWeight: 'bold', marginLeft: 6 },
    sectionTitle: { color: '#333', fontSize: 16, fontWeight: 'bold', marginTop: 28, marginBottom: 10 },
    optionsCard: { backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E8ECE9' },
    option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
    optionBorder: { borderTopWidth: 1, borderTopColor: '#EFF1F0' },
    optionIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: '#EAF7EE', justifyContent: 'center', alignItems: 'center' },
    optionLabel: { flex: 1, color: '#333', fontSize: 14, marginLeft: 12 },
    aboutRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, paddingHorizontal: 3 },
    aboutText: { color: '#777', fontSize: 13, fontWeight: 'bold' },
    version: { color: '#AAA', fontSize: 12 },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
    editModal: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22, paddingBottom: 30 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
    modalTitle: { color: '#111', fontSize: 20, fontWeight: 'bold' },
    inputLabel: { color: '#555', fontSize: 12, fontWeight: 'bold', marginBottom: 7, marginTop: 10 },
    input: { backgroundColor: '#F3F5F4', borderRadius: 11, paddingHorizontal: 14, paddingVertical: 13, color: '#111', fontSize: 15 },
    saveButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#006C3B', borderRadius: 11, paddingVertical: 14, marginTop: 24 },
    saveText: { color: '#FFF', fontWeight: 'bold', marginLeft: 7 },
});
