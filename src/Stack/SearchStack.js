import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
      <Stack.Screen name="Post Detail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
