/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import {useNavigation} from '@react-navigation/native';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {IdGenerator} from '../../constants/IdGenerator';
import {useDispatch} from 'react-redux';
import {ToastSlice} from '../../redux/ToastSlice';
import {SendNotification} from '../general/SendNotification';

const Posts = ({post, users, currentUser}) => {
  const postOwner = users?.users?.find(
    user => user.uid === post.item.postOwner,
  );

  const [listComment] = useCollectionData(
    query(
      collection(
        db,
        'users',
        post?.item?.postOwner,
        'posts',
        post?.item?.postId,
        'comments',
      ),
      orderBy('createAt', 'asc'),
    ),
  );

  const docRef = doc(
    db,
    'users',
    post?.item?.postOwner,
    'posts',
    post?.item?.postId,
  );

  return (
    <View className="mb-7 ">
      <PostHeader
        post={post}
        postRef={docRef}
        postOwner={postOwner}
        currentUser={currentUser}
      />
      <PostImage post={post} />
      <PostWidget post={post} postRef={docRef} currentUser={currentUser} />
      <Likes post={post} currentUser={currentUser} />
      <PostCaption post={post} postOwner={postOwner} />
      <PostComments
        post={post}
        listComment={listComment}
        currentUser={currentUser}
      />
      <PostCreateDate post={post} />
    </View>
  );
};

