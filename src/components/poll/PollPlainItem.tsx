import React, {FC, useEffect, useState} from 'react';
import {
  Card,
  CardItem,
  Body,
  Radio,
  Right,
  Text,
  Title,
  Left,
  View,
  Button,
} from 'native-base';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';

const PollPlainItem: FC<{
  question: PollQuestion;
  votable: boolean;
  answerChanged: (q: PollQuestion) => void;
}> = ({
  question,
  answerChanged,
  votable,
}: {
  question: PollQuestion;
  votable: boolean;
  answerChanged: (q: PollQuestion) => void;
}) => {
  const [options, setOptions] = useState<PollOption[]>(question.pollOptions);

  useEffect(() => {
    setOptions(question.pollOptions);
  }, []);

  useEffect(() => {
    const newQuestion: PollQuestion = {
      id: question.id,
      title: question.title,
      pollId: question.pollId,
      type: question.type,
      pollOptions: options,
    };
    answerChanged(newQuestion);
  }, [options]);

  return (
    <Card>
      <Title style={{alignSelf: 'flex-start'}}>{question.title}</Title>
      <FlatList
        scrollEnabled={false}
        data={question.pollOptions}
        renderItem={(info) => {
          const option = info.item;
          return (
            <TouchableOpacity
              disabled={!votable}
              key={info.index}
              onPress={() => {
                const selectedChanged = options.map((opt) => {
                  opt.selected = opt.id === option.id;
                  return opt;
                });
                setOptions(selectedChanged);
              }}>
              <CardItem>
                <Body>
                  <Text style={{width: Dimensions.get('window').width - 100}}>
                    {option.title}
                  </Text>
                </Body>
                <Right>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}>
                    <Radio
                      style={{
                        top: -4,
                        left: -1,
                      }}
                      selected={option.selected}
                      standardStyle={false}
                    />
                  </View>
                </Right>
              </CardItem>
            </TouchableOpacity>
          );
        }}
      />
    </Card>
  );
};

export default PollPlainItem;
