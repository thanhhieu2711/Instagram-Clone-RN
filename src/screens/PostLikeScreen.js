import {SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../components/postlike/Header';
import BoxSearch from '../components/search/BoxSearch';
import ListLike from '../components/postlike/ListLike';
const PostLikeScreen = ({route}) => {
  const {post} = route.params;
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header />
      <BoxSearch />
      <ListLike post={post} />
    </SafeAreaView>
  );
};

export default PostLikeScreen;
