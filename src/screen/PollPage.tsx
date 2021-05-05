import React from 'react';
import AddPoll from '../components/poll/AddPoll';
import PollDetail from '../components/poll/PollDetail';
import {createStackNavigator} from '@react-navigation/stack';
import PollList from '../components/poll/PollList';
import GraphicalPollDetail from '../components/poll/GraphicalPollDetail';

export type PollStackParamList = {
  PollList: undefined;
  PollDetail: {pollID: string};
  GraphicalPollDetail: {pollID: string};
  AddPoll: undefined;
};

const PollStack = createStackNavigator<PollStackParamList>();

function PollPage() {
  return (
    <PollStack.Navigator initialRouteName={'PollList'} headerMode={'none'}>
      <PollStack.Screen name="PollList" component={PollList} />
      <PollStack.Screen name="PollDetail" component={PollDetail} />
      <PollStack.Screen
        name="GraphicalPollDetail"
        component={GraphicalPollDetail}
      />
      <PollStack.Screen name="AddPoll" component={AddPoll} />
    </PollStack.Navigator>
  );
}

export default PollPage;
