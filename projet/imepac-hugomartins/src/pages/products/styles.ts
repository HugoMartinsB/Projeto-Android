import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: themas.colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20, // Ajustado para dar espaço para a barra de pesquisa
    textAlign: 'center',
    color: themas.colors.primary,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: themas.colors.text,
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themas.colors.secondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themas.colors.lightGray,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: themas.colors.text,
  },
  button: {
    backgroundColor: themas.colors.primary,
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
  buttonText: {
    color: themas.colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productItem: {
    backgroundColor: themas.colors.secondary,
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
    color: themas.colors.text,
  },
  productDescription: {
    fontSize: 14,
    color: themas.colors.textLight,
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
    color: themas.colors.gray,
    fontStyle: 'italic',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: themas.colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: themas.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: themas.colors.danger,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: themas.colors.textLight,
    marginTop: 50,
  },
  // <--- NOVOS ESTILOS PARA A BARRA DE PESQUISA
  searchBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20, // Espaço entre a barra de pesquisa e a lista
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: themas.colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: themas.colors.secondary,
    color: themas.colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
toggleDisplayButton: {
    backgroundColor: themas.colors.lightGray, // Um fundo neutro
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20, // Alinha com o padding da lista
    marginTop: 10,
    marginBottom: 20, // Espaço extra abaixo do botão
  },
  toggleDisplayButtonText: {
    color: themas.colors.text, // Texto escuro
    fontSize: 16,
    fontWeight: 'bold',
  },
});