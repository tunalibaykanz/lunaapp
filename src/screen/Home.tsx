import React from 'react';
// import dark
import {Container, Icon} from 'native-base';
import NewsPage from './NewsPage';
import PollPage from './PollPage';
import ProfilePage from '../components/user/ProfilePage';
import GroupsPage from './GroupsPage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <Container>
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{backgroundColor: 'white'}}
          backBehavior={'none'}
          initialRouteName={'News'}>
          <Tab.Screen
            name={'News'}
            component={NewsPage}
            options={{
              title: 'Haberler',
              tabBarIcon: ({color}: {color: string}) => (
                <Icon color={color} name="news" type={'Entypo'} />
              ),
            }}
          />
          <Tab.Screen
            name={'Polls'}
            component={PollPage}
            options={{
              title: 'Anketler',
              tabBarIcon: (props) => (
                <Icon active name="poll-h" type={'FontAwesome5'} />
              ),
            }}
          />
          <Tab.Screen
            name={'Groups'}
            component={GroupsPage}
            options={{
              title: 'Gruplarim',
              tabBarIcon: () => <Icon name="group" type={'MaterialIcons'} />,
            }}
          />
          <Tab.Screen
            name={'Profile'}
            component={ProfilePage}
            options={{
              title: 'Profilim',
              tabBarIcon: () => <Icon name="person" type={'MaterialIcons'} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Container>
  );
}

export default Home;
