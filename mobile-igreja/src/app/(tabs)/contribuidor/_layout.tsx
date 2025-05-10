import { useAuth } from "@/src/authContext"
import Header from "@/src/components/header/header.component";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Slot, Tabs } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";
import Toast from "react-native-toast-message";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Layout = () => {
  const COLOR_DEFAULT = '#4B0082';
  return (
    <>
    <Header />
      <Tabs>
        <Tabs.Screen name="contribuicoes" options={{ title: 'Contribuições', 
        tabBarActiveTintColor: COLOR_DEFAULT,
        headerShown: false,
         tabBarIcon: ({foco, color, size} : any) => {
          return <AntDesign name="inbox" size={23} color={foco ? COLOR_DEFAULT : color}  />
        } }}  />
        <Tabs.Screen name="ajudar" options={{ title: 'Ajudar',
        tabBarActiveTintColor: COLOR_DEFAULT,
        headerShown: false,
         tabBarIcon: ({foco, color, size} : any) => {
          return <FontAwesome5 name="praying-hands" size={23} color={foco ? COLOR_DEFAULT : color} />
        } }}/>
      </Tabs>
    </>
  );
};

export default Layout;