/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SingleReel from '../components/reels/SingleReel';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {collectionGroup} from 'firebase/firestore';
import {db} from '../../firebase-config';
import {launchCamera} from 'react-native-image-picker';
const listReel = [
  {
    reel_id: 1,
    reel_owner: 1293812093812093812,
    // video: require('../assets/videos/video1.mp4'),
    video: require('../assets/videos/video2.mp4'),
    username: 'Ram cham',
    description: 'Feel the buity of nature',
    likes: '254k',
    isLike: false,
  },
  {
    reel_id: 2,
    reel_owner: 123123123123123,
    video: require('../assets/videos/video1.mp4'),
    username: 'Light in the dark',
    description: 'Healing time <3',
    likes: '300k',
    isLike: false,
  },
];

const ReelScreen = () => {
  const [currentIndex, setCurrentIndex] = useState();
  const {width, height} = useWindowDimensions();

  // const [listReel] = useCollectionData(collectionGroup(db, 'reels'));
  // console.log(listReel);
  const handleChangeIndex = index => {
    setCurrentIndex(index);
  };
  return (
    <View style={{width: width, height: height, backgroundColor: 'black'}}>
      <Header />
      <FlatList
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        data={listReel}
        renderItem={({item, index}) => (
          <SingleReel item={item} index={index} currentIndex={currentIndex} />
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{
          width: '100%',
          height: listReel?.length ? height * listReel?.length - 80 : height,
        }}
      />
    </View>
  );
};

function Header() {
  const handleTurnOnCamera = async () => {
    const options = {mediaType: 'video'};
    const result = await launchCamera(options);
    console.log(result);
  };

  return (
    <View className="flex-1 absolute z-10 top-14 left-0 right-0 py-2 px-5">
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-white font-bold text-3xl">Reels</Text>
        <TouchableOpacity onPress={handleTurnOnCamera}>
          <Ionicons name="camera-outline" size={32} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ReelScreen;
