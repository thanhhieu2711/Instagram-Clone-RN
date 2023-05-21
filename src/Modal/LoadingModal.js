import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingModal = () => {
  return (
    <View
      className=" bg-black/50 items-center justify-center
  absolute top-0 bottom-0 left-0 right-0">
      <ActivityIndicator color={'white'} size={'large'} />
    </View>
  );
};

export default LoadingModal;
