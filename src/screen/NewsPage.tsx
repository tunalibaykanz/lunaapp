import React from 'react';
import NewsDetail from '../components/news/NewsDetail';
import {createStackNavigator} from '@react-navigation/stack';
import NewsList from '../components/news/NewsList';
import AddNews from '../components/news/AddNews';

export type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: {news: News};
  AddNews: undefined;
};

const NewsStack = createStackNavigator<NewsStackParamList>();

function NewsPage() {
  return (
    <NewsStack.Navigator initialRouteName={'NewsList'} headerMode={'none'}>
      <NewsStack.Screen name="NewsList" component={NewsList} />
      <NewsStack.Screen name="NewsDetail" component={NewsDetail} />
      <NewsStack.Screen name="AddNews" component={AddNews} />
    </NewsStack.Navigator>
  );
}

export default NewsPage;
