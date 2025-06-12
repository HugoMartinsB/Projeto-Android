import React from "react";
import { Text, View } from 'react-native';
import { style } from './styles'; // Seu arquivo de estilos para a Home
import Menu from "../../components/menu/menu"; // O menu global
import HomeNavMenu from "../../components/HomeNavMenu"; // O novo menu da Home

export default function HandleHome() {
  return (
    <View style={style.container}>
      <Menu /> 
      <Text style={style.title}>Bem-vindo!</Text>
      <HomeNavMenu /> 
    </View>
  );
}