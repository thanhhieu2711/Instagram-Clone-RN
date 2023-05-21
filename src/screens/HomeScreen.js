/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {SafeAreaView, StatusBar, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Posts from '../components/home/Posts';
import Divider from '../components/home/Divider';
import {useDispatch, useSelector} from 'react-redux';
import {currentUserSelector} from '../redux/Selectors';
import {collection, collectionGroup} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../firebase-config';
import {UserSlice} from '../redux/UserSlice';
import Toast from '../components/toast/Toast';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const [posts] = useCollectionData(collectionGroup(db, 'posts'));

  const [users, loadingUsers] = useCollectionData(collection(db, 'users'));

  const [stories] = useCollectionData(collectionGroup(db, 'stories'));

  // Check và lọc ra những user có stories
  const isExistStory = stories?.filter(story => story?.stories?.length !== 0);

  // use variable loadingUsers and useEffect to handle async process get users from firebase then update redux store

  useEffect(() => {
    dispatch(UserSlice.actions.SET_LIST_USER(users));
  }, [loadingUsers]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle={'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header currentUser={currentUser} />
        <Stories currentUser={currentUser} stories={isExistStory} />
        <Divider color={'grey'} height={0.2} />
        {posts?.map((item, index) => (
          <Posts
            key={index}
            post={{item}}
            users={{loadingUsers, users}}
            currentUser={currentUser}
          />
        ))}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default HomeScreen;
