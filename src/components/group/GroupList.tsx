import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, Container, Icon, View} from 'native-base';
import {useProfile} from '../../context/profile';
import {UserService} from '../../service/UserService';
import {GroupService} from '../../service/GroupService';
import {AddGroup} from './AddGroup';
import GroupListItem from './GroupListItem';
import AddItemButton from '../common/AddItemButton';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {StackScreenProps} from '@react-navigation/stack';
import {GroupStackParamList} from '../../screen/GroupsPage';

type GroupListStackProps = StackScreenProps<GroupStackParamList, 'GroupList'>;

const shoulDisableSwipe = (group: Group, profile: User) => {
  return group.id ? profile.managedGroups.indexOf(group.id) < 0 : true;
};

function GroupList(props: GroupListStackProps) {
  const userService = new UserService();
  const groupService = new GroupService();
  const {profile} = useProfile();
  const [userGroups, setUserGroups] = useState<Group[]>([]);

  useEffect(() => {
    console.log('group list');
    return props.navigation.addListener('focus', () => {
      groupService.getUserGroups(profile.user.id).then((response) => {
        setUserGroups(response);
      });
    });
  }, []);

  return (
    <Container>
      <AddItemButton
        onClick={() => {
          props.navigation.navigate('AddGroup');
        }}
        title={'Yeni Grup Ekle'}
      />
      <SwipeListView
        data={userGroups}
        renderItem={(rowData, rowMap) => (
          <SwipeRow
            disableRightSwipe={true}
            disableLeftSwipe={shoulDisableSwipe(rowData.item, profile.user)}
            rightActionValue={70}
            rightOpenValue={-60}>
            <View>
              <TouchableOpacity style={{alignSelf: 'flex-end', width: 60}}>
                <Button
                  danger
                  onPress={() => {
                    userService
                      .exitGroup(rowData.item, profile.user.id)
                      .then(() => {
                        setUserGroups(
                          userGroups.filter(
                            (value) => value.id != rowData.item.id,
                          ),
                        );
                      });
                  }}>
                  <Icon name="trash" />
                </Button>
              </TouchableOpacity>
            </View>
            <GroupListItem
              group={rowData.item}
              profile={profile.user}
              key={rowData.index}
            />
          </SwipeRow>
        )}
      />
    </Container>
  );
}

export default GroupList;
