import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import PostCommentScreen from '../screens/PostCommentScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import PostLikeScreen from '../screens/PostLikeScreen';
import NewStoryScreen from '../screens/NewStoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Story"
        component={NewStoryScreen}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen name="Post Like" component={PostLikeScreen} />
      <Stack.Screen
        name="Post Comment"
        component={PostCommentScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="Post Detail" component={PostDetailScreen} />
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
