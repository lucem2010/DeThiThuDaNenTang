import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import manHinhChao from './manHinh/manHinhChao';
import manHinhHome from './manHinh/manHinhHome';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='manHinhHome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='manHinhChao' component={manHinhChao}></Stack.Screen>
        <Stack.Screen name='manHinhHome' component={manHinhHome}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})