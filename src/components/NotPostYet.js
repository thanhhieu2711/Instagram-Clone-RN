import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

const NotPostYet = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-5">
      <View className="border-4 border-white/40 p-8 rounded-full ">
        <Feather name="camera" color="gray" size={50} />
      </View>
      <Text className="text-2xl text-white/40 font-medium">No Posts Yet</Text>
    </View>
  );
};

export default NotPostYet;
