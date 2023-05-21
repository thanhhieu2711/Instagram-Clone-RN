import {ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {db} from '../../../firebase-config';
import {
  doc,
  addDoc,
  collection,
  getDocs,
  Timestamp,
  updateDoc,
  arrayUnion,
} from '@firebase/firestore';
import {IdGenerator} from '../../constants/IdGenerator';
const UploadButton = ({
  imagePicker,
  currentUser,
  setImagePicker,
  setStatus,
}) => {
  const recycle = () => {
    setImagePicker(undefined);
    setLoading(false);
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  const [loading, setLoading] = useState(false);

  const handleUploadStory = async () => {
    const storyRef = collection(db, 'users', currentUser.uid, 'stories');
    setLoading(true);
    try {
      // check xem đã upload story chưa nếu chưa thì tạo 1 collection ngược lại thì push thêm story vào field stories
      const checked = await getDocs(storyRef);

      // Đã có từng upload story
      if (checked.docs.length === 0 && imagePicker) {
        const storyData = {
          user_id: currentUser.uid,
          user_image: currentUser.profileImage,
          user_name: currentUser.username,
          stories: [
            {
              story_id: IdGenerator(),
              story_image: imagePicker,
              create_at: Timestamp.now(),
              like_by_user: [],
            },
          ],
        };
        await addDoc(storyRef, storyData);
        recycle();
        // console.log(response);
      } else {
        // chưa có collection stories ( tức là chưa upload story nào hết)

        // trỏ tới field stories trong collection
        const storiesRef = await doc(
          db,
          'users',
          currentUser.uid,
          'stories',
          checked.docs[0].id,
        );

        await updateDoc(storiesRef, {
          stories: arrayUnion({
            story_id: IdGenerator(),
            story_image: imagePicker,
            create_at: Timestamp.now(),
            like_by_user: [],
          }),
        });
        recycle();
      }
    } catch (error) {
      console.log(`Add story failed : ${error}`);
    }
  };

  return (
    imagePicker && (
      <TouchableOpacity
        className="absolute bottom-12 right-3 w-14 h-14 bg-white/25 rounded-full
   items-center justify-center"
        onPress={handleUploadStory}>
        {loading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <Ionicons name="ios-chevron-forward" size={35} color="white" />
        )}
      </TouchableOpacity>
    )
  );
};

export default UploadButton;
