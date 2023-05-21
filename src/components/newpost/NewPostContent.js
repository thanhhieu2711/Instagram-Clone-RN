/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {db} from '../../../firebase-config';
import {serverTimestamp, doc, setDoc} from 'firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import {currentUserSelector} from '../../redux/Selectors';
import {useDispatch, useSelector} from 'react-redux';
import {IdGenerator} from '../../constants/IdGenerator';
import {ToastSlice} from '../../redux/ToastSlice';

const defaultImage =
  'https://filmshusid.fo/wp-content/themes/films/assets/images/default.png';

function NewPostContent() {
  const [imagePicker, setImagePicker] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector(currentUserSelector);
  const pickImageFromGalery = async () => {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);
    if (result?.assets) {
      setImagePicker(result?.assets[0]?.uri);
      return;
    }
  };

  return (
    <View className="items-center">
      {/* IMAGE AND CAPTION */}
      <View className=" flex-row items-start p-2 space-x-4">
        <TouchableOpacity
          onPress={pickImageFromGalery}
          className={
            !imagePicker
              ? ' rounded-md border-white border w-28 h-28'
              : ' w-28 h-28'
          }>
          <Image
            source={{
              uri: imagePicker ? imagePicker : defaultImage,
            }}
            resizeMode="cover"
            className="w-full h-full rounded-md"
          />
        </TouchableOpacity>
        <TextInput
          value={caption}
          onChangeText={setCaption}
          multiline
          autoCapitalize="none"
          className="flex-1 h-28 py-2 text-lg font-medium text-white leading-5 overflow-hidden"
          placeholder="Write a caption for your post ..."
          placeholderTextColor={'gray'}
        />
      </View>

      {/* SHARE BUTTON */}
      <View className="w-full h-10 items-center justify-center bg-whit mt-1">
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <SharePostButton
            props={{
              imagePicker,
              caption: caption.trim(),
              currentUser,
              setImagePicker,
              setCaption,
              setLoading,
            }}
          />
        )}
      </View>
    </View>
  );
}

function SharePostButton({props}) {
  const dispatch = useDispatch();

  const {
    imagePicker,
    caption,
    currentUser,
    setImagePicker,
    setCaption,
    setLoading,
  } = props;
  const AddPost = async () => {
    let postId = IdGenerator();
    const docRef = await doc(db, 'users', currentUser.uid, 'posts', postId);
    try {
      const postData = {
        postId,
        postOwner: currentUser.uid,
        caption,
        postImg: imagePicker,
        likeByUser: [],
        tagPeople: [],
        saveByUser: [],
        createAt: serverTimestamp(),
      };
      if (imagePicker) {
        setLoading(true);
        await setDoc(docRef, postData);
        postId = '';
        setImagePicker(null);
        setCaption('');
        setLoading(false);
        dispatch(ToastSlice.actions.SET_VISIBLE(true));
        dispatch(
          ToastSlice.actions.SET_MESSAGE('Upload new post successfully !'),
        );
        dispatch(ToastSlice.actions.SET_TYPE(true));
        setTimeout(() => {
          dispatch(ToastSlice.actions.SET_VISIBLE(false));
          dispatch(ToastSlice.actions.SET_MESSAGE(''));
          dispatch(ToastSlice.actions.SET_TYPE(''));
        }, 1000);
      } else {
        dispatch(ToastSlice.actions.SET_VISIBLE(true));
        dispatch(ToastSlice.actions.SET_TYPE(false));
        dispatch(ToastSlice.actions.SET_MESSAGE('Upload new post failed !'));

        setTimeout(() => {
          dispatch(ToastSlice.actions.SET_VISIBLE(false));
          dispatch(ToastSlice.actions.SET_MESSAGE(''));
          dispatch(ToastSlice.actions.SET_TYPE(''));
        }, 1000);
        return;
      }
    } catch (error) {
      console.log('Upload new post failed');
    }
  };

  return (
    <TouchableOpacity onPress={AddPost}>
      <Text className="text-blue-600 font-bold text-lg leading-5">Share</Text>
    </TouchableOpacity>
  );
}

export default NewPostContent;
