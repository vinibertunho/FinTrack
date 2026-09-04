import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@fintrack_gastos_v1';

export const gastoService = {
    async getAll() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Erro ao buscar gastos:", error);
            return [];
        }
    },

    async create(gasto) {
        try {
            const list = await this.getAll();
            const newGasto = { ...gasto, id: String(Date.now()) };
            const updatedList = [newGasto, ...list];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            return updatedList;
        } catch (error) {
            console.error("Erro ao salvar gasto:", error);
        }
    },

    async update(id, updatedGasto) {
        try {
            const list = await this.getAll();
            const updatedList = list.map(item => item.id === id ? { ...updatedGasto, id } : item);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            return updatedList;
        } catch (error) {
            console.error("Erro ao atualizar gasto:", error);
        }
    },

    async delete(id) {
        try {
            const list = await this.getAll();
            const updatedList = list.filter(item => item.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            return updatedList;
        } catch (error) {
            console.error("Erro ao deletar gasto:", error);
        }
    }
};