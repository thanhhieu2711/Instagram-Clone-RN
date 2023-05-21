import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
function Header({selectedUser}) {
  const navigation = useNavigation();
  return (
    <View className=" justify-between items-center p-3">
      <Text className="text-white font-bold text-lg leading-5">
        {selectedUser?.username}
      </Text>
      <TouchableOpacity
        className="absolute left-1 top-1.5"
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="ios-chevron-back" size={32} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
