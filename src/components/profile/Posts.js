/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Pressable,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import NotPostYet from '../NotPostYet';

const Posts = ({postOfCurrentUser, currentUser}) => {
  const [tabActive, setTabActive] = useState('posts');
  return (
    <View className="flex-1">
      <TabPages state={{tabActive, setTabActive}} />
      {tabActive === 'posts' ? (
        postOfCurrentUser?.length ? (
          <ListPost
            postOfCurrentUser={postOfCurrentUser}
            currentUser={currentUser}
          />
        ) : (
          <NotPostYet />
        )
      ) : (
        <NotPostYet />
      )}
    </View>
  );
};

function TabPages({state}) {
  const {tabActive, setTabActive} = state;
  const ActiveTab = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: -2,
          width: '100%',
          borderBottomColor: 'white',
          borderBottomWidth: 2,
        }}></View>
    );
  };

  return (
    <View className="flex-row mt-5 border-t-0.5 border-white/40 h-14">
      <Pressable
        className=" h-full flex-1 items-center justify-center"
        onPress={() => {
          setTabActive('posts');
        }}>
        <MaterialCommunityIcons
          name="grid"
          color={tabActive === 'posts' ? 'white' : 'grey'}
          size={24}
        />
        {tabActive === 'posts' && <ActiveTab />}
      </Pressable>
      <Pressable
        className="flex-1 items-center h-full justify-center"
        onPress={() => {
          setTabActive('tag');
        }}>
        <MaterialCommunityIcons
          name="contacts-outline"
          color={tabActive === 'tag' ? 'white' : 'grey'}
          size={24}
        />
        {tabActive === 'tag' && <ActiveTab />}
      </Pressable>
    </View>
  );
}

function ListPost({postOfCurrentUser, currentUser}) {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View className="flex-1 flex-row flex-wrap mt-0.5">
      {postOfCurrentUser?.map(post => (
        <TouchableOpacity
          key={post.postId}
          style={{width: width / 3 - 2, aspectRatio: 1, margin: 1}}
          onPress={() => {
            navigation.navigate('Post Detail', {
              post: post,
              currentUser: currentUser,
            });
          }}>
          <Image
            source={{uri: post.postImg}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ListReel() {
  return <View></View>;
}
export default Posts;
