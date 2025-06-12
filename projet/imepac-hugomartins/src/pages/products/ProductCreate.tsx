import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigation'; // Certifique-se que o caminho está correto
import api from '../../config/api'; // Sua instância do Axios configurada
import Menu from "../../components/menu/menu"; // Seu componente de menu
import { style } from './styles'; // Seus estilos para esta tela (criaremos a seguir)

type ProductCreateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductCreate'>;

interface Props {
  navigation: ProductCreateScreenNavigationProp;
}

export default function ProductCreate({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Usar string para TextInput, converter para number na requisição
  const [stockQuantity, setStockQuantity] = useState(''); // Usar string, converter para number
  const [loading, setLoading] = useState(false);

  async function handleCreateProduct() {
    if (loading) return;

    if (!name || !description || !price || !stockQuantity) {
      return Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }

    // Validação básica de número e conversão
    const parsedPrice = parseFloat(price);
    const parsedStockQuantity = parseInt(stockQuantity, 10);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return Alert.alert('Erro', 'Preço inválido. Deve ser um número positivo.');
    }
    if (isNaN(parsedStockQuantity) || parsedStockQuantity <= 0) {
      return Alert.alert('Erro', 'Quantidade em estoque inválida. Deve ser um número inteiro positivo.');
    }

    setLoading(true);

    try {
      // A chamada à API incluirá o token JWT automaticamente via interceptor
      const response = await api.post('/products', {
        name: name,
        description: description,
        price: parsedPrice,
        stockQuantity: parsedStockQuantity,
      });

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!', [
        { text: 'OK', onPress: () => {
          // Limpar campos após o sucesso
          setName('');
          setDescription('');
          setPrice('');
          setStockQuantity('');
          // Opcional: navegar para a lista de produtos ou outra tela
          // navigation.navigate('ProductList'); // Se você criar uma tela de lista de produtos
        }},
      ]);
      console.log('Produto criado:', response.data);

    } catch (error: any) {
      console.error('Erro ao cadastrar produto:', error);
      let errorMessage = 'Ocorreu um erro ao cadastrar o produto. Tente novamente.';

      if (error.response) {
        // Erro do backend (ex: 400 Bad Request, 403 Forbidden)
        if (error.response.status === 403) {
          errorMessage = 'Você não tem permissão para cadastrar produtos (apenas administradores).';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Mensagem de erro do backend
        } else if (error.response.data && Array.isArray(error.response.data.errors)) {
          // Se o Spring Validation retornar uma lista de erros
          errorMessage = error.response.data.errors.map((err: any) => err.defaultMessage || err.message).join('\n');
        } else {
          errorMessage = `Erro do servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        // Sem resposta do servidor
        errorMessage = 'Sem resposta do servidor. Verifique sua conexão ou o IP do backend.';
      } else {
        // Erro na configuração da requisição
        errorMessage = `Erro na requisição: ${error.message}`;
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={style.container}>
      <Menu />
      <ScrollView contentContainerStyle={style.scrollContent}>
        <Text style={style.title}>Cadastrar Novo Produto</Text>

        <Text style={style.label}>Nome do Produto</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Camiseta Básica"
          />
        </View>

        <Text style={style.label}>Descrição</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Descrição detalhada do produto"
            multiline
            numberOfLines={4}
          />
        </View>

        <Text style={style.label}>Preço</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Ex: 59.90"
            keyboardType="numeric"
          />
        </View>

        <Text style={style.label}>Quantidade em Estoque</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            value={stockQuantity}
            onChangeText={setStockQuantity}
            placeholder="Ex: 100"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity onPress={handleCreateProduct} style={style.button} disabled={loading}>
          <Text style={style.buttonText}>
            {loading ? <ActivityIndicator color="#fff" /> : 'Cadastrar Produto'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}