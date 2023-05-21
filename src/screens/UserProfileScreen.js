import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {collection, collectionGroup} from 'firebase/firestore';
import {db} from '../../firebase-config';
import Header from '../components/userprofile/Header';
import ProfileInfo from '../components/userprofile/ProfileInfo';
import Posts from '../components/userprofile/Posts';
const UserProfileScreen = ({route}) => {
  const {uid, currentUser} = route.params;

  const [listUser, loading] = useCollectionData(collection(db, 'users'));
  const [listPost] = useCollectionData(collectionGroup(db, 'posts'));

  const selectedUser = listUser?.find(user => user.uid === uid);

  const postOfSelectedUser = listPost?.filter(
    post => post.postOwner === selectedUser.uid,
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle={'light-content'} />
      <Header selectedUser={selectedUser} />
      <ProfileInfo
        selectedUser={selectedUser}
        postOfSelectedUser={loading === false && postOfSelectedUser}
        // postOfSelectedUser={postOfSelectedUser}
        currentUser={currentUser}
      />
      <Posts
        postOfSelectedUser={loading === false && postOfSelectedUser}
        // postOfSelectedUser={postOfSelectedUser}
        selectedUser={selectedUser}
        currentUser={currentUser}
      />
    </SafeAreaView>
  );
};

export default UserProfileScreen;
