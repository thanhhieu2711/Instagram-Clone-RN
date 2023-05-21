import {View, Text} from 'react-native';
import React from 'react';

function PostCaption({post, postOwner}) {
  return (
    <View className="w-full px-4 mt-3">
      <Text
        className="text-white tracking-wide text-lg font-bold leading-5"
        numberOfLines={2}>
        {postOwner?.username}
        {'  '}
        <Text className="text-base font-semibold">{post?.caption}</Text>
      </Text>
    </View>
  );
}
export default PostCaption;
