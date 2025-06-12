import {StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from 'expo-blur';
import Home from './src/screens/Home';
import Skills from './src/screens/Skills';
import Khallenges from './src/screens/Khallenges';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (<BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />),
    }}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Skills" component={Skills}/>
      <Tab.Screen name="Khallenges" component={Khallenges}/>
    </Tab.Navigator>
  );
}
