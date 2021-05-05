import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Login from '../components/user/Login';
import SmsVerify from '../components/user/SmsVerify';
import SignUp from '../components/user/SignUp';

type RootStackParamList = {
  'Giris Yap': undefined;
  SmsVerify: undefined;
  Kaydol: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Giris Yap'
>;

export type LoginProps = {
  navigation: LoginScreenNavigationProp;
};

const Stack = createStackNavigator<RootStackParamList>();

const SignIn = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Giris Yap" component={Login} />
          <Stack.Screen name="SmsVerify" component={SmsVerify} />
          <Stack.Screen name="Kaydol" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default SignIn;
