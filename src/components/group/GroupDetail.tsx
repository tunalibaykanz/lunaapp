import React from 'react';
import {Image, ScrollView} from 'react-native';

import {
  Accordion,
  Body,
  Button,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import GroupDetailSection from './GroupDetailSection';

const userListData: GroupDetailSectionModel = {
  header: 'Kullanicilar',
  type: 0,
  data: [
    {
      id: '1',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Erman',
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Zeynep',
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Tosi',
    },
  ],
  listRetriever: '',
};
const pollListData: GroupDetailSectionModel = {
  header: 'Anketler',
  type: 1,
  data: [
    {
      id: '1',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Erman',
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Zeynep',
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Tosi',
    },
  ],
  listRetriever: '',
};
const newsListData: GroupDetailSectionModel = {
  header: 'Haberler',
  type: 2,
  data: [
    {
      id: '1',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Erman',
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Zeynep',
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Tosi',
    },
    {
      id: '1',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Erman',
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Zeynep',
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/picsum/200/200',
      name: 'Tosi',
    },
  ],
  listRetriever: '',
};

const GroupDetail = () => {
  return (
    <Tabs>
      <Tab
        heading={
          <TabHeading>
            <Icon name="camera" />
            <Text>Kullanicilar</Text>
          </TabHeading>
        }>
        <View>
          <ListItem thumbnail style={{marginTop: 5, marginLeft: 0}}>
            <Body>
              <Button
                info
                bordered
                style={{alignSelf: 'center'}}
                onPress={() => {}}>
                <Text> Yeni Kullanici Ekle </Text>
              </Button>
            </Body>
          </ListItem>
          <GroupDetailSection details={userListData} />
        </View>
      </Tab>
      <Tab
        heading={
          <TabHeading>
            <Icon name="camera" />
            <Text>Anketler</Text>
          </TabHeading>
        }>
        <View>
          <ListItem thumbnail style={{marginTop: 5, marginLeft: 0}}>
            <Body>
              <Button
                info
                bordered
                style={{alignSelf: 'center'}}
                onPress={() => {}}>
                <Text> Yeni Anket Ekle </Text>
              </Button>
            </Body>
          </ListItem>
          <GroupDetailSection details={pollListData} />
        </View>
      </Tab>
      <Tab
        heading={
          <TabHeading>
            <Icon name="camera" />
            <Text>Haberler</Text>
          </TabHeading>
        }>
        <View>
          <ListItem thumbnail style={{marginTop: 5, marginLeft: 0}}>
            <Body>
              <Button
                info
                bordered
                style={{alignSelf: 'center'}}
                onPress={() => {}}>
                <Text> Yeni Haber Ekle </Text>
              </Button>
            </Body>
          </ListItem>
          <GroupDetailSection details={newsListData} />
        </View>
      </Tab>
    </Tabs>
  );
};

export default GroupDetail;