function PostHeader({postOwner, currentUser, postRef}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleDeletePost = async () => {
    try {
      await deleteDoc(postRef);
      dispatch(ToastSlice.actions.SET_VISIBLE(true));
      dispatch(ToastSlice.actions.SET_TYPE(true));
      dispatch(ToastSlice.actions.SET_MESSAGE('Delete post successfully !'));
      setTimeout(() => {
        dispatch(ToastSlice.actions.SET_VISIBLE(false));
        dispatch(ToastSlice.actions.SET_MESSAGE(''));
        dispatch(ToastSlice.actions.SET_TYPE(''));
      }, 800);
    } catch (error) {
      console.log('Delete post failed');
    }
  };
  return (
    <View className="flex-row items-center justify-between px-1">
      {/* USER SIDE */}
      <View className="flex-row items-center space-x-3">
        <Pressable
          className="w-12 h-12"
          onPress={() => {
            if (postOwner.uid === currentUser.uid) {
              return;
            }
            return navigation.navigate('User Profile', {
              uid: postOwner.uid,
              currentUser: currentUser,
            });
          }}>
          <Image
            source={{
              uri: postOwner?.profileImage,
            }}
            resizeMode="cover"
            className="w-full h-full rounded-full"
          />
        </Pressable>
        <Text className="font-bold text-lg text-white">
          {postOwner?.username}
        </Text>
      </View>

      {/* OPTION SIDE*/}
      <TouchableOpacity
        onPress={() => {
          const isMine = currentUser.uid === postOwner.uid;
          isMine &&
            Alert.alert(
              'Delete this post ?',
              '',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    handleDeletePost();
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
        }}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          color={'white'}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
}

function PostImage({post}) {
  return (
    <View className=" mt-4 w-full aspect-square">
      <Image
        source={{
          uri: post?.item?.postImg,
        }}
        resizeMode="cover"
        className="w-full h-full"
      />
    </View>
  );
}

function PostWidget({post, currentUser, postRef}) {
  const navigation = useNavigation();

  const checkLiked = post?.item?.likeByUser.some(
    user => user.uid === currentUser.uid,
  );

  const checkSaved = post?.item?.saveByUser.some(
    user => user.uid === currentUser.uid,
  );

  const handleLike = async () => {
    try {
      if (checkLiked === false) {
        // NOT LIKE
        await updateDoc(postRef, {
          likeByUser: arrayUnion({uid: currentUser.uid}),
        });
        SendNotification(
          post?.item?.postId,
          currentUser.uid,
          post?.item?.postOwner,
          'like your post',
        );
      } else {
        //LIKED
        await updateDoc(postRef, {
          likeByUser: arrayRemove({uid: currentUser.uid}),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSave = async () => {
    try {
      if (checkSaved === false) {
        await updateDoc(postRef, {
          saveByUser: arrayUnion({uid: currentUser.uid}),
        });
      } else {
        await updateDoc(postRef, {
          saveByUser: arrayRemove({uid: currentUser.uid}),
        });
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
              navigation.navigate('Post Comment', {post: post});
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
            handleSave();
          }}>
          {checkSaved ? (
            <Ionicons name="bookmark" color={'yellow'} size={30} />
          ) : (
            <Ionicons name="bookmark-outline" color={'white'} size={30} />
          )}
        </TouchableOpacity>
      </View>

      {/* INFO POST     */}
    </View>
  );
}

function Likes({post, currentUser}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mt-3 ml-4"
      onPress={() => {
        navigation.navigate('Post Like', {
          post: post,
          currentUser: currentUser,
        });
      }}>
      {/* LIKES */}
      <Text className="text-white text-lg font-bold leading-5 ">
        {post?.item?.likeByUser.length.toLocaleString('us')} likes
      </Text>
    </TouchableOpacity>
  );
}

function PostCaption({post, postOwner}) {
  return post?.item?.caption?.length ? (
    <View className="w-full px-4 mt-3 ">
      <Text
        className="text-white tracking-wide text-lg font-bold leading-5"
        numberOfLines={2}>
        {postOwner?.username}{' '}
        <Text className="text-base font-medium">{post?.item?.caption}</Text>
      </Text>
    </View>
  ) : null;
}

function PostComments({listComment, currentUser, post}) {
  const [comment, setComment] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();

  const handleComment = async () => {
    const commentId = IdGenerator();
    const postRef = doc(
      db,
      'users',
      post?.item?.postOwner,
      'posts',
      post?.item?.postId,
      'comments',
      commentId,
    );
    try {
      if (comment.trim().length !== 0) {
        const commentData = {
          uid: currentUser.uid,
          commentId,
          content: comment,
          likeByUser: [],
          createAt: serverTimestamp(),
        };
        await setDoc(postRef, commentData);
      }
      return;
    } catch (error) {
      console.log('Comment failed ', error.message);
    }
  };

  return (
    <View className="px-4 mt-2">
      {listComment?.length ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Post Comment', {post: post});
          }}>
          <Text className="text-gray-500 text-lg font-medium">
            View all {listComment.length} comments
          </Text>
        </TouchableOpacity>
      ) : (
        <View className=" w-full flex-row items-center space-x-2 mt-2">
          <Image
            source={{uri: currentUser?.profileImage}}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
          <View
            className="flex-1 flex-row items-center border rounded-full space-x-2 justify-between"
            style={{
              borderColor: isFocus || comment ? '#333' : 'transparent',
            }}>
            <TextInput
              value={comment}
              onChangeText={setComment}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              autoCapitalize="none"
              className="flex-1 h-12 pl-3 text-white text-base font-medium leading-5"
              placeholder="Add a comment..."
              placeholderTextColor={'lightgray'}></TextInput>
            {isFocus || comment ? (
              <TouchableOpacity onPress={handleComment} className="mr-3">
                <Text
                  className={
                    comment
                      ? 'text-blue-500 font-bold text-base leading-5'
                      : 'text-blue-300 font-bold text-base leading-5'
                  }>
                  Post
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}

function PostCreateDate({post}) {
  const postDate = new Date(
    post?.item?.createAt?.seconds * 1000 +
      post?.item?.createAt?.nanoseconds / 1000000,
  );
  const currentDate = new Date();

  // timeDiff là khoảng cách giữa thời gian hiện tại và thời gian đăng bài viết tính theo đơn vị mili giây.
  const timeDiff = currentDate.getTime() - postDate.getTime();

  // dayDiff là thời gian số ngày giữa thời gian hiện tại và thời gian đăng bài viết, được tính bằng cách chia khoảng cách thời gian cho số mili giây trong một ngày (1000 * 3600 * 24).
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  // const minDiff = Math.floor(timeDiff / (1000 / 60));
  return (
    <View className="mt-3 ml-4">
      <Text className="text-white/40 font-semibold">
        {dayDiff === 0 ? '' : `${dayDiff} days ago`}
      </Text>
    </View>
  );
}
export default Posts;
