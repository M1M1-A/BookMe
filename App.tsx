import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';

export default function App():JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen
            name="Login"
            component={Login}
          /> */}
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


