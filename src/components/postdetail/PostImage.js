import {View, Image} from 'react-native';
import React from 'react';

function PostImage({post}) {
  return (
    <View className=" mt-4 w-full aspect-square">
      <Image
        source={{
          uri: post?.postImg,
        }}
        resizeMode="cover"
        className="w-full h-full"
      />
    </View>
  );
}

export default PostImage;
