import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
const Stack = createStackNavigator();

import Login from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';

export default function App():JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// create Stack.Group for logged in users, auth screens, and common screens


