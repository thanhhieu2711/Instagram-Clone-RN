import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

function Header({postOwner}) {
  const navigation = useNavigation();

  return (
    <View className=" justify-between items-center p-3">
      <View className=" items-center space-y-1">
        <Text className="text-white font-bold text-sm uppercase">
          {postOwner?.username}
        </Text>
        <Text className="text-white font-bold text-xl leading-5">Posts</Text>
      </View>
      <TouchableOpacity
        className="absolute left-1 top-4 translate-y-0.5"
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="ios-chevron-back" size={32} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
