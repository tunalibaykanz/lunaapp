import React, {useContext, useState} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {
  Button,
  CheckBox,
  Form,
  Icon,
  Input,
  Item,
  Text,
  View,
} from 'native-base';
import {useProfile} from '../../context/profile';

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
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

const SmsVerify = () => {
  const {profile, setProfile} = useProfile();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.content}>
          <Image
            source={{uri: 'https://picsum.photos/id/1065/200/200'}}
            style={styles.image}
          />
          <Form style={styles.form}>
            <Item error>
              <Input placeholder="Textbox with Error Input" />
              <Icon name="circle-with-cross" type="Entypo" />
            </Item>
            <Button
              block
              info
              style={styles.button}
              onPress={() => {
                setProfile({
                  type: 'LoginSuccess',
                  profile: profile.profile,
                });
                console.log(profile);
              }}>
              <Text>Verify</Text>
            </Button>
            <View style={styles.rememberView}>
              <CheckBox
                checked={true}
                color="green"
                style={styles.rememberCheckBox}
              />
              <Text style={styles.rememberText}>Remember</Text>
            </View>
          </Form>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SmsVerify;
