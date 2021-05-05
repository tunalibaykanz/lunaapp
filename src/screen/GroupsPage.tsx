import React from 'react';
import {AddGroup} from '../components/group/AddGroup';
import {createStackNavigator} from '@react-navigation/stack';
import GroupList from '../components/group/GroupList';
import GroupDetail from '../components/group/GroupDetail';

export type GroupStackParamList = {
  GroupList: undefined;
  GroupDetail: {news: Group};
  AddGroup: undefined;
};

const NewsStack = createStackNavigator<GroupStackParamList>();

function GroupsPage() {
  return (
    <NewsStack.Navigator initialRouteName={'GroupList'} headerMode={'none'}>
      <NewsStack.Screen name="GroupList" component={GroupList} />
      <NewsStack.Screen name="GroupDetail" component={GroupDetail} />
      <NewsStack.Screen name="AddGroup" component={AddGroup} />
    </NewsStack.Navigator>
  );
}

export default GroupsPage;
