import {StyleSheet, Text, Image, View, Dimensions, SafeAreaView, ImageBackground} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from 'expo-blur';
import Home from './src/screens/Home';
import Skills from './src/screens/Skills';
import Khallenges from './src/screens/Khallenges';
import KsKompanionHeader from './src/components/KsKompanionHeader';
import TabIcon from './src/components/TabIcon';

const Tab = createBottomTabNavigator();

const icons = {
    homeIcon: require('../assets/icons/home-icon.png'),
    skillsIcon: require('../assets/icons/skills-icon.png'),
    khallengesIcon: require('../assets/icons/khallenge-icon.png'),
};

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
    <Tab.Navigator screenOptions={{
        tabBarStyle: {
          postition: 'absolute',
          height: '15%',
          width: '100%',
        },
        tabBarIconStyle: {
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        },
        borderWidth: 2,
        borderColor: 'black',
        tabBarShowLabel: false,
        headerShown: false
    }}>
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: true,
                header: () => (
                    <KsKompanionHeader text="Welcome to Old School Klube Scroll."/>  
                ),
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        iconSource={icons.homeIcon}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Skills"
            component={Skills}
            options={{
                headerShown: true,
                header: () => (
                    <KsKompanionHeader text="Skills"/>  
                ),
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        iconSource={icons.skillsIcon}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Khallenges"
            component={Khallenges}
            options={{
                headerShown: true,
                header: () => (
                    <KsKompanionHeader text="Khallenges"/>  
                ),
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        iconSource={icons.khallengesIcon}
                    />
                ),
            }}
        />
    </Tab.Navigator>
    </SafeAreaView>
  );
}
