import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ProfileInfo = ({currentUser, postOfCurrentUser}) => {
  return (
    <View className="mt-3 px-3">
      <View className="flex-row items-center">
        <ImageUser {...currentUser} />
        <InfoUser posts={postOfCurrentUser} currentUser={currentUser} />
      </View>
      <Bio {...currentUser} />
      <ButtonOptions currentUser={currentUser} />
    </View>
  );
};

function ImageUser({profileImage}) {
  return (
    <View className="w-28 h-28">
      <Image
        source={{
          uri: profileImage,
        }}
        resizeMode="cover"
        className="w-full h-full rounded-full"
      />
    </View>
  );
}

function InfoUser({currentUser, posts}) {
  return (
    <View className="h-24 flex-row flex-1 items-center justify-between ml-10 ">
      <Pressable className="items-center space-y-1">
        <Text className="text-white font-bold text-xl leading-5">
          {posts?.length}
        </Text>
        <Text className="text-white/90 text-base font-semibold leading-5">
          Post
        </Text>
      </Pressable>
      <Pressable className="items-center space-y-1">
        <Text className="text-white font-bold text-xl leading-5">
          {currentUser?.followers?.length}
        </Text>
        <Text className="text-white/90 text-base font-semibold leading-5">
          Followers
        </Text>
      </Pressable>
      <Pressable className="items-center space-y-1">
        <Text className="text-white font-bold text-xl leading-5">
          {' '}
          {currentUser?.following?.length}
        </Text>
        <Text className="text-white/90 text-base font-semibold leading-5">
          Following
        </Text>
      </Pressable>
    </View>
  );
}

function Bio({bio}) {
  return (
    <View className="mt-4">
      <Text
        className="text-white text-base leading-5 font-semibold"
        numberOfLines={2}>
        {bio}
      </Text>
    </View>
  );
}

function ButtonOptions({currentUser}) {
  const navigation = useNavigation();
  return (
    <View className="h-11 flex-row items-center space-x-1.5 mt-5">
      <TouchableOpacity
        className="flex-1 h-full items-center justify-center bg-white/10 rounded-lg"
        onPress={() => {
          navigation.navigate('Edit Profile', {currentUser: currentUser});
        }}>
        <Text className="text-white text-base font-bold leading-5 ">
          Edit profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 h-full items-center justify-center bg-white/10 rounded-lg">
        <Text className="text-white text-base font-bold leading-5 ">
          Share profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-11 h-full bg-white/10 items-center justify-center rounded-lg">
        <Ionicons name="person-add-outline" color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
}

export default ProfileInfo;
