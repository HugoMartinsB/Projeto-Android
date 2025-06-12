import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { style } from './styles'; // Assumindo que você tem um arquivo styles.ts para este componente
import { RootStackParamList } from "../AppNavigation";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Use NativeStackNavigationProp

// Importações para a API e armazenamento (as mesmas do Login)
import api from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Modifique o tipo de navegação para NativeStackNavigationProp, pois você usa createNativeStackNavigator
type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

interface Props {
  navigation: CadastroScreenNavigationProp;
}

export default function Cadastro({ navigation }: Props)  {
  const [firstName, setFirstName] = useState(""); // Renomeado para 'firstName'
  const [lastName, setLastName] = useState(""); // Adicionado 'lastName' para o backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Renomeado para 'password'
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

  async function handleRegister() { // Renomeado para 'handleRegister'
    if (loading) return; // Evita múltiplas requisições

    // Validação básica do frontend
    if (!firstName || !lastName || !email || !password) { // Inclua lastName
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    setLoading(true); // Inicia o estado de carregamento

    try {
      // 1. Fazendo a requisição POST para o endpoint de registro
      const response = await api.post('/auth/register', {
        firstName: firstName,
        lastName: lastName, // Envie o lastName
        email: email,
        password: password,
      });

      const { token } = response.data; // O backend de registro também retorna um token

      // 2. Armazenando o token JWT após o registro bem-sucedido
      await AsyncStorage.setItem('@MyApp:token', token);

      Alert.alert("Sucesso", "Cadastro realizado e login efetuado!", [
        {text: "OK", onPress: () => navigation.navigate("Home")} // Navega para a Home após o registro/login
      ]);

    } catch (error: any) {
      console.log("Erro ao cadastrar:", error);
      let errorMessage = 'Ocorreu um erro ao tentar cadastrar. Tente novamente.';

      if (error.response) {
        // O servidor respondeu com um status de erro (4xx ou 5xx)
        if (error.response.status === 400) { // Bad Request, pode ser validação ou email já existente
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message; // Mensagem de erro do backend
          } else if (error.response.data && Array.isArray(error.response.data.errors)) {
            // Se o Spring Validation retornar uma lista de erros
            errorMessage = error.response.data.errors.map((err: any) => err.defaultMessage || err.message).join('\n');
          } else if (error.response.data) {
             // Se o backend enviar uma mensagem de erro mais genérica
             errorMessage = error.response.data.detail || JSON.stringify(error.response.data);
          }
        } else if (error.response.status === 409) { // 409 Conflict (pode ser para email já existente)
            errorMessage = "Este email já está cadastrado. Tente outro.";
        } else {
            errorMessage = `Erro do servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = 'Sem resposta do servidor. Verifique sua conexão ou o IP do backend.';
      } else {
        errorMessage = 'Erro na requisição de cadastro. ' + error.message;
      }

      Alert.alert("Erro de Cadastro", errorMessage);

    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Página de Cadastro</Text>

      {/* Campo para First Name */}
      <Text style={style.label}>Primeiro Nome</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Digite seu primeiro nome"
        />
        <MaterialIcons name="person" size={20} color="gray" />
      </View>

      {/* Campo para Last Name */}
      <Text style={style.label}>Sobrenome</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Digite seu sobrenome"
        />
        <MaterialIcons name="person" size={20} color="gray" />
      </View>

      <Text style={style.label}>Email</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <MaterialIcons name="email" size={20} color="gray" />
      </View>

      <Text style={style.label}>Senha</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />
        <MaterialIcons name="lock" size={20} color="gray" />
      </View>

      <TouchableOpacity onPress={handleRegister} style={style.button} disabled={loading}>
        <Text style={style.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}