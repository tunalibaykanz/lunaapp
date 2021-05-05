import React, {useState} from 'react';
import {Image, Text} from 'react-native';
import {Button, Container, Form, Input, Item, Toast, View} from 'native-base';

import {UserService} from '../../service/UserService';
import {useProfile} from '../../context/profile';
import {LoginProps} from '../../screen/SignIn';

function checkIsPasswordSame(pass: string, passRe: string) {
  return pass === passRe;
}

const SignUp = (props: LoginProps) => {
  const userService = new UserService();
  const {profile, setProfile} = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [tckn, setTckn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <Container>
      <View style={{marginTop: 20}}>
        <Form
          style={{
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../images/ODemokrasi.png')}
            style={{
              resizeMode: 'contain',
              height: 100,
              width: 150,
            }}
          />

          <Item floatingLabel>
            <Input placeholder="Isim" onChangeText={(text) => setName(text)} />
          </Item>
          <Item floatingLabel>
            <Input
              placeholder="Soyisim"
              onChangeText={(text) => setSurname(text)}
            />
          </Item>
          <Item floatingLabel>
            <Input placeholder="TCKN" onChangeText={(text) => setTckn(text)} />
          </Item>
          <Item floatingLabel>
            <Input
              placeholder="TEL NO"
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </Item>
          <Item floatingLabel>
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item floatingLabel>
            <Input
              placeholder="Sifre"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
          <Item floatingLabel>
            <Input
              secureTextEntry
              placeholder="Sifre Tekrar"
              onChangeText={(text) => setPasswordRe(text)}
            />
          </Item>
          <Button
            success
            onPress={() => {
              if (!checkIsPasswordSame(password, passwordRe)) {
                Toast.show({
                  type: 'danger',
                  text: 'Sifreler ayni degil',
                });
                return;
              }
              const user: User = {
                id: '',
                email: '',
                name: name,
                surname: surname,
                phoneNumber: phoneNumber,
                avatar: '',
                tckn: tckn,
                managedGroups: [],
                isSysAdmin: false,
              };

              userService
                .signup(email, password, user)
                .then(() => {
                  Toast.show({
                    type: 'success',
                    text: 'Kayit basarili',
                    onClose: () => {
                      props.navigation.navigate('Giris Yap');
                    },
                  });
                })
                .catch(() => {
                  Toast.show({
                    type: 'danger',
                    text: 'Bir problem olustu',
                  });
                });
            }}
            style={{
              alignSelf: 'center',
              width: '90%',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'white'}}>Kaydol</Text>
          </Button>
        </Form>
      </View>
    </Container>
  );
};

export default SignUp;
