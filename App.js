/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import {getFontSize, getLayoutSize} from "./src/Helper/ResponsiveUtils"

import SignupScreen from './src/Screens/Authentication/SignupScreen'
import LoginScreen from './src/Screens/Authentication/LoginScreen'

const Stack = createStackNavigator();

function SplashScreen({navigation}){
  setTimeout(() => {
     //navigation.replace('Intro');
     navigation.replace('Login');
  }, 2000);
  return(
    <View style={{backgroundColor:'#FFFF',flex:1,justifyContent:'center',alignItems:'center',}}>
        <Text style={{fontSize:35,fontWeight:'bold',
        color:'orange',textAlign:'center'}}>User Registration</Text>
    </View>
    )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
