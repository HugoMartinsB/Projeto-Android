import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './login/index';
import Cadastro from './cadastro/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home/index';
import UsersList from './users/index';
import ProductCreate from './products/ProductCreate';
import ProductList from './products/ProductList';
import ProductEdit from './products/ProductEdit'; // Importe a nova tela de edição de produto

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  UsersList: undefined;
  ProductCreate: undefined;
  ProductList: undefined;
  ProductEdit: { id: number }; // Adicione a nova rota para edição de produto, esperando um ID
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'Usuários Cadastrados' }} />
        <Stack.Screen name="ProductCreate" component={ProductCreate} options={{ title: 'Cadastrar Produto' }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Produtos Cadastrados' }} />
        <Stack.Screen name="ProductEdit" component={ProductEdit} options={{ title: 'Editar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}