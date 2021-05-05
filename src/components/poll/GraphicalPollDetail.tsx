import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useProfile} from '../../context/profile';
import {PollService} from '../../service/PollService';
import {Body, Card, CardItem} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {PollStackParamList} from '../../screen/PollPage';

const colorArray: string[] = [
  'rgba(131, 167, 234, 1)',
  '#e26a00',
  '#F00',
  '#7F7F7F',
];

const chartConfig = {
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  useShadowColorFromDataset: false, // optional
};

const prepareData = (question: PollQuestion) => {
  const a = question.pollOptions.map((value, index) => {
    return {
      name: value.title,
      rateCount: value.rateCount,
      color: colorArray[index],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  });
  return a;
};
const screenWidth = Dimensions.get('window').width;
const pollService = new PollService();

type PollStackParamProps = StackScreenProps<
  PollStackParamList,
  'GraphicalPollDetail'
>;

function GraphicalPollDetail(props: PollStackParamProps) {
  const profile: User = useProfile();
  const [pollDetail, setPollDetail] = useState<Poll>();

  useEffect(() => {
    pollService.getPollDetail(props.route.params.pollID).then((detail) => {
      setPollDetail(detail);
    });
  }, []);

  return (
    <>
      <FlatList
        data={pollDetail?.pollQuestionList}
        renderItem={(info) => {
          return (
            <Card key={info.index}>
              <CardItem header>
                <Text>{info.item.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <PieChart
                    data={prepareData(info.item)}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="rateCount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                  />
                </Body>
              </CardItem>
            </Card>
          );
        }}
      />
    </>
  );
}
export default GraphicalPollDetail;
