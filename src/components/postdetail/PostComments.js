import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function PostComments({listComment, post, listUser}) {
  const navigation = useNavigation();

  const latestComment = listComment?.slice(listComment.length - 2);
  return (
    <View className="px-4 mt-2">
      {listComment?.length ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Post Comment', {post: post});
          }}>
          <Text className="text-gray-500 text-lg font-medium">
            View all {listComment?.length} comments
          </Text>
        </TouchableOpacity>
      ) : null}

      {latestComment?.reverse().map((comment, index) => {
        const commentOwner = listUser?.find(user => user.uid === comment.uid);
        return (
          <View
            key={comment.commentId}
            className="flex-row space-x-2 items-center mt-1">
            <Text className="font-bold text-white text-base">
              {commentOwner.username}
            </Text>
            <Text className=" text-white text-base font-medium">
              {comment.content}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default PostComments;
