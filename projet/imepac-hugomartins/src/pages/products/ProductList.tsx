import React, { useState, useEffect, useMemo } from "react";
import { Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity, TextInput } from 'react-native';
import { style } from './styles';
import api from '../../config/api';
import Menu from "../../components/menu/menu";
import { useNavigation } from '@react-navigation/native';
import { themas } from '../../global/themes'; // Verifique o caminho se for global/themes

// Definição da interface Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

const INITIAL_DISPLAY_LIMIT = 5; // <--- NOVO: Limite inicial de produtos a serem exibidos

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [displayAll, setDisplayAll] = useState(false); // <--- NOVO: Estado para controlar se exibe todos

  const navigation = useNavigation<any>(); // Usando 'any' para simplificar a tipagem

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar produtos:", err);
      let errorMessage = "Erro ao carregar produtos.";

      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Não autenticado. Por favor, faça login para ver produtos.";
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

  // Lógica de Filtragem de Produtos
  const filteredProducts = useMemo(() => {
    if (!searchText) {
      // Se não houver pesquisa, e não for para exibir todos, limita ao INITIAL_DISPLAY_LIMIT
      return displayAll ? products : products.slice(0, INITIAL_DISPLAY_LIMIT);
    }
    const lowerCaseSearchText = searchText.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchText) ||
      product.description.toLowerCase().includes(lowerCaseSearchText)
    );
  }, [products, searchText, displayAll]); // <--- Adicione displayAll às dependências

  const handleEditPress = (productId: number) => {
    navigation.navigate('ProductEdit', { id: productId });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={style.productItem}>
      <Text style={style.productName}>{item.name}</Text>
      <Text style={style.productDescription}>{item.description}</Text>
      <Text style={style.productPrice}>Preço: R$ {item.price.toFixed(2)}</Text>
      <Text style={style.productStock}>Estoque: {item.stockQuantity}</Text>

      <TouchableOpacity
        onPress={() => handleEditPress(item.id)}
        style={style.editButton}
      >
        <Text style={style.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={style.container}>
      <Menu />
      <Text style={style.title}>Lista de Produtos</Text>

      <View style={style.searchBarContainer}>
        <TextInput
          style={style.searchInput}
          placeholder="Pesquisar produtos..."
          placeholderTextColor={themas.colors.gray}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={style.errorText}>{error}</Text>
      ) : filteredProducts.length === 0 ? (
        <Text style={style.emptyListText}>
          {searchText ? "Nenhum produto encontrado com essa pesquisa." : "Nenhum produto cadastrado. Cadastre um!"}
        </Text>
      ) : (
        <>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
            contentContainerStyle={style.listContentContainer}
          />

          {/* <--- NOVO: Botão "Ver Mais" / "Ver Menos" */}
          {!searchText && products.length > INITIAL_DISPLAY_LIMIT && ( // Só mostra se não estiver pesquisando e houver mais itens que o limite
            <TouchableOpacity
              onPress={() => setDisplayAll(!displayAll)} // Alterna o estado de exibição
              style={style.toggleDisplayButton} // Novo estilo (criaremos abaixo)
            >
              <Text style={style.toggleDisplayButtonText}>
                {displayAll ? 'Ver Menos' : `Ver Todos (${products.length - INITIAL_DISPLAY_LIMIT} restantes)`}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}