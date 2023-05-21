/* eslint-disable react/react-in-jsx-scope */

import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {db} from '../../../firebase-config';
import {
  doc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
function ListComment({listCommentData, listUser, currentUser, currentPost}) {
  const handleLikeComment = async (comment, isLikeComment) => {
    const commentRef = doc(
      db,
      'users',
      currentPost?.item ? currentPost?.item?.postOwner : currentPost?.postOwner,
      'posts',
      currentPost?.item ? currentPost?.item?.postId : currentPost?.postId,
      'comments',
      comment?.commentId,
    );
    try {
      if (isLikeComment) {
        // nếu like rồi thì click lần 2 sẽ xóa
        await updateDoc(commentRef, {
          likeByUser: arrayRemove(currentUser?.uid),
        });
      } else {
        // nếu chưa like thì sẽ thêm
        await updateDoc(commentRef, {
          likeByUser: arrayUnion(currentUser?.uid),
        });
      }
    } catch (error) {
      console.log('Like comment failed', error.message);
    }
  };

  const handleDeleteComment = async comment => {
    const commentRef = doc(
      db,
      'users',
      currentPost?.item ? currentPost?.item?.postOwner : currentPost?.postOwner,
      'posts',
      currentPost?.item ? currentPost?.item?.postId : currentPost?.postId,
      'comments',
      comment?.commentId,
    );
    try {
      await deleteDoc(commentRef);
      // console.log(comment?.commentId);
    } catch (error) {
      console.log('Delete comment failed');
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="px-3 pt-5 mb-24 space-y-6"
      contentContainerStyle={{paddingBottom: 40}}>
      {listCommentData?.map((comment, index) => {
        const commentOwner = listUser.find(x => x.uid === comment.uid);
        const isLikeComment = comment.likeByUser.includes(currentUser.uid);
        return (
          <Pressable
            key={index}
            className="flex-row items-center space-x-4"
            onLongPress={() => {
              const isMine = comment.uid === currentUser.uid;
              if (isMine) {
                Alert.alert(
                  'Delete this comment ?',
                  '',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        handleDeleteComment(comment);
                      },
                    },
                    {
                      text: 'No',
                    },
                  ],
                  {
                    userInterfaceStyle: 'dark',
                  },
                );
              }
              return;
            }}>
            <Image
              source={{uri: commentOwner?.profileImage}}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1 flex-row items-center">
              <View className="flex-1 space-y-1">
                <Text className="text-white font-bold text-base leading-5">
                  {commentOwner?.username}
                </Text>
                <Text className="text-white font-medium leading-5">
                  {comment?.content}
                </Text>
              </View>
              <TouchableOpacity
                className="mr-4 ml-6"
                onPress={() => {
                  handleLikeComment(comment, isLikeComment);
                }}>
                <Ionicons
                  name={isLikeComment ? 'ios-heart' : 'ios-heart-outline'}
                  color={isLikeComment ? 'red' : 'white'}
                  size={14}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export default ListComment;
