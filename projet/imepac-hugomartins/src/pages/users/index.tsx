import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { style } from './styles'; // Seus estilos para esta tela
import api from '../../config/api'; // Sua instância do Axios configurada
import Menu from "../../components/menu/menu"; // Seu componente de menu
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para verificar o token

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // Ex: "USER", "ADMIN"
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null); // Resetar erro

    try {
      // O interceptor do axios em api.ts já deve adicionar o token Authorization
      const response = await api.get('/users'); 
      setUsers(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar usuários:", err);
      let errorMessage = "Erro ao carregar usuários.";

      if (err.response) {
        if (err.response.status === 403) {
          errorMessage = "Você não tem permissão para ver esta lista. Faça login como ADMIN.";
        } else if (err.response.status === 401) {
          errorMessage = "Não autenticado. Por favor, faça login.";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = `Erro do servidor: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "Sem resposta do servidor. Verifique sua conexão ou o IP do backend.";
      } else {
        errorMessage = `Erro na requisição: ${err.message}`;
      }
      setError(errorMessage);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={style.userItem}>
      <Text style={style.userName}>{item.firstName} {item.lastName}</Text>
      <Text style={style.userEmail}>Email: {item.email}</Text>
      <Text style={style.userRole}>Role: {item.role}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      <Menu />
      <Text style={style.title}>Lista de Usuários</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={style.errorText}>{error}</Text>
      ) : users.length === 0 ? (
        <Text>Nenhum usuário encontrado.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id ? item.id.toString() : item.email} // Use ID se disponível, ou email como fallback único
          renderItem={renderUserItem}
          contentContainerStyle={style.listContentContainer}
        />
      )}
    </View>
  );
}