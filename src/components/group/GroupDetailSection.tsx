import React from 'react';
import {FlatList, Image, ScrollView} from 'react-native';
import {
  Accordion,
  Body,
  Button,
  Header,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
  View,
} from 'native-base';

const GroupDetailSection = (props: {details: GroupDetailSectionModel}) => {
  return (
    <View>
      <FlatList
        data={props.details.data}
        renderItem={({item}) => {
          return (
            <ListItem
              thumbnail
              noBorder
              style={{marginTop: 5}}
              onPress={() => {
                console.log('Clicked item no' + item.id);
                console.log('Clicked type no' + props.details.type);
              }}>
              <Left>
                <Thumbnail square source={{uri: item.image}} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
              </Body>
              <Right />
            </ListItem>
          );
        }}
      />
    </View>
  );
};

export default GroupDetailSection;
