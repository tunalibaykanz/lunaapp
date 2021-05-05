import {Button, Input, Item, ListItem, Text, View} from 'native-base';
import Modal from 'react-native-modal';
import React, {FC, ReactElement, ReactNode, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: 500,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
type ModalPopUpProps = {
  children: Element[] | Element | undefined;
  isShown: boolean;
  toggleModal: () => void;
};
const ModalPopUp: FC<ModalPopUpProps> = (
  props: ModalPopUpProps,
): ReactElement => {
  const [isVisible, setVisible] = useState(props.isShown);

  useEffect(() => {
    setVisible(props.isShown);
  }, [props.isShown]);

  return (
    <Modal
      isVisible={isVisible}
      backdropColor="#B4B3DB"
      backdropOpacity={0.8}
      animationInTiming={600}
      animationOutTiming={600}
      onBackdropPress={props.toggleModal}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.content}>{props.children}</View>
    </Modal>
  );
};

export default ModalPopUp;
