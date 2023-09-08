/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';

import InstaStory from 'react-native-insta-story';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Stories = ({currentUser, stories}) => {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setFlag(false);
    const timeId = setTimeout(() => {
      setFlag(true);
    }, 500);
    return () => {
      clearTimeout(timeId);
    };
  }, [stories]);
  return (
    <View className="mt-2">
      <View
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: 15, paddingHorizontal: 10}}
        className="flex-row items-center">
        <CurrentUserStory {...currentUser} />
        {flag && stories && (
          <InstaStory
            className="flex-1"
            data={stories}
            duration={5}
            unPressedBorderColor={'orange'}
            unPressedAvatarTextColor={'white'}
            pressedAvatarTextColor={'white'}
            avatarSize={75}
            showAvatarText={true}
            avatarTextStyle={{fontSize: 15, fontWeight: 500}}
            storyAvatarImageStyle={{width: 42, height: 42}}
            renderCloseComponent={({item, onPress}) => {
              return (
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity>
                    <Ionicons
                      name="ellipsis-horizontal-sharp"
                      color={'white'}
                      size={28}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onPress}>
                    <Ionicons name="close" color={'white'} size={32} />
                  </TouchableOpacity>
                </View>
              );
            }}
            renderTextComponent={({item, profileName}) => {
              return (
                <View className="ml-3 items-center">
                  <Text className="font-semibold text-xl leading-5 text-white">
                    {profileName}
                  </Text>
                </View>
              );
            }}
            renderSwipeUpComponent={({item}) => {
              return (
                <View className="w-full px-4 mb-10">
                  <View className="flex-row items-center">
                    <BoxMessage />
                    <ActionTab currentUser={currentUser} item={item} />
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

function CurrentUserStory({profileImage}) {
  const navigation = useNavigation();
  return (
    <View className="w-20  items-center justify-center space-y-1 ">
      <TouchableOpacity
        className="w-full h-20 "
        onPress={() => {
          navigation.navigate('Story');
        }}>
        <Image
          source={{
            uri: profileImage,
          }}
          className="w-full h-full rounded-full  "
          resizeMode="cover"
        />
        <View
          className="w-7 h-7 rounded-full bg-blue-500 border-4
          items-center justify-center absolute -right-1  bottom-0">
          <Text className="text-lg font-bold leading-5 text-white">+</Text>
        </View>
      </TouchableOpacity>
      <Text className="text-white font-semibold" numberOfLines={1}>
        You
      </Text>
    </View>
  );
}

function BoxMessage() {
  const [message, setMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View className="flex-row items-center flex-1 h-14 border border-white/60 rounded-full px-4">
      <View className="flex-1 pr-3">
        <TextInput
          className="w-full h-full text-lg text-white font-medium leading-5"
          placeholder="Send message"
          placeholderTextColor={'white'}
          value={message}
          onChangeText={setMessage}
          onFocus={() => {
            setIsFocus(true);
          }}
        />
      </View>
      {isFocus && message && (
        <TouchableOpacity>
          <Text className="font-bold text-white text-lg">Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ActionTab({item, currentUser}) {
  const isLike = item?.item?.like_by_user.includes(currentUser.uid);

  return (
    <View className="flex-row items-center space-x-4 ml-4">
      <TouchableOpacity
        onPress={() => {
          console.log(item.story_id);
        }}>
        <Ionicons
          name={isLike ? 'ios-heart' : 'ios-heart-outline'}
          color={isLike ? 'red' : 'white'}
          size={34}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="md-paper-plane-outline" color={'white'} size={30} />
      </TouchableOpacity>
    </View>
  );
}

export default Stories;

/* <CurrentUserStory {...currentUser} /> */

/* {USERS.map((item, index) => {
          return (
            <View
              key={index}
              className="w-20 items-center justify-center space-y-1 ">
              <TouchableOpacity
                className="w-full h-20 rounded-full"
                style={{borderWidth: 3, borderColor: 'orange'}}>
                <Image
                  source={{uri: item.image}}
                  className="w-full h-full rounded-full "
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text className="text-white font-semibold" numberOfLines={1}>
                {item.name.toLowerCase()}
              </Text>
            </View>
          );
        })} */
