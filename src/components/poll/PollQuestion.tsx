import React, {FC, useEffect, useState} from 'react';
import {
  Button,
  Card,
  CardItem,
  Header,
  Icon,
  Input,
  Item,
  Left,
  ListItem,
  Radio,
  Right,
  Switch,
  Text,
  Body,
  Title,
  View,
  List,
  Toast,
} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native';

const pollTypes = [
  {
    label: 'Coktan Secmeli',
    value: 'Multi',
  },
  {
    label: 'Tek Secim!',
    value: 'Single',
  },
];

export const PollQuestion: FC<{
  addQuestion: (q: PollQuestion) => void;
}> = ({addQuestion}: {addQuestion: (q: PollQuestion) => void}) => {
  const [pollType, setPollType] = useState('');
  const [pollOptionTitle, setPollOptionTitle] = useState<string>('');
  const [pollQuestionTitle, setPollQuestionTitle] = useState<string>('');
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);

  return (
    <>
      <DropDownPicker
        items={pollTypes}
        placeholder={'Soru Cevap Tipi'}
        defaultValue={''}
        containerStyle={{height: 40, width: '100%', marginBottom: 5}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => {
          setPollType(item.value);
        }}
      />
      <Item regular>
        <Input
          placeholder="Anket Sorusu"
          onChangeText={(text) => setPollQuestionTitle(text)}
        />
      </Item>
      <Item regular style={{marginTop: 5}}>
        <Input
          placeholder="Secenek"
          value={pollOptionTitle}
          onChangeText={(text) => {
            setPollOptionTitle(text);
          }}
        />
        <Icon
          active
          type={'Ionicons'}
          name="add-outline"
          onPress={() => {
            if (pollOptions.find((value) => value.title === pollOptionTitle))
              return;
            const pollOption: PollOption = {
              rateCount: 0,
              title: pollOptionTitle,
            };

            setPollOptions([...pollOptions, pollOption]);
            setPollOptionTitle('');
          }}
        />
      </Item>
      <ScrollView style={{width: '100%', maxHeight: 200}}>
        {pollOptions.map((option, index) => {
          return (
            <ListItem key={index}>
              <Body>
                <Text>{option.title}</Text>
              </Body>
              <Right>
                <Button danger bordered small>
                  <Icon
                    name="trash"
                    onPress={() => {
                      const newList = pollOptions.filter((value) => {
                        if (value.title !== option.title) return value;
                      });
                      setPollOptions(newList);
                    }}
                  />
                </Button>
              </Right>
            </ListItem>
          );
        })}
      </ScrollView>

      <View
        style={{
          marginTop: 10,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button
          success
          style={{alignSelf: 'flex-start'}}
          onPress={() => {
            if (
              pollOptions.length > 0 &&
              pollQuestionTitle.length > 0 &&
              pollType.length > 0
            ) {
              const pollQuestion: PollQuestion = {
                title: pollQuestionTitle,
                pollOptions: pollOptions,
                type: pollType,
              };
              addQuestion(pollQuestion);
            } else {
              Toast.show({
                text: 'Tum alanlari doldurunuz',
                type: 'danger',
                position: 'bottom',
              });
            }
          }}>
          <Text> Kaydet </Text>
        </Button>
      </View>
    </>
  );
};
