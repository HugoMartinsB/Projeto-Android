import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { style } from './styles'; // Assumindo que você tem um arquivo styles.ts para este componente
import Logo from '../../assets/icons8-login-100.png'; // Caminho para sua imagem de logo
import { themas } from "../../../themes"; // Seus temas de cor
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../AppNavigation"; // Certifique-se que o caminho está correto
import { Input } from "../../components/input/index"; // Seu componente Input

// Importações para a API e armazenamento
import api from '../../config/api'; // O arquivo que criamos
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Renomeado para 'password' para consistência com o backend
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

  async function handleLogin() { // Renomeado para 'handleLogin' para refletir a nova lógica
    if (loading) return; // Evita múltiplas requisições

    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos!');
    }

    setLoading(true); // Inicia o estado de carregamento

    try {
      // 1. Fazendo a requisição POST para o endpoint de login
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });

      const { token } = response.data; // Extrai o token da resposta

      // 2. Armazenando o token JWT
      await AsyncStorage.setItem('@MyApp:token', token); // Chave para armazenar o token

      Alert.alert("Sucesso", "Logado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Home") }
      ]);

    } catch (error: any) { // Use 'any' para capturar o erro e inspecionar
      console.log('Erro ao logar:', error);
      let errorMessage = 'Ocorreu um erro ao tentar logar. Tente novamente.';

      if (error.response) {
        // O servidor respondeu com um status de erro (4xx ou 5xx)
        if (error.response.status === 403) { // 403 Forbidden geralmente para credenciais inválidas
          errorMessage = 'Email ou senha inválidos.';
        } else if (error.response.data && error.response.data.message) {
          // Se o backend enviar uma mensagem de erro específica
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Erro do servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        errorMessage = 'Sem resposta do servidor. Verifique sua conexão ou o IP do backend.';
      } else {
        // Algo aconteceu na configuração da requisição que disparou um erro
        errorMessage = 'Erro na requisição de login. ' + error.message;
      }

      Alert.alert("Erro de Login", errorMessage);

    } finally {
      setLoading(false); // Finaliza o estado de carregamento, mesmo em caso de erro
    }
  }

  return (
    <View style={style.container}>

      <View style={style.boxTop}>
        <Image source={Logo} />
        {/* Provavelmente o Input aqui não é o de email/senha, mas se for, adapte */}
        {/* <Input /> */} 
        <Text>Bem Vindo!!!</Text>
      </View>

      <View style={style.boxMid}>
        <Text style={style.title}>E-mail</Text>
        <View style={style.boxInputEmail}>
          <TextInput
            style={style.input}
            value={email}
            onChangeText={setEmail} // Simplificado
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none" // Para emails
          />
          <MaterialIcons name="email" size={20} color={themas.colors.gray} />
        </View>

        <Text style={style.title}>Coloque sua Senha</Text>
        <View style={style.boxInputSenha}>
          <TextInput
            style={style.input}
            value={password}
            onChangeText={setPassword} // Simplificado
            secureTextEntry
            placeholder="Digite sua senha"
          />
          <MaterialIcons name="lock" size={20} color={themas.colors.gray} />
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button} onPress={handleLogin} disabled={loading}>
          <Text>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text>Não tem conta? Cadastre-se aqui!</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}