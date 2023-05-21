import {SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import Toast from '../components/toast/Toast';
import Header from '../components/newstory/Header';
import UploadButton from '../components/newstory/UploadButton';
import NewStoryContent from '../components/newstory/NewStoryContent';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {currentUserSelector} from '../redux/Selectors';

const NewStoryScreen = () => {
  const [imagePicker, setImagePicker] = useState();
  const [status, setStatus] = useState(false);
  const currentUser = useSelector(currentUserSelector);

  const pickImageFromGalery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 600,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary(options);
    if (result?.assets) {
      setImagePicker(result?.assets[0]?.uri);
      return;
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header pickImageFromGalery={pickImageFromGalery} />
      <NewStoryContent imagePicker={imagePicker} />
      <UploadButton
        imagePicker={imagePicker}
        currentUser={currentUser}
        setImagePicker={setImagePicker}
        setStatus={setStatus}
      />
      {status && (
        <View className="mb-3">
          <Toast
            visible={status}
            background={'green'}
            textcolor={'white'}
            message={'Upload new story successfully !'}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewStoryScreen;
