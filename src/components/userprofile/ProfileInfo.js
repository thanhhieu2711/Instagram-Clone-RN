/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import {
  arrayRemove,
  arrayUnion,
  collectionGroup,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import {useDispatch} from 'react-redux';
import {UserSlice} from '../../redux/UserSlice';
import {useEffect} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {SendNotification} from '../general/SendNotification';

const ProfileInfo = ({selectedUser, postOfSelectedUser, currentUser}) => {
  return (
    <View className="mt-3 px-3">
      <View className="flex-row items-center">
        <ImageUser selectedUser={selectedUser} />
        <InfoUser
          selectedUser={selectedUser}
          postOfSelectedUser={postOfSelectedUser}
        />
      </View>
      <Bio selectedUser={selectedUser} />
      <ButtonOptions currentUser={currentUser} selectedUser={selectedUser} />
    </View>
  );
};

function ImageUser({selectedUser}) {
  return (
    <View className="w-28 h-28">
      <Image
        source={{
          uri: selectedUser?.profileImage,
        }}
        resizeMode="cover"
        className="w-full h-full rounded-full"
      />
    </View>
  );
}

function InfoUser({selectedUser, postOfSelectedUser}) {
  return (
    <View className="h-24 flex-row flex-1 items-center justify-between ml-10 ">
      <Pressable className="items-center space-y-1">
        <Text className="text-white font-bold text-xl leading-5">
          {postOfSelectedUser?.length}
        </Text>
        <Text className="text-white/90 text-base font-semibold leading-5">
          Post
        </Text>
      </Pressable>
      <Pressable className="items-center space-y-1">
        <Text className="text-white font-bold text-xl leading-5">
          {selectedUser?.followers?.length}
        </Text>
        <Text className="text-white/90 text-base font-semibold leading-5">
          Followers
        </Text>
      </Pressable>
      <Pressable className="items-center space-y-1">
        <Text className="text-white font-bold text-xl leading-5">
          {' '}
          {selectedUser?.following?.length}
        </Text>
        <Text className="text-white/90 text-base font-semibold leading-5">
          Following
        </Text>
      </Pressable>
    </View>
  );
}

function Bio({selectedUser}) {
  return (
    <View className="mt-4">
      <Text
        className="text-white text-base leading-5 font-semibold"
        numberOfLines={2}>
        {selectedUser?.bio}
      </Text>
    </View>
  );
}

function ButtonOptions({selectedUser, currentUser}) {
  const [listUser] = useCollectionData(collectionGroup(db, 'users'));
  const isFollow = selectedUser?.followers.some(
    user => user.uid === currentUser.uid,
  );

  // MỖI LẦN NHẤN FOLLOW HOẶC FOLLOWING THÌ SET LẠI LIST_USER TRÊN STORE
  useEffect(() => {
    dispatch(UserSlice.actions.SET_LIST_USER(listUser));
  }, [isFollow]);

  const dispatch = useDispatch();

  const handleFollow = async () => {
    const userRef = doc(db, 'users', selectedUser.uid);
    const currentUserRef = doc(db, 'users', currentUser.uid);

    if (isFollow === false) {
      // FOLLOW
      await updateDoc(userRef, {
        followers: arrayUnion({uid: currentUser.uid}),
      });
      await updateDoc(currentUserRef, {
        following: arrayUnion({uid: selectedUser.uid}),
      });
      SendNotification(
        '',
        currentUser.uid,
        selectedUser.uid,
        'starting follow you',
      );
    } else {
      // UNFOLLOW
      await updateDoc(userRef, {
        followers: arrayRemove({uid: currentUser.uid}),
      });
      await updateDoc(currentUserRef, {
        following: arrayRemove({uid: selectedUser.uid}),
      });
    }
    //RESET CURRENT_USER TO RELOAD FOLLOWING AND FOLLOWER
    const currentUserUpdated = await getDoc(currentUserRef);
    currentUserUpdated &&
      dispatch(UserSlice.actions.SET_CURRENT_USER(currentUserUpdated.data()));
  };

  return (
    <View className="h-11 flex-row items-center space-x-1.5 mt-5">
      <TouchableOpacity
        className="flex-1 h-full items-center justify-center bg-white/10 
      rounded-lg"
        onPress={handleFollow}>
        <Text className="text-white text-base font-bold leading-5 ">
          {isFollow ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 h-full items-center justify-center bg-white/10 rounded-lg">
        <Text className="text-white text-base font-bold leading-5 ">
          Message
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileInfo;
