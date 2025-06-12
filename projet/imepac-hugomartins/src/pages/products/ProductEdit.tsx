import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Importe NativeStackScreenProps
import { RootStackParamList } from '../AppNavigation';
import api from '../../config/api';
import Menu from "../../components/menu/menu";
import { style } from './styles'; // Reutilize os estilos de products/styles.ts
import { themas } from '../../global/themes'; // Para usar a cor 'danger'

// Definição da interface Product (para receber os dados do backend)
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

// Tipo de props para esta tela (inclui a rota e seus parâmetros)
type ProductEditScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductEdit'>;

export default function ProductEdit({ route, navigation }: ProductEditScreenProps) {
  const { id } = route.params; // Pega o ID passado via navegação
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]); // Recarrega se o ID mudar (embora não deva mudar nesta tela)

  async function fetchProductDetails() {
    setLoading(true);
    try {
      const response = await api.get(`/products/${id}`);
      const fetchedProduct: Product = response.data;
      setProduct(fetchedProduct);
      setName(fetchedProduct.name);
      setDescription(fetchedProduct.description);
      setPrice(fetchedProduct.price.toString()); // Converter number para string
      setStockQuantity(fetchedProduct.stockQuantity.toString()); // Converter number para string
    } catch (error: any) {
      console.error('Erro ao buscar detalhes do produto:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do produto. Tente novamente.', [
        { text: 'OK', onPress: () => navigation.goBack() } // Volta para a tela anterior
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProduct() {
    if (saving) return;

    if (!name || !description || !price || !stockQuantity) {
      return Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }

    const parsedPrice = parseFloat(price);
    const parsedStockQuantity = parseInt(stockQuantity, 10);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return Alert.alert('Erro', 'Preço inválido. Deve ser um número positivo.');
    }
    if (isNaN(parsedStockQuantity) || parsedStockQuantity <= 0) {
      return Alert.alert('Erro', 'Quantidade em estoque inválida. Deve ser um número inteiro positivo.');
    }

    setSaving(true);
    try {
      await api.put(`/products/${id}`, {
        name: name,
        description: description,
        price: parsedPrice,
        stockQuantity: parsedStockQuantity,
      });

      Alert.alert('Sucesso', 'Produto atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() } // Volta para a lista após sucesso
      ]);
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error);
      let errorMessage = 'Ocorreu um erro ao atualizar o produto. Tente novamente.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduct() {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            setDeleting(true);
            try {
              await api.delete(`/products/${id}`);
              Alert.alert('Sucesso', 'Produto excluído com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() } // Volta para a lista após exclusão
              ]);
            } catch (error: any) {
              console.error('Erro ao excluir produto:', error);
              let errorMessage = 'Ocorreu um erro ao excluir o produto. Tente novamente.';
              if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
              }
              Alert.alert('Erro', errorMessage);
            } finally {
              setDeleting(false);
            }
          },
          style: "destructive" // Para indicar uma ação perigosa
        }
      ]
    );
  }

  if (loading) {
    return (
      <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Carregando produto...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={style.errorText}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Menu />
      <ScrollView contentContainerStyle={style.scrollContent}>
        <Text style={style.title}>Editar Produto (ID: {id})</Text>

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

        <TouchableOpacity onPress={handleUpdateProduct} style={style.button} disabled={saving}>
          <Text style={style.buttonText}>
            {saving ? <ActivityIndicator color="#fff" /> : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>

        {/* Botão de Excluir */}
        <TouchableOpacity
          onPress={handleDeleteProduct}
          style={[style.button, { backgroundColor: themas.colors.danger, marginTop: 15 }]} // Usa a cor 'danger'
          disabled={deleting}
        >
          <Text style={style.buttonText}>
            {deleting ? <ActivityIndicator color="#fff" /> : 'Excluir Produto'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}