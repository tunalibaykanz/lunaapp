import React, {useEffect, useState} from 'react';
import {Body, Left, ListItem, Text, Thumbnail, Title} from 'native-base';
import ModalPopUp from '../common/ModalPopUp';
import {FlatList} from 'react-native';

type PopUpProps = {
  itemList: User[];
  isVisible: boolean;
  toggleMethod: () => void;
  setMethod: (user: User) => void;
};

function SelectSingleItemPopUp(props: PopUpProps) {
  const [showModal, setShowModal] = useState(props.isVisible);
  useEffect(() => {
    setShowModal(props.isVisible);
  }, [props.isVisible]);

  return (
    <ModalPopUp isShown={showModal} toggleModal={props.toggleMethod}>
      <FlatList
        style={{width: '100%', marginTop: 10}}
        data={props.itemList.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.tckn}
        renderItem={({item}) => (
          <ListItem
            avatar
            noBorder
            onPress={() => {
              props.setMethod(item);
            }}>
            <Left>
              <Thumbnail
                source={
                  item.avatar !== null && item.avatar.length > 100
                    ? {
                        uri: item.avatar,
                      }
                    : require('../../images/ODemocrasiLogo.png')
                }
              />
            </Left>
            <Body>
              <Title style={{alignSelf: 'flex-start'}}>
                <Text>{item.name + ' ' + item.surname}</Text>
              </Title>
            </Body>
          </ListItem>
        )}
      />
    </ModalPopUp>
  );
}

export default SelectSingleItemPopUp;
