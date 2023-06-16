/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const SingleReel = ({item, index, currentIndex}) => {
  const {width, height} = useWindowDimensions();
  const [mute, setMute] = useState(false);
  const [active, setActive] = useState(false);
  const videoPlayer = useRef();
  const handleActive = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 500);
  };

  return (
    <View style={{width: width, height: height - 80}} className="relative">
      <Pressable
        onPress={() => {
          setMute(!mute);
          handleActive();
        }}>
        <Video
          ref={ref => (videoPlayer.current = ref)}
          source={item.video}
          className="w-full h-full"
          resizeMode="cover"
          repeat={true}
          pause={false}
          mute={mute}
        />
      </Pressable>
      <ReelInfo item={item} />
      <ReelWidget item={item} />
      {active ? <Mute mute={mute} /> : null}
    </View>
  );
};

function ReelInfo({item}) {
  return (
    <View className="absolute w-72 h-30 bottom-0 p-5 space-y-3">
      {/* IMAGE AND NAME USER */}
      <View className="flex-row space-x-3 items-center">
        <View className="w-10 h-10 rounded-full bg-white"></View>
        <Text className="text-white font-bold text-lg">{item.username}</Text>
      </View>

      {/* CAPTION */}
      <Text numberOfLines={1} className="text-white font-medium text-lg">
        {item.description}
      </Text>

      {/* SOUND */}
      <View className="flex-row space-x-1 items-center">
        <Ionicons name="musical-note" size={20} color="white" />
        <Text className="text-white font-medium text-base">Original sound</Text>
      </View>
    </View>
  );
}

function ReelWidget({item}) {
  return (
    <View className=" px-4 py-14 absolute right-0 bottom-0 justify-center ">
      <View className="items-center space-y-8">
        <TouchableOpacity
          className="space-y-1.5"
          onPress={() => {
            console.log(item);
          }}>
          <Ionicons name="ios-heart-outline" size={38} color="white" />
          <Text className="text-white font-bold tracking-wide">100</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="chatbubble-outline" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="md-paper-plane-outline" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Mute({mute}) {
  return (
    <View className="absolute top-0 right-0 bottom-0 left-0 items-center justify-center">
      <View className="w-20 h-20 bg-black/70 rounded-full items-center justify-center">
        <Ionicons
          name={mute ? 'ios-volume-mute-sharp' : 'ios-volume-medium-sharp'}
          color="white"
          size={30}
        />
      </View>
    </View>
  );
}

export default SingleReel;
