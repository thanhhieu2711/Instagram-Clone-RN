import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {doc, serverTimestamp, setDoc} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import {IdGenerator} from '../../constants/IdGenerator';
import {SendNotification} from '../general/SendNotification';
function BoxComment({currentPost, currentUser}) {
  const [comment, setComment] = useState('');

  const handleComment = async () => {
    const commentId = IdGenerator();
    const postRef = doc(
      db,
      'users',
      currentPost?.item ? currentPost?.item?.postOwner : currentPost.postOwner,
      'posts',
      currentPost?.item ? currentPost?.item?.postId : currentPost.postId,
      'comments',
      commentId,
    );
    try {
      if (comment.trim().length !== 0) {
        const commentData = {
          uid: currentUser.uid,
          commentId,
          content: comment,
          likeByUser: [],
          createAt: serverTimestamp(),
        };
        await setDoc(postRef, commentData);
        SendNotification(
          currentPost?.item ? currentPost?.item?.postId : currentPost.postId,
          currentUser.uid,
          currentPost?.item
            ? currentPost?.item?.postOwner
            : currentPost.postOwner,
          `was commented your post : "${comment}"`,
        );
      }
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View
      className="absolute bottom-0 left-0 right-0 h-14 mb-10 mx-3 px-4
    flex-row items-center justify-between border-0.5 border-white/40 rounded-full">
      <TextInput
        value={comment}
        onChangeText={setComment}
        autoCapitalize="none"
        className="flex-1 h-full font-semibold text-white text-base leading-5"
        placeholder="Add a comment..."
        placeholderTextColor={'gray'}
      />
      <Pressable
        onPress={() => {
          handleComment();
          setComment('');
        }}
        className="ml-4">
        <Text
          className={
            comment
              ? 'font-bold text-blue-500 text-base'
              : 'font-bold text-blue-300 text-base'
          }>
          Post
        </Text>
      </Pressable>
    </View>
  );
}

export default BoxComment;
