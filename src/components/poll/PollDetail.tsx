import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  Footer,
  Header,
  Text,
  Title,
  Toast,
} from 'native-base';
import {PollService} from '../../service/PollService';
import {FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {PollStackParamList} from '../../screen/PollPage';
import PollPlainItem from './PollPlainItem';
import {useProfile} from '../../context/profile';

const pollService = new PollService();

type PollStackParamProps = StackScreenProps<PollStackParamList, 'PollDetail'>;

const PollDetail = (props: PollStackParamProps) => {
  const {profile} = useProfile();
  const [pollDetail, setPollDetail] = useState<Poll>();
  const [userAnswers, setUserAnswers] = useState<PollQuestion[]>([]);
  const [votable, setVotable] = useState(true);
  useEffect(() => {
    pollService.getPollDetail(props.route.params.pollID).then((poll) => {
      setPollDetail(poll);
      if (
        poll.attendeeIds.includes(profile.user.id) ||
        poll.endDate < new Date().getTime()
      ) {
        setVotable(false);
      }
    });
  }, [props.route.params.pollID]);

  function userAnswer(answeredQuestion: PollQuestion) {
    const newAnswers = userAnswers
      .filter((value) => value.id !== answeredQuestion.id)
      .concat([answeredQuestion]);
    setUserAnswers(newAnswers);
  }

  return (
    <Container>
      <Header>
        <Title style={{alignSelf: 'center'}}>{pollDetail?.title}</Title>
      </Header>
      <FlatList
        data={pollDetail && pollDetail.pollQuestionList}
        renderItem={(info) => (
          <PollPlainItem
            question={info.item}
            answerChanged={userAnswer}
            votable={votable}
          />
        )}
      />
      <Footer>
        <Button
          full
          success
          disabled={!votable}
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
          onPress={() => {
            if (userAnswers.length !== pollDetail?.pollQuestionList.length) {
              Toast.show({
                type: 'danger',
                text: 'Butun sorulari cevaplamalisiniz',
              });
              return;
            }

            pollService
              .votePoll(props.route.params.pollID, userAnswers)
              .then(() => {
                Toast.show({
                  type: 'success',
                  text: 'Oy verme islemi basrili!',
                  onClose: () => props.navigation.goBack(),
                });
              });
          }}>
          <Text> {votable ? 'Oy Ver!' : 'Oy Veremezsiniz'} </Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default PollDetail;
