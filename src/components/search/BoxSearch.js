/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import {UserSlice} from '../../redux/UserSlice';
const BoxSearch = () => {
  const [searchData, setSearchData] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserSlice.actions.SET_SEARCH_USER(searchData));
  }, [searchData]);

  return (
    <View className="flex-row items-center">
      <View className="flex-1 flex-row items-center bg-white/5 px-4 py-4 mt-5 space-x-4 rounded-lg">
        <Octicons name="search" color={'gray'} size={24} />
        <TextInput
          value={searchData}
          onChangeText={setSearchData}
          focusable={isFocus}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          className="flex-1 text-base font-medium leading-5 text-white"
          placeholder="Search here..."
          placeholderTextColor={'gray'}
          autoCapitalize="none"></TextInput>
        <TouchableOpacity
          onPress={() => {
            setSearchData('');
            setIsFocus(false);
          }}>
          {searchData && (
            <Text className="text-white text-sm font-bold">Cancel</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoxSearch;
