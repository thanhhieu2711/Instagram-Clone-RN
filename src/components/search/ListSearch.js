/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {searchUserResultSelector} from '../../redux/Selectors';
import {useNavigation} from '@react-navigation/native';

const ListSearch = ({currentUser}) => {
  const searchUserResult = useSelector(searchUserResultSelector);
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 20,
        paddingHorizontal: 20,
        rowGap: 20,
      }}>
      {searchUserResult?.map(user => (
        <Pressable
          key={user.uid}
          className=" flex-row items-center space-x-4"
          onPress={() => {
            if (user.uid !== currentUser.uid) {
              navigation.navigate('User Profile', {
                uid: user.uid,
                currentUser: currentUser,
              });
            }
            return;
          }}>
          <Image
            source={{uri: user?.profileImage}}
            className="w-14 h-14 rounded-full"
            resizeMode="cover"
          />
          <View className="space-y-1">
            <Text className="text-white font-bold text-lg leading-5">
              {user.username}
            </Text>
            {user.name && (
              <Text className="text-gray-500 font-medium" numberOfLines={1}>
                {user.name}
              </Text>
            )}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default ListSearch;
