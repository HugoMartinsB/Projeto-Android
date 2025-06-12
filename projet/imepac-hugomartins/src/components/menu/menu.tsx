import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../pages/AppNavigation";
import { TouchableOpacity, View, Text } from "react-native";
import { style } from "./styles"; // Seu arquivo de estilos

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProps>();
  
  return (
    <View style={style.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={style.menuItem}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={style.menuItem}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={style.menuItem}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}