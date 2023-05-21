import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Header({pickImageFromGalery}) {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between items-center p-3">
      <TouchableOpacity
        className="w-20"
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="close" size={32} color={'white'} />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <Text className="text-white font-bold text-lg leading-5">
          Add to story
        </Text>
      </View>
      <TouchableOpacity
        className="w-20 items-end pr-1"
        onPress={pickImageFromGalery}>
        <Text className="text-blue-600 text-lg font-semibold">Select</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Header;
