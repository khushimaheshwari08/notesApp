import React, { useEffect, useState }  from 'react';
import Login from './src/Components/Login/Login';
import SignUp from './src/Components/Signup/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from './src/Components/Notes/Notes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteDetail from './src/Components/Notes/NoteDetail';
import NoteProvider from './src/context/NoteProvider';
import UserDetail from './src/Components/Notes/UserDetail';
import StartQRScanner from './src/Components/QRScanner/StartQRScanner';

const Stack = createNativeStackNavigator();
const App = () => {

  const [auth, setAuth] = useState(null)
  const [render, setRender] = useState(false)

  const loginData = async() => {
    let retrivedItem = await AsyncStorage.getItem('isLogin');
    let item = JSON.parse(retrivedItem);
    setAuth(item);
    setRender(true)
}

useEffect(() => {
  loginData();
}, [])

  return (
    <>
        {render ?(
          <NavigationContainer>
            <NoteProvider>
            <Stack.Navigator initialRouteName={auth ?"notes":"login"}>
              <Stack.Screen
               options={{headerShown: false}}
                name="login"
                component={Login}
                />
                <Stack.Screen
                options={{headerShown: false}}
                name="signUp"
                component={SignUp}
                />
                <Stack.Screen
                options={{headerShown: false}}
                name="notes"
                component={Notes}
                />
                <Stack.Screen
                options={{headerShown: false}}
                name="noteDetail"
                component={NoteDetail}
                />
                  <Stack.Screen
                options={{headerShown: false}}
                name="userDetail"
                component={UserDetail}
                />
                  <Stack.Screen
                options={{headerShown: false}}
                name="startQR"
                component={StartQRScanner}
                />
            </Stack.Navigator>
            </NoteProvider>
          </NavigationContainer>
          ): null
      }
    </>
  );
};

export default App;