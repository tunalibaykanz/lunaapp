import React, {useEffect} from 'react';
import {Image, ScrollView} from 'react-native';

import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Icon,
  Left,
  Right,
  Text,
} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {NewsStackParamList} from '../../screen/NewsPage';
import {NewsService} from '../../service/NewsService';

type NewsStackParamProps = StackScreenProps<NewsStackParamList, 'NewsDetail'>;

function NewsDetail({route, navigation}: NewsStackParamProps) {
  const newsService = new NewsService();
  useEffect(() => {
    if (route.params.news.id) newsService.updateReadCount(route.params.news.id);
  }, []);

  return (
    <Container>
      <Card style={{height: '100%'}}>
        <CardItem header>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {route.params.news.title}
          </Text>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{uri: route.params.news.image}}
            style={{height: 200, width: '100%'}}
          />
        </CardItem>
        <CardItem>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Body>
              <Text>{route.params.news.detail}</Text>
            </Body>
          </ScrollView>
        </CardItem>
        <CardItem>
          {/*<Left>*/}
          {/*  <Button transparent>*/}
          {/*    <Icon active name="thumbs-up" />*/}
          {/*    <Text>12 Likes</Text>*/}
          {/*  </Button>*/}
          {/*</Left>*/}
          {/*<Body />*/}
          {/*<Right>*/}
          {/*  <Text>11h ago</Text>*/}
          {/*</Right>*/}
        </CardItem>
      </Card>
    </Container>
  );
}

export default NewsDetail;
