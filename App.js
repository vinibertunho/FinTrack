import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';
import StatsScreen from './src/screens/StatsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
	const [modal, setModal] = useState(null);
	const [gastoSelecionado, setGastoSelecionado] = useState(null);
	const [refreshKey, setRefreshKey] = useState(0);
	const [abaAtiva, setAbaAtiva] = useState('Home');

	const navigation = {
		navigate: (screen, params = {}) => {
			setGastoSelecionado(params.gasto || null);
			setModal(screen);
		},
	};

	const atualizarHome = () => {
		setRefreshKey((value) => value + 1);
	};

	return (
		<NavigationContainer>
			<View style={styles.app}>
				{abaAtiva === 'Home' && <HomeScreen key={refreshKey} navigation={navigation} />}
				{abaAtiva === 'Stats' && <StatsScreen key={`stats-${refreshKey}`} refreshKey={refreshKey} />}
				{abaAtiva === 'Profile' && <ProfileScreen />}

				<View style={styles.tabBar}>
					{[
						{ name: 'Home', icon: 'home-outline', label: 'Home' },
						{ name: 'Stats', icon: 'stats-chart-outline', label: 'Stats' },
						{ name: 'Profile', icon: 'person-outline', label: 'Perfil' },
					].map((tab) => {
						const active = abaAtiva === tab.name;
						return (
							<TouchableOpacity
								key={tab.name}
								style={styles.tab}
								onPress={() => setAbaAtiva(tab.name)}>
								<Ionicons name={active ? tab.icon.replace('-outline', '') : tab.icon} size={21} color={active ? '#006C3B' : '#777'} />
								<Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>

			<CadastroScreen
				visible={modal === 'Form'}
				onClose={() => setModal(null)}
				onSaveSuccess={() => {
					atualizarHome();
					setModal(null);
				}}
				itemParaEditar={gastoSelecionado}
			/>
			<DetalhesScreen
				visible={modal === 'Details'}
				gasto={gastoSelecionado}
				onClose={() => setModal(null)}
				onEdit={(gasto) => {
					setGastoSelecionado(gasto);
					setModal('Form');
				}}
				onDeleteSuccess={() => {
					atualizarHome();
					setModal(null);
				}}
			/>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	app: { flex: 1 },
	tabBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 76,
		backgroundColor: '#FFF',
		borderTopWidth: 1,
		borderTopColor: '#E7ECE8',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingBottom: 8,
	},
	tab: { alignItems: 'center', justifyContent: 'center', minWidth: 80, paddingVertical: 8 },
	tabLabel: { color: '#777', fontSize: 11, marginTop: 4 },
	tabLabelActive: { color: '#006C3B', fontWeight: 'bold' },
});
