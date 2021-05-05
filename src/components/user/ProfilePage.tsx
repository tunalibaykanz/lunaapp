import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {
  Body,
  Button,
  Container,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Toast,
  View,
} from 'native-base';
import {useProfile} from '../../context/profile';
import ImagePicker from 'react-native-image-picker';
import {UserService} from '../../service/UserService';

const options = {
  title: 'Resim Secin',
  maxWidth: 640,
  maxHeight: 480,
  // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function ProfilePage() {
  const userService = new UserService();

  const {profile, setProfile} = useProfile();
  const [preUpdateProfile, updateProfile] = useState<User>(profile.user);

  const showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        updateProfile((prevState) => ({
          ...prevState,
          avatar: 'data:image/png;base64,' + response.data,
        }));
      }
    });
  };

  return (
    <Container>
      <Body>
        <Item
          testID={'image-item'}
          underline={false}
          style={{
            flexDirection: 'column',
          }}>
          <ImageBackground
            borderRadius={100}
            source={
              preUpdateProfile.avatar
                ? {uri: preUpdateProfile.avatar}
                : require('../../images/resimyok.png')
            }
            style={{
              height: 100,
              width: 100,
              alignSelf: 'center',
              borderRadius: 100,
              marginTop: 15,
              justifyContent: 'flex-end',
            }}>
            <Button
              transparent
              onPress={showImagePicker}
              style={{
                alignSelf: 'center',
              }}>
              <Icon
                name="add-circle"
                style={{
                  color: 'white',
                }}
              />
            </Button>
          </ImageBackground>
        </Item>

        <Item floatingLabel style={{marginTop: 5}}>
          <Label>Email</Label>
          <Input
            disabled
            value={preUpdateProfile.email}
            // onChangeText={(text) => {
            //   updateProfile((prevState) => ({
            //     ...prevState,
            //     email: text,
            //   }));
            // }}
          />
        </Item>
        <Item floatingLabel style={{marginTop: 5}}>
          <Label>Isim</Label>
          <Input
            value={preUpdateProfile.name}
            onChangeText={(text) => {
              updateProfile((prevState) => ({
                ...prevState,
                name: text,
              }));
            }}
          />
        </Item>
        <Item floatingLabel style={{marginTop: 5}}>
          <Label>Soyisim</Label>
          <Input
            value={preUpdateProfile.surname}
            onChangeText={(text) => {
              updateProfile((prevState) => ({
                ...prevState,
                surname: text,
              }));
            }}
          />
        </Item>
        <Item floatingLabel style={{marginTop: 5}}>
          <Label>TCKN</Label>
          <Input
            value={preUpdateProfile.tckn}
            onChangeText={(text) => {
              updateProfile((prevState) => ({
                ...prevState,
                tckn: text,
              }));
            }}
          />
        </Item>
        <Item floatingLabel style={{marginTop: 5}}>
          <Label>Telefon</Label>
          <Input
            value={preUpdateProfile.phoneNumber}
            onChangeText={(text) => {
              updateProfile((prevState) => ({
                ...prevState,
                phoneNumber: text,
              }));
            }}
          />
        </Item>
        <View
          style={{
            top: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'flex-end',
            width: '100%',
          }}>
          <Button
            success
            style={{alignSelf: 'flex-start'}}
            onPress={() => {
              userService.update(preUpdateProfile).then((response) => {
                setProfile({
                  type: 'UpdateSuccess',
                  user: preUpdateProfile,
                });
                Toast.show({
                  type: 'success',
                  text: 'Basariyla Guncellendi!',
                  position: 'top',
                  duration: 3000,
                });
              });
            }}>
            <Text> Guncelle </Text>
          </Button>
          <Button
            bordered
            primary
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              userService.signOut().then(
                setProfile({
                  type: 'SignOut',
                  user: '',
                }),
              );
            }}>
            <Text> Cikis Yap </Text>
          </Button>
        </View>
      </Body>
    </Container>
  );
}
export default ProfilePage;
