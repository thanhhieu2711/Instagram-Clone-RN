import {View, Text} from 'react-native';
import React from 'react';

function PostDateCreate({post}) {
  const postDate = new Date(
    post?.createAt?.seconds * 1000 + post?.createAt?.nanoseconds / 1000000,
  );
  const currentDate = new Date();

  // timeDiff là khoảng cách giữa thời gian hiện tại và thời gian đăng bài viết tính theo đơn vị mili giây.
  const timeDiff = currentDate.getTime() - postDate.getTime();

  // dayDiff là thời gian số ngày giữa thời gian hiện tại và thời gian đăng bài viết, được tính bằng cách chia khoảng cách thời gian cho số mili giây trong một ngày (1000 * 3600 * 24).
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return (
    <View className="mt-3 ml-4">
      <Text className="text-white/40 font-semibold">
        {dayDiff > 30 ? '1 month ago' : `${dayDiff} days ago`}{' '}
      </Text>
    </View>
  );
}
export default PostDateCreate;
