# FinTrack

Aplicativo mobile de controle financeiro criado com Expo e React Native. Permite registrar receitas e despesas, acompanhar o saldo e visualizar um resumo gráfico das movimentações.

## Funcionalidades

- Cadastro de receitas e despesas.
- Edição e exclusão de transações.
- Cálculo automático de ganhos, gastos e saldo.
- Lista das transações recentes.
- Gráfico de pizza na aba `Stats`.
- Perfil com edição persistente de nome e e-mail.
- Toggle de notificações no perfil.
- Interface compatível com Android, iOS e Web.

## Requisitos

- Node.js 20.19 ou superior.
- npm.
- Expo SDK 54.
- Expo Go para testar em um dispositivo físico, ou um emulador Android/iOS.

## Instalação

```bash
npm install
```

## Executar

Inicie o servidor do Expo:

```bash
npm start
```

Atalhos disponíveis:

```bash
npm run android
npm run ios
npm run web
```

Para limpar o cache do Metro:

```bash
npx expo start -c
```

## Uso

1. Abra a aba `Home`.
2. Toque em `+` ou em `Adicionar Gasto`.
3. Escolha entre `Despesa` e `Receita`.
4. Informe o valor, nome, data e categoria.
5. Toque em `Salvar Transação`.
6. Toque em uma transação para abrir detalhes, editar ou excluir.
7. Consulte `Stats` para ver o gráfico de ganhos e gastos.
8. Acesse `Perfil` para editar seus dados pessoais.

## Armazenamento

Os dados são armazenados localmente no dispositivo usando `@react-native-async-storage/async-storage`.

- Transações: `@fintrack_gastos`
- Perfil: `@fintrack_perfil`

O app não possui backend ou autenticação. Limpar os dados do aplicativo remove os registros locais.

## Estrutura principal

```text
FinTrack/
├── App.js
├── index.js
├── app.json
├── package.json
├── src/
│   ├── components/
│   │   └── GastoCard.js
│   ├── screens/
│   │   ├── CadastroScreen.js
│   │   ├── DetalhesScreen.js
│   │   ├── EmptyStateScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ProfileScreen.js
│   │   └── StatsScreen.js
│   └── services/
│       └── gastoService.js
└── assets/
```

## Dependências importantes

- `expo`: plataforma de desenvolvimento e execução.
- `@react-native-async-storage/async-storage`: persistência local.
- `@react-navigation/native`: contexto de navegação.
- `react-native-svg`: gráfico de pizza.
- `@expo/vector-icons`: ícones da interface.
