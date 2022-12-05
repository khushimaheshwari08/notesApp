import React  from 'react';
import Login from './src/Components/Login/Login';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
  const navigation= useNavigation();
  return (
    <>
       <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen
               options={{headerShown: false}}
                name="login"
                component={Login}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </>
  );
};

export default App;