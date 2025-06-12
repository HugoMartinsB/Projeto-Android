import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../pages/AppNavigation';
import { style } from '../menu/styles'; // Reutilizando os estilos globais, ou criando um novo se preferir

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function HomeNavMenu() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={style.homeMenuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("UsersList")} style={style.homeMenuItem}>
        <Text style={style.homeMenuItemText}>Ver Usuários</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("ProductCreate")} style={style.homeMenuItem}>
        <Text style={style.homeMenuItemText}>Cadastrar Produto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("ProductList")} style={style.homeMenuItem}>
        <Text style={style.homeMenuItemText}>Ver Produtos</Text>
      </TouchableOpacity>
      
      {/* Você pode adicionar mais itens aqui se precisar */}
    </View>
  );
}