import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Footer,
  Icon,
  Input,
  Item,
  Label,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
  Toast,
} from 'native-base';
import {Dimensions, FlatList, ScrollView} from 'react-native';
import {UserService} from '../../service/UserService';
import {GroupService} from '../../service/GroupService';
import CommonImagePicker from '../common/CommonImagePicker';
import {useProfile} from '../../context/profile';
import {StackScreenProps} from '@react-navigation/stack';
import {GroupStackParamList} from '../../screen/GroupsPage';
import SelectSingleItemPopUp from './SelectSingleItemPopUp';
import SelectCategoryPopUp from './SelectCategoryPopUp';

function getColumNum() {
  return Math.floor(Dimensions.get('screen').width / 135);
}

function removeItem<T>(items: T[], deletedItem: T) {
  return items.filter((items) => items !== deletedItem);
}

const groupCategories: CategoryFilterType[] = [
  {
    label: 'Egitim',
    isSelelcted: false,
  },
  {
    label: 'Kultur',
    isSelelcted: false,
  },
  {
    label: 'Sanat',
    isSelelcted: false,
  },
  {
    label: 'Ekonomi',
    isSelelcted: false,
  },
  {
    label: 'Tarim ve Hayvancilik',
    isSelelcted: false,
  },
];

type AddGroupStackParams = StackScreenProps<GroupStackParamList, 'AddGroup'>;

