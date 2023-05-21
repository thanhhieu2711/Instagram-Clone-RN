import {View, Text, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const NewPostOptions = () => {
  return (
    <View className="flex-1 mt-4">
      <TagPeople />
      <AddLocation />
      <AdvancedSettings />
    </View>
  );
};

function TagPeople() {
  return (
    <Pressable
      className="flex-row justify-between items-center 
    px-2  py-4 border-t-0.5  border-gray-500">
      <Text className="text-xl font-medium leading-5 text-white/90">
        Tag people
      </Text>
      <MaterialIcons name="keyboard-arrow-right" color={'gray'} size={34} />
    </Pressable>
  );
}

function AddLocation() {
  return (
    <Pressable
      className="flex-row justify-between items-center 
      px-2  py-4 border-t-0.5  border-gray-500">
      <Text className="text-xl font-medium leading-5 text-white/90">
        Add location
      </Text>
      <MaterialIcons name="keyboard-arrow-right" color={'gray'} size={34} />
    </Pressable>
  );
}

function AdvancedSettings() {
  return (
    <Pressable
      className="flex-row justify-between items-center 
      px-2 py-4 border-t-0.5  border-gray-500">
      <Text className="text-xl font-medium leading-5 text-white/90">
        Advanced settings
      </Text>
      <MaterialIcons name="keyboard-arrow-right" color={'gray'} size={34} />
    </Pressable>
  );
}

export default NewPostOptions;
