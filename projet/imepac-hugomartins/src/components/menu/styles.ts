import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  // CONTAINER DO MENU GLOBAL (Home, Login, Cadastro)
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: themas.colors.primary,
    paddingTop: 20, // Espaçamento superior para barra de status
    paddingHorizontal: 20,
    flexDirection: 'row', // Horizontal
    justifyContent: 'space-around', // Espalha os itens
    alignItems: 'center',
    height: 50, // Altura fixa para o menu
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  // ITEM INDIVIDUAL DO MENU GLOBAL
  menuItem: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    // Não precisa de padding vertical aqui se a altura do container for fixa
    // paddingHorizontal: 10, // Menor padding horizontal
  },
  // --- Estilos compartilhados para as páginas (ajustados para o novo paddingTop) ---
  container: { // Este é o container das páginas Home, Cadastro, UsersList, etc.
    flex: 1,
    paddingTop: 100, // <-- Reduzir este padding, pois o menu é menor agora
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: { // Para formulários
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: { // Para formulários
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { // Para formulários
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: { // Para botões de ação
    backgroundColor: themas.colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { // Para texto de botões de ação
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productItem: { // Para lista de produtos
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themas.colors.accent,
    marginTop: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 2,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userRole: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  // NOVO ESTILO PARA O MENU DA HOME
  homeMenuContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  homeMenuItem: {
    backgroundColor: themas.colors.secondary, // Continua branco
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    minWidth: '40%',
    maxWidth: '45%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  homeMenuItemText: {
    color: themas.colors.text, // <-- ALTERE AQUI para themas.colors.text (quase preto)
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});