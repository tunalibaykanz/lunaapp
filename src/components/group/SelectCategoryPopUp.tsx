import React, {useEffect, useState} from 'react';
import {Body, Left, ListItem, Right, Text} from 'native-base';
import ModalPopUp from '../common/ModalPopUp';
import {FlatList} from 'react-native';

type PopUpProps = {
  itemList: CategoryFilterType[];
  isVisible: boolean;
  toggleMethod: () => void;
  setMethod: (item: CategoryFilterType) => void;
};

function SelectCategoryPopUp(props: PopUpProps) {
  const [showModal, setShowModal] = useState(props.isVisible);
  useEffect(() => {
    setShowModal(props.isVisible);
  }, [props.isVisible]);

  return (
    <ModalPopUp isShown={showModal} toggleModal={props.toggleMethod}>
      <FlatList
        style={{width: '100%', marginTop: 10}}
        bounces
        data={props.itemList}
        keyExtractor={(item) => item.label}
        renderItem={({item}) => (
          <ListItem
            key={item.label}
            avatar
            onPress={() => {
              props.setMethod(item);
            }}>
            <Left />
            <Body>
              <Text>{item.label}</Text>
            </Body>
            <Right />
          </ListItem>
        )}
      />
    </ModalPopUp>
  );
}

export default SelectCategoryPopUp;
