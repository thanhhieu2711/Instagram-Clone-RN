import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import PostCommentScreen from '../screens/PostCommentScreen';
import PostLikeScreen from '../screens/PostLikeScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="Post Detail"
        component={PostDetailScreen}
        options={
          {
            // presentation: 'fullScreenModal',
          }
        }
      />
      <Stack.Screen
        name="Post Comment"
        component={PostCommentScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Post Like"
        component={PostLikeScreen}
        // options={{
        //   presentation: 'modal',
        // }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
