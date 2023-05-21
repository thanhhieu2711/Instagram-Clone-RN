/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import Header from '../components/profile/Header';
import ProfileInfo from '../components/profile/ProfileInfo';
import Posts from '../components/profile/Posts';
import {useSelector} from 'react-redux';
import {currentUserSelector} from '../redux/Selectors';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../firebase-config';
import {collection, orderBy, query} from 'firebase/firestore';
const ProfileScreen = () => {
  const currentUser = useSelector(currentUserSelector);
  const [listPost] = useCollectionData(
    query(
      collection(db, 'users', currentUser.uid, 'posts'),
      orderBy('createAt', 'desc'),
    ),
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle={'light-content'} />
      <Header currentUser={currentUser} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}>
        <ProfileInfo postOfCurrentUser={listPost} currentUser={currentUser} />
        <Posts postOfCurrentUser={listPost} currentUser={currentUser} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
