import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const Header = ({currentUser}) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center justify-between h-14 px-4 ">
      {/* LOGO */}
      <View className="w-36 h-full">
        <Image
          source={require('../../assets/textlogo_white.png')}
          resizeMode="contain"
          className="w-full h-full"
        />
      </View>

      {/* Widget */}
      <View className="flex-row items-center gap-x-4">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification', {
              currentUser: currentUser,
            });
          }}>
          <MaterialCommunityIcons
            name="heart-outline"
            color={'white'}
            size={32}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="facebook-messenger"
            color={'white'}
            size={32}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
