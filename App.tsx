import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './src/screen/Home';
import {ProfileProvider, useProfile} from './src/context/profile';
import SignIn from './src/screen/SignIn';
import {Root} from 'native-base';

const App = () => {
  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <ProfileProvider>
        <LoginScreenSelector />
      </ProfileProvider>
    </Root>
  );
};
const LoginScreenSelector = () => {
  const {profile} = useProfile();
  return profile.isLoggedIn ? <Home /> : <SignIn />;
};
export default App;
