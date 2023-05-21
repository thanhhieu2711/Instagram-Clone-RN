import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {arrayRemove, arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
function PostWidget({post, currentUser}) {
  const navigation = useNavigation();
  const checkLiked = post?.likeByUser.some(
    user => user.uid === currentUser.uid,
  );
  const checkSaved = post?.saveByUser.some(
    user => user.uid === currentUser.uid,
  );

  const handleLike = async () => {
    try {
      if (checkLiked === false) {
        // NOT LIKE
        await updateDoc(
          doc(db, 'users', post?.postOwner, 'posts', post?.postId),
          {
            likeByUser: arrayUnion({uid: currentUser.uid}),
          },
        );
      } else {
        //LIKED
        await updateDoc(
          doc(db, 'users', post?.postOwner, 'posts', post?.postId),
          {
            likeByUser: arrayRemove({uid: currentUser.uid}),
          },
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View className="mt-5 px-4 ">
      {/* WIDGET */}
      <View className="flex-row items-center justify-between">
        {/* LEFT SIDE */}
        <View className="flex-row items-center space-x-4">
          {/* LIKE BUTTON*/}
          <TouchableOpacity
            onPress={() => {
              handleLike();
            }}>
            {checkLiked ? (
              <Ionicons name="heart" color={'red'} size={32} />
            ) : (
              <Ionicons name="ios-heart-outline" color={'white'} size={32} />
            )}
          </TouchableOpacity>

          {/* COMMENT BUTTON */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Post Comment', {
                post: post,
              });
            }}>
            <Ionicons name="chatbubble-outline" color={'white'} size={30} />
          </TouchableOpacity>

          {/* SHARE BUTTON */}
          <TouchableOpacity>
            <Ionicons name="md-paper-plane-outline" color={'white'} size={30} />
          </TouchableOpacity>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          onPress={() => {
            // handleSave();
          }}>
          {checkSaved ? (
            <Ionicons name="bookmark" color={'yellow'} size={30} />
          ) : (
            <Ionicons name="bookmark-outline" color={'white'} size={30} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostWidget;
