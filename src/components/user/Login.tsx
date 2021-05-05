import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {
  Button,
  Container,
  Form,
  Input,
  Item,
  Label,
  Toast,
  View,
} from 'native-base';
import {LoginProps} from '../../screen/SignIn';
import {useProfile} from '../../context/profile';
import auth from '@react-native-firebase/auth';
import {UserService} from '../../service/UserService';

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 250,
    width: 250,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  content: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
  },
  button: {
    backgroundColor: '#26c145',
    width: '90%',
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signUpButton: {
    width: '90%',
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rememberView: {
    marginTop: 30,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  rememberCheckBox: {},
  rememberText: {marginLeft: 20},
  item: {},
});

const signUp = (navigation: LoginProps) => {
  navigation.navigation.navigate('Kaydol');
};
const userService = new UserService();
const Login = (props: LoginProps) => {
  const {setProfile} = useProfile();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (auth().currentUser != null) {
      userService.getCurrentUser().then((usr) => {
        console.log('current user' + JSON.stringify(usr));
        setProfile({
          type: 'LoginSuccess',
          user: usr,
        });
      });
    }
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.content}>
          <Image
            source={require('../../images/ODemokrasi.png')}
            style={styles.image}
          />
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Kullanici Adi</Label>
              <Input onChangeText={(text) => setUserName(text)} />
            </Item>
            <Item floatingLabel>
              <Label>Sifre</Label>
              <Input
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </Item>
            <Button
              info
              style={styles.button}
              onPress={() => {
                userService
                  .login(userName, password)
                  .then((usr: User) => {
                    setProfile({
                      type: 'LoginSuccess',
                      user: usr,
                    });
                  })
                  .catch((reason) => {
                    console.log(reason);
                    Toast.show({
                      type: 'danger',
                      position: 'top',
                      text: 'Bi problem olustu' + reason,
                    });
                  });
              }}>
              <Text>Giris Yap</Text>
            </Button>
            <Button
              bordered
              warning
              style={styles.signUpButton}
              onPress={() => signUp(props)}>
              <Text>Kayit Ol</Text>
            </Button>
          </Form>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Login;
