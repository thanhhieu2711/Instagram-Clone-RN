import {SafeAreaView} from 'react-native';
import React from 'react';
import BoxSearch from '../components/search/BoxSearch';
import ListSearch from '../components/search/ListSearch';
import {useSelector} from 'react-redux';
import {currentUserSelector} from '../redux/Selectors';
const SearchScreen = () => {
  const currentUser = useSelector(currentUserSelector);
  return (
    <SafeAreaView className="flex-1 bg-black ">
      <BoxSearch />
      <ListSearch currentUser={currentUser} />
    </SafeAreaView>
  );
};

export default SearchScreen;
