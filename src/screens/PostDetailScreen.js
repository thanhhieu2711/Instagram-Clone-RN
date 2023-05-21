/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-undef */
import {SafeAreaView} from 'react-native';
import React from 'react';

import {useCollectionData} from 'react-firebase-hooks/firestore';
import {collection, collectionGroup, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase-config';
import {useSelector} from 'react-redux';
import {listUserSelector} from '../redux/Selectors';
import Header from '../components/postdetail/Header';
import PostImage from '../components/postdetail/PostImage';
import Likes from '../components/postdetail/Likes';
import PostWidget from '../components/postdetail/PostWidget';
import PostCaption from '../components/postdetail/PostCaption';
import PostComments from '../components/postdetail/PostComments';
import PostDateCreate from '../components/postdetail/PostDateCreate';

const PostDetailScreen = ({route}) => {
  const {post, currentUser} = route.params;
  const [listPost] = useCollectionData(collectionGroup(db, 'posts'));

  const listUser = useSelector(listUserSelector);

  const selectedPost = listPost?.find(postP => postP.postId === post.postId);

  const postOwner = listUser?.find(user => user.uid === post?.postOwner);

  const [listComment] = useCollectionData(
    query(
      collection(
        db,
        'users',
        post?.postOwner,
        'posts',
        post?.postId,
        'comments',
      ),
      orderBy('createAt', 'asc'),
    ),
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header post={selectedPost} postOwner={postOwner} />
      <PostImage post={selectedPost} />
      <PostWidget post={selectedPost} currentUser={currentUser} />
      <Likes post={selectedPost} currentUser={currentUser} />
      <PostCaption post={selectedPost} postOwner={postOwner} />
      <PostComments
        listComment={listComment}
        currentUser={currentUser}
        post={selectedPost}
        listUser={listUser}
      />
      <PostDateCreate post={selectedPost} />
    </SafeAreaView>
  );
};

export default PostDetailScreen;
