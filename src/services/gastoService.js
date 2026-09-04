import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@fintrack_gastos';

export const gastoService = {
    async listar() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Erro ao carregar gastos', e);
            return [];
        }
    },

    async salvar(gasto) {
        try {
            const atuais = await this.listar();
            let novos;
            if (gasto.id) {
                novos = atuais.map((item) => (item.id === gasto.id ? gasto : item));
            } else {
                gasto.id = Date.now().toString();
                novos = [gasto, ...atuais];
            }
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
            return novos;
        } catch (e) {
            console.error('Erro ao salvar gasto', e);
        }
    },

    async remover(id) {
        try {
            const atuais = await this.listar();
            const novos = atuais.filter((item) => item.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
            return novos;
        } catch (e) {
            console.error('Erro ao deletar gasto', e);
        }
    },
};
