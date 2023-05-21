/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {currentUserSelector, listUserSelector} from '../../redux/Selectors';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import {UserSlice} from '../../redux/UserSlice';

const ListLike = ({post}) => {
  // const searchUserResult = useSelector(searchUserResultSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector(currentUserSelector);
  const currentUserRef = doc(db, 'users', currentUser.uid);

  const listUser = useSelector(listUserSelector);
  const listUserLikePost = listUser?.filter((user, index) => {
    const search = post?.item
      ? post?.item?.likeByUser?.find(likeUser => likeUser.uid === user.uid)
      : post?.likeByUser?.find(likeUser => likeUser.uid === user.uid);

    return search;
  });

  const handleFollow = async (isFollow, user) => {
    const userRef = doc(db, 'users', user.uid);
    if (isFollow === false) {
      // FOLLOW
      await updateDoc(userRef, {
        followers: arrayUnion({uid: currentUser.uid}),
      });
      await updateDoc(currentUserRef, {
        following: arrayUnion({uid: user.uid}),
      });
    } else {
      // UNFOLLOW
      await updateDoc(userRef, {
        followers: arrayRemove({uid: currentUser.uid}),
      });
      await updateDoc(currentUserRef, {
        following: arrayRemove({uid: user.uid}),
      });
    }
    //RELOAD current user để cập nhật lại followers và following
    const currentUserUpdated = await getDoc(currentUserRef);
    currentUserUpdated &&
      dispatch(UserSlice.actions.SET_CURRENT_USER(currentUserUpdated.data()));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 20,
        paddingHorizontal: 20,
        rowGap: 20,
      }}>
      {listUserLikePost?.map(user => {
        //CHECK XEM USER LIKE POST CÓ FOLLOW MÌNH HAY CHƯA
        const isFollow = currentUser.following.some(
          userFollowing => userFollowing.uid === user.uid,
        );
        return (
          <View
            key={user.uid}
            className=" flex-row items-center justify-between space-x-4">
            {/* AVATAR AND USERNAME */}
            <View className="flex-row space-x-3 items-center">
              <Pressable
                onPress={() => {
                  if (currentUser.uid !== user.uid) {
                    navigation.navigate('User Profile', {
                      uid: user.uid,
                      currentUser: currentUser,
                    });
                    return;
                  }
                }}>
                <Image
                  source={{uri: user?.profileImage}}
                  className="w-14 h-14 rounded-full"
                  resizeMode="cover"
                />
              </Pressable>
              <View className="space-y-1">
                <Text className="text-white font-bold text-lg leading-5">
                  {user.username}
                </Text>
                {user.name && (
                  <Text className="text-gray-500 font-medium" numberOfLines={1}>
                    {user.name}
                  </Text>
                )}
              </View>
            </View>

            {/* FLOW BUTTON */}
            {user.uid !== currentUser.uid ? (
              !isFollow ? (
                <TouchableOpacity
                  className="bg-blue-600 px-7 py-1.5 rounded-lg"
                  onPress={() => {
                    handleFollow(isFollow, user);
                  }}>
                  <Text className=" text-white text-base font-semibold">
                    Follow
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className=" mr-3 -translate-x-0.5  rounded-lg"
                  onPress={() => {
                    handleFollow(isFollow, user);
                  }}>
                  <Text className=" text-white text-base font-semibold">
                    Following
                  </Text>
                </TouchableOpacity>
              )
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ListLike;
