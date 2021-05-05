import React, {FC, useState} from 'react';
import {Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Item} from 'native-base';

const options = {
  title: 'Resim Secin',
  maxWidth: 640,
  maxHeight: 640,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
type CommonImagePickerProps = {
  onClick: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const CommonImagePicker: FC<CommonImagePickerProps> = (
  props: CommonImagePickerProps,
) => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setCurrentImage('data:image/png;base64,' + response.data);
        props.onClick('data:image/png;base64,' + response.data);
      }
    });
  };

  return (
    <Item style={{alignSelf: 'center'}} onPress={showImagePicker}>
      <Image
        source={
          currentImage
            ? {uri: currentImage}
            : require('../../images/resimyok.png')
        }
        style={{
          height: 100,
          width: 100,
          alignSelf: 'center',
          borderRadius: 100,
          marginBottom: 15,
        }}
      />
    </Item>
  );
};

export default CommonImagePicker;
