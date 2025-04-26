import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumScreen from './src/screens/AlbumScreen';
import CirclularSlider from './src/screens/CirclularSlider';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Album' component={AlbumScreen} />
        <Stack.Screen name='CirclularSlider' component={CirclularSlider} />
        <Stack.Screen name='SettingsScreen' component={SettingsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App