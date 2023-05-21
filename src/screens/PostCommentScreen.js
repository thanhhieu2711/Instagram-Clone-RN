/* eslint-disable react/self-closing-comp */
import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {currentUserSelector, listUserSelector} from '../redux/Selectors';
import {collection, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase-config';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ListComment from '../components/postcomment/ListComment';
import BoxComment from '../components/postcomment/BoxComment';
const PostCommentScreen = ({route}) => {
  const {post} = route.params;
  const listUser = useSelector(listUserSelector);
  const currentUser = useSelector(currentUserSelector);
  const [listComment] = useCollectionData(
    query(
      collection(
        db,
        'users',
        post?.item ? post?.item?.postOwner : post?.postOwner,
        'posts',
        post?.item ? post?.item?.postId : post?.postId,
        'comments',
      ),
      orderBy('createAt', 'asc'),
    ),
  );

  return (
    <View className="flex-1 bg-black/90">
      <Header />
      <ListComment
        listCommentData={listComment}
        listUser={listUser}
        currentUser={currentUser}
        currentPost={post}
      />
      <BoxComment currentPost={post} currentUser={currentUser} />
    </View>
  );
};

function Header() {
  return (
    <View className="items-center border-b-0.5 border-gray-700 pb-4">
      <View className="w-14 py-0.5 mt-4 rounded-full bg-gray-700"></View>
      <Text className="mt-6 text-white font-bold text-xl leading-6">
        Comments
      </Text>
    </View>
  );
}

export default PostCommentScreen;
