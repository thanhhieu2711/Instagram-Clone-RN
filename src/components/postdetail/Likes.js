import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function Likes({post, currentUser}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mt-3 ml-4"
      onPress={() => {
        navigation.navigate('Post Like', {
          post: post,
          currentUser: currentUser,
        });
      }}>
      {/* LIKES */}
      <Text className="text-white text-lg font-bold leading-5 ">
        {post?.likeByUser.length.toLocaleString('us')} likes
      </Text>
    </TouchableOpacity>
  );
}

export default Likes;
