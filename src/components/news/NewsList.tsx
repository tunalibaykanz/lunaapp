import React, {FC, useEffect, useState} from 'react';
import {
  Body,
  Card,
  CardItem,
  Container,
  Label,
  Left,
  ListItem,
  Text,
} from 'native-base';
import {FlatList, Image, TouchableHighlight} from 'react-native';
import {NewsService} from '../../service/NewsService';
import AddItemButton from '../common/AddItemButton';
import {StackScreenProps} from '@react-navigation/stack';
import {NewsStackParamList} from '../../screen/NewsPage';

type NewsStackParamProps = StackScreenProps<NewsStackParamList, 'NewsList'>;

const NewsList: FC<NewsStackParamProps> = (props: NewsStackParamProps) => {
  const newsService = new NewsService();
  const [newsList, setNewsList] = useState<News[]>();

  useEffect(() => {
    return props.navigation.addListener('focus', (e) => {
      newsService.getNews().then((value) => setNewsList(value));
    });
  }, []);

  return (
    <Container>
      <AddItemButton
        onClick={() => props.navigation.navigate('AddNews')}
        title={'Yeni Haber Ekle'}
      />
      <FlatList
        data={newsList}
        keyExtractor={(item) => item.createDate.toString()}
        renderItem={({item}: {item: News}) => {
          return (
            <ListItem
              noBorder
              onPress={() => {
                props.navigation.navigate('NewsDetail', {news: item});
              }}>
              <Card>
                <CardItem>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  </Body>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 200, width: '100%'}}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Label style={{fontSize: 12, color: 'grey'}}>
                      {item.readCount} kez okundu
                    </Label>
                  </Left>
                </CardItem>
              </Card>
            </ListItem>
          );
        }}
      />
    </Container>
  );
};

export default NewsList;
