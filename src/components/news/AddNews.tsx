import React, {FC, useState} from 'react';
import {
  Button,
  Container,
  Input,
  Item,
  Text,
  Textarea,
  Toast,
  View,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Image, ScrollView} from 'react-native';
import {NewsService} from '../../service/NewsService';
import {StackScreenProps} from '@react-navigation/stack';
import {NewsStackParamList} from '../../screen/NewsPage';

const options = {
  title: 'Resim Secin',
  maxWidth: 640,
  maxHeight: 480,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

type NewsStackParamProps = StackScreenProps<NewsStackParamList, 'AddNews'>;

const AddNews: FC<NewsStackParamProps> = (props: NewsStackParamProps) => {
  const newsService = new NewsService();
  const [title, setTitle] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [image, setImage] = useState<string>();

  const showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);
      if (response.data) {
        setImage('data:image/png;base64,' + response.data);
      }
    });
  };

  return (
    <Container>
      <ScrollView>
        <Item>
          <Input placeholder="Baslik" onChangeText={(text) => setTitle(text)} />
        </Item>
        <Item onPress={showImagePicker}>
          <Image
            style={{width: '97%', aspectRatio: 1.5}}
            source={image ? {uri: image} : require('../../images/resimyok.png')}
          />
        </Item>

        <Textarea
          rowSpan={15}
          bordered
          placeholder={'Aciklama'}
          underline={false}
          onChangeText={(text) => setDetail(text)}
        />
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
              if (title.trim().length < 1 || detail.trim().length < 1) {
                Toast.show({
                  type: 'danger',
                  text: 'Baslik ve/veya aciklama bos olamaz',
                });
                return;
              }

              const news: News = {
                title: title,
                detail: detail,
                image: image,
                readCount: 0,
                createDate: new Date().getTime(),
              };

              newsService
                .addNews(news)
                .then((resp) => {
                  Toast.show({
                    type: 'success',
                    text: 'Ekleme basarili',
                    onClose: (reason) => props.navigation.goBack(),
                  });
                })
                .catch((reason) => {
                  console.log(reason);
                  Toast.show({
                    type: 'danger',
                    text: 'Bir hata olustu, daha sonra tekrar deneyin',
                  });
                });
            }}>
            <Text> Kaydet </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddNews;
