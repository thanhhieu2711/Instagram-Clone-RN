import {SafeAreaView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import NewPostContent from '../components/newpost/NewPostContent';
import NewPostOptions from '../components/newpost/NewPostOptions';
import Toast from '../components/toast/Toast';
const NewPostScreen = () => {
  const [status, setStatus] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle={'light-content'} />
      <NewPostContent setStatus={setStatus} />
      <NewPostOptions />
      <Toast textcolor={'white'} />
    </SafeAreaView>
  );
};

export default NewPostScreen;
