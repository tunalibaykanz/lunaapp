import React, {FC, useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Left,
  ListItem,
  Right,
  Text,
} from 'native-base';
import {PollService} from '../../service/PollService';
import {FlatList} from 'react-native';
import AddPoll from './AddPoll';
import PollDetail from './PollDetail';
import AddItemButton from '../common/AddItemButton';
import {useProfile} from '../../context/profile';
import GraphicalPollDetail from './GraphicalPollDetail';

import {PollStackParamList} from '../../screen/PollPage';
import {StackScreenProps} from '@react-navigation/stack';

type PollStackParamProps = StackScreenProps<PollStackParamList, 'PollList'>;

const PollList: FC<PollStackParamProps> = (props: PollStackParamProps) => {
  const pollService = new PollService();
  const {profile} = useProfile();
  const [polls, setPolls] = useState<Array<Poll>>();

  useEffect(() => {
    return props.navigation.addListener('focus', (e) => {
      pollService.getPollList().then((response) => {
        setPolls(response);
      });
    });
  }, []);

  const getButtonText = (poll: Poll): string => {
    if (poll.endDate < new Date().getTime()) return 'Sonuclandi';
    if (poll.attendeeIds.includes(profile.user.id)) return 'Oyladin';
    return 'Oy Ver';
  };

  const showPollDetail = (poll: Poll) => {
    if (poll.endDate < new Date().getTime()) {
      if (profile.user.isSysAdmin) {
        props.navigation.navigate('GraphicalPollDetail', {pollID: poll.id});
        return;
      }
      for (let a = 0; a < profile.user.managedGroups; a++) {
        if (poll.groupId.includes(profile.user.managedGroups[a])) {
          props.navigation.navigate('GraphicalPollDetail', {pollID: poll.id});
          return;
        }
      }
    }

    return props.navigation.navigate('PollDetail', {pollID: poll.id});
  };

  return (
    <Container>
      <AddItemButton
        onClick={() => {
          props.navigation.navigate('AddPoll');
        }}
        title={'Yeni Anket Ekle'}
      />
      <FlatList
        data={polls}
        renderItem={({item}: {item: Poll}) => {
          return (
            <ListItem
              thumbnail
              noBorder
              onPress={() => {
                showPollDetail(item);
              }}>
              <Left />
              <Body>
                <Text>{item.title}</Text>
              </Body>
              <Right>
                <Text style={{fontSize: 12}}>
                  Bitis Tarihi:{' '}
                  {new Date(item.endDate).toISOString().slice(0, 10)}
                </Text>
                <Button success>
                  <Text> {getButtonText(item)} </Text>
                </Button>
              </Right>
            </ListItem>
          );
        }}
      />
    </Container>
  );
};

export default PollList;
