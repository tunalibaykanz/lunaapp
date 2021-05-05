import React, {useEffect, useState} from 'react';
import {
  Accordion,
  Body,
  Button,
  Container,
  DatePicker,
  Icon,
  Input,
  Item,
  Label,
  List,
  ListItem,
  Text,
  Toast,
  View,
} from 'native-base';
import {PollService} from '../../service/PollService';
import ModalPopUp from '../common/ModalPopUp';
import {PollQuestion} from './PollQuestion';
import {StackScreenProps} from '@react-navigation/stack';
import {PollStackParamList} from '../../screen/PollPage';
import {Dimensions} from 'react-native';

type PollStackParamProps = StackScreenProps<PollStackParamList, 'AddPoll'>;

const AddPoll = (props: PollStackParamProps) => {
  const pollService = new PollService();
  const today = new Date();
  const [isModalVisible, setModalVisible] = useState(false);
  const [dataArray, setDataArray] = useState<AccordionType[]>([]);
  const [questions, setQuestions] = useState<Array<PollQuestion>>([]);
  const [pollTitle, setPollTitLe] = useState('');
  const [pollDetail, setPollDetail] = useState('');
  const [pollEndDate, setPollEndDate] = useState(new Date());

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addPollQuestion = (question: PollQuestion) => {
    setQuestions([...questions, question]);
    toggleModal();
  };

  useEffect(() => {
    // setPoll({
    //   endDate: pollEndDate,
    // });

    const pollQuestionShape = questions.map((question, index) => {
      {
        return {
          title: (
            <ListItem noBorder style={{marginLeft: 0, paddingLeft: 0}}>
              <Button
                testID={'del-btn'}
                danger
                transparent
                small
                onPress={() => {
                  const newList: PollQuestion[] = questions.filter(
                    (value) => value.title !== question.title,
                  );
                  setQuestions(newList);
                }}>
                <Icon style={{marginLeft: 0}} name="trash" />
              </Button>
              <Text>{question.title}</Text>
            </ListItem>
          ),
          content: (
            <List>
              {question.pollOptions.map((option, key) => (
                <ListItem key={key} style={{marginRight: 30}} noBorder>
                  <Icon
                    name="check-square"
                    style={{marginRight: 10}}
                    type="Feather"
                  />
                  <Label>{option.title}</Label>
                </ListItem>
              ))}
            </List>
          ),
        };
      }
    });
    setDataArray(pollQuestionShape);
  }, [questions.length]);

  return (
    <Container>
      <Body>
        <ModalPopUp isShown={isModalVisible} toggleModal={toggleModal}>
          <PollQuestion addQuestion={addPollQuestion} />
        </ModalPopUp>

        <Item regular style={{marginBottom: 5}}>
          <Input
            placeholder={'Anket Basligi'}
            value={pollTitle}
            onChangeText={(text) => {
              setPollTitLe(text);
            }}
          />
        </Item>
        <Item regular style={{marginBottom: 5}}>
          <Input
            placeholder={'Anket Detaylari'}
            value={pollDetail}
            onChangeText={(text) => {
              setPollDetail(text);
            }}
          />
        </Item>

        <Item
          style={{
            alignSelf: 'flex-start',
          }}>
          <Icon active name="calendar-outline" />

          <DatePicker
            defaultDate={
              new Date(today.getFullYear(), today.getMonth(), today.getDate())
            }
            minimumDate={
              new Date(today.getFullYear(), today.getMonth(), today.getDate())
            }
            locale={'en'}
            animationType={'slide'}
            androidMode={'default'}
            placeHolderText="Tarih Secin"
            textStyle={{color: 'green'}}
            placeHolderTextStyle={{color: '#d3d3d3'}}
            onDateChange={setPollEndDate}
          />
        </Item>

        <Item regular>
          <Button
            info
            bordered
            style={{alignSelf: 'center', marginTop: 5}}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text>+ Soru Ekleyin +</Text>
          </Button>
        </Item>
        <Accordion
          style={{
            marginTop: 5,
            height: '55%',
            width: Dimensions.get('screen').width,
          }}
          headerStyle={{backgroundColor: '#b7daf8', marginLeft: 0}}
          dataArray={dataArray}
          icon="chevron-down"
          expandedIcon="chevron-up"
          contentStyle={{padding: 0}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            success
            bordered
            onPress={() => {
              const poll: Poll = {
                title: pollTitle,
                detail: pollDetail,
                endDate: pollEndDate.getTime(),
                attendeeIds: [],
                pollQuestionList: questions,
                publishDate: new Date().getTime(),
                startDate: new Date().getTime(),
                groupId: [],
              };

              pollService
                .addPoll(poll)
                .then(() => {
                  Toast.show({
                    text: 'Grup basariyla olusturuldu',
                    type: 'success',
                    onClose: () => {
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

              props.navigation.goBack();
            }}>
            <Text> Kaydet </Text>
          </Button>
        </View>
        <View style={{height: 50}} />
      </Body>
    </Container>
  );
};
export default AddPoll;
