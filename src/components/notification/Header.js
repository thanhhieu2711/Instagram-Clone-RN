import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center h-12 space-x-3">
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="ios-chevron-back" size={40} color={'white'} />
      </TouchableOpacity>
      <Text className="text-3xl font-bold text-white">Notification</Text>
    </View>
  );
};

export default Header;
