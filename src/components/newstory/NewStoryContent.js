/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
import {useEffect, useState} from 'react';
import {currentUserSelector} from '../../redux/Selectors';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

function NewStoryContent({imagePicker}) {
  return (
    <View className="flex-1 ">
      {imagePicker && (
        <Image
          className="w-full h-full"
          resizeMode="cover"
          source={{uri: imagePicker}}
        />
      )}
    </View>
  );
}
export default NewStoryContent;