export const AddGroup = (props: AddGroupStackParams) => {
  const userService = new UserService();
  const groupService = new GroupService();
  const {profile} = useProfile();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectableUsers, setSelectableUsers] = useState<User[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryFilterType[]>(
    groupCategories,
  );

  const [admin, setAdmin] = useState<User>();
  const [groupSpecialMembers, setGroupSpecialMembers] = useState<User[]>([]);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [categories, setCategories] = useState<CategoryFilterType[]>([]);

  const [groupImage, setGroupImage] = useState<string>();
  const [groupName, setGroupName] = useState<string>();

  const [adminModal, showAdminModal] = useState(false);
  const [specialModal, showSpecialModal] = useState(false);
  const [memberModal, showMemberModal] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const toggleAdminModal = () => {
    showAdminModal(!adminModal);
  };
  const toggleSpecialModal = () => {
    showSpecialModal(!specialModal);
  };
  const toggleMemberModal = () => {
    showMemberModal(!memberModal);
  };

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  useEffect(() => {
    userService.getAllUsers().then((response: User[]) => {
      setAllUsers(response);
      setSelectableUsers(response);
    });
  }, []);

  useEffect(() => {
    const newAllCategories = groupCategories.filter(
      (value) => categories.indexOf(value) < 0,
    );
    setAllCategories(newAllCategories);
  }, [categories]);

  useEffect(() => {
    const newUserList = allUsers.filter(
      (user) =>
        user !== admin &&
        groupSpecialMembers.indexOf(user) < 0 &&
        groupMembers.indexOf(user) < 0,
    );
    setSelectableUsers(newUserList);
  }, [admin, groupSpecialMembers, groupMembers]);

  return (
    <Container>
      <SelectSingleItemPopUp
        itemList={selectableUsers}
        isVisible={adminModal}
        toggleMethod={toggleAdminModal}
        setMethod={(user) => {
          setAdmin(user);
          toggleAdminModal();
        }}
      />

      <SelectSingleItemPopUp
        itemList={selectableUsers}
        isVisible={specialModal}
        toggleMethod={toggleSpecialModal}
        setMethod={(user) => {
          setGroupSpecialMembers([...groupSpecialMembers, user]);
          toggleSpecialModal();
        }}
      />
      <SelectSingleItemPopUp
        itemList={selectableUsers}
        isVisible={memberModal}
        toggleMethod={toggleMemberModal}
        setMethod={(user) => {
          setGroupMembers([...groupMembers, user]);
          toggleMemberModal();
        }}
      />

      <SelectCategoryPopUp
        itemList={allCategories}
        isVisible={isCategoryModalVisible}
        toggleMethod={toggleCategoryModal}
        setMethod={(category) => {
          setCategories([...categories, category]);
          toggleCategoryModal();
        }}
      />

      <CommonImagePicker onClick={setGroupImage} />
      <Item>
        <Input
          placeholder={'Grup Adi'}
          onChangeText={(text) => setGroupName(text)}
        />
      </Item>
      <Item style={{width: '100%'}}>
        <Left>
          <Label>Grup Admin</Label>
        </Left>
        <Body>
          <Label>
            {admin === undefined ? '' : admin.name + ' ' + admin.surname}
          </Label>
        </Body>
        <Right>
          <Button
            dark
            transparent
            onPress={() => {
              toggleAdminModal();
            }}>
            <Icon name="ios-person-add" />
          </Button>
        </Right>
      </Item>
      <Item style={{width: '100%'}}>
        <Left>
          <Label>Nitelikli Uyeler</Label>
        </Left>
        <Body />
        <Right>
          <Button
            dark
            transparent
            onPress={() => {
              toggleSpecialModal();
            }}>
            <Icon name="ios-person-add" />
          </Button>
        </Right>
      </Item>
      <Item style={{width: '100%', height: 100}}>
        <FlatList
          data={groupSpecialMembers}
          style={{height: 100}}
          keyExtractor={(item) => item.tckn}
          horizontal
          bounces={false}
          renderItem={({item}) => {
            return (
              <ListItem style={{flexDirection: 'column', width: 110}} noBorder>
                <Thumbnail
                  source={
                    item.avatar !== null && item.avatar.length > 100
                      ? {uri: item.avatar}
                      : require('../../images/ODemocrasiLogo.png')
                  }
                  style={{resizeMode: 'contain'}}
                />
                <Text note numberOfLines={1}>
                  {item.name + ' ' + item.surname}
                </Text>
                <Button
                  danger
                  small
                  transparent
                  style={{
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={() => {
                    const newSpecialMembers = removeItem(
                      groupSpecialMembers,
                      item,
                    );
                    setGroupSpecialMembers(newSpecialMembers);
                  }}>
                  <Icon type={'Entypo'} name={'circle-with-cross'} />
                </Button>
              </ListItem>
            );
          }}
        />
      </Item>
      <Item style={{width: '100%'}}>
        <Left>
          <Label>Uyeler</Label>
        </Left>
        <Body />
        <Right>
          <Button
            dark
            transparent
            onPress={() => {
              toggleMemberModal();
            }}>
            <Icon name="ios-person-add" />
          </Button>
        </Right>
      </Item>
      <Item style={{width: '100%', height: 200, flexDirection: 'row'}}>
        <FlatList
          data={groupMembers}
          numColumns={getColumNum()}
          keyExtractor={(item) => item.tckn}
          renderItem={({item}) => {
            return (
              <ListItem style={{flexDirection: 'column'}} noBorder>
                <Thumbnail
                  square
                  source={
                    item.avatar !== null && item.avatar.length > 100
                      ? {uri: item.avatar}
                      : require('../../images/ODemocrasiLogo.png')
                  }
                  style={{resizeMode: 'contain'}}
                />
                <Text note numberOfLines={1}>
                  {item.name + ' ' + item.surname}*
                </Text>
                <Button
                  danger
                  small
                  transparent
                  style={{
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={() => {
                    const newGroupMembers = removeItem(groupMembers, item);
                    setGroupMembers(newGroupMembers);
                  }}>
                  <Icon type={'Entypo'} name={'circle-with-cross'} />
                </Button>
              </ListItem>
            );
          }}
        />
      </Item>
      <ListItem style={{width: '100%'}} icon noBorder>
        <Left>
          <Label>Kategoriler</Label>
        </Left>
        <Body />
        <Right>
          <Button
            dark
            transparent
            onPress={() => {
              toggleCategoryModal();
            }}>
            <Icon name="ios-person-add" />
          </Button>
        </Right>
      </ListItem>
      <Item style={{width: '100%', height: 60, flexDirection: 'row'}}>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.label}
          renderItem={({item}) => {
            return (
              <Button
                key={item.label}
                iconRight
                bordered
                transparent
                dark
                style={{margin: 5}}
                onPress={() => {
                  const newCategories = removeItem(categories, item);
                  setCategories(newCategories);
                }}>
                <Text>{item.label}</Text>
                <Icon name="close" />
              </Button>
            );
          }}
        />
      </Item>
      <Footer>
        <Button
          full
          success
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
          onPress={() => {
            if (
              !groupName ||
              groupName?.length < 1 ||
              admin === undefined ||
              groupMembers.length < 1 ||
              groupSpecialMembers.length < 1 ||
              categories.length < 1
            ) {
              Toast.show({
                text:
                  'Grup Adi, Admin, Nitelikli Uye, Uye ve Kategoriler bos olamaz',
                type: 'danger',
              });
              return;
            }

            const newGroup: Group = {
              title: groupName,
              logo: groupImage ? groupImage : '',
              admin: admin ? admin.id : profile.user.id,
              members: groupMembers.map((value) => value.id),
              specialUsers: groupSpecialMembers.map((value) => value.id),
              types: categories.map((value) => value.label),
            };
            groupService
              .createGroup(newGroup)
              .then((resp) => {
                Toast.show({
                  text: 'Grup basariyla olusturuldu',
                  type: 'success',
                  onClose: (reason) => {
                    props.navigation.goBack();
                  },
                });
              })
              .catch((reason) => {
                Toast.show({
                  text: 'Bi problem olustu',
                  type: 'danger',
                });
              });
          }}>
          <Text> Kaydet </Text>
        </Button>
      </Footer>
    </Container>
  );
};
