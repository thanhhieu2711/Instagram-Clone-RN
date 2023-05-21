/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import NewPostScreen from './screens/NewPostScreen';
import ReelScreen from './screens/ReelScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './Stack/HomeStack';
import SearchStack from './Stack/SearchStack';
import {useSelector} from 'react-redux';
import {currentUserSelector} from './redux/Selectors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileStack from './Stack/ProfileStack';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const AppNavigator = () => {
  const currentUser = useSelector(currentUserSelector);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {currentUser ? (
          <Stack.Screen
            name="Main"
            currentUser={currentUser}
            component={MainStack}
          />
        ) : (
          <Stack.Screen name="Authen" component={AuthenStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function AuthenStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: 'false',
        }}
      />
    </Stack.Navigator>
  );
}

function MainStack() {
  const currentUser = useSelector(currentUserSelector);
  return (
    <BottomTab.Navigator
      initialRouteName="Home Bottom Tab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="Home Bottom Tab"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Octicons
              name="home"
              color={focused ? 'white' : 'grey'}
              size={31}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search Bottom Tab"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Octicons
              name="search"
              color={focused ? 'white' : 'grey'}
              size={32}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add Post Bottom Tab"
        component={NewPostScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#000000'},
          headerTintColor: 'white',
          headerTitle: 'New Post',
          headerShadowVisible: false,
          tabBarIcon: ({focused}) => (
            <Octicons
              name="diff-added"
              color={focused ? 'white' : 'grey'}
              size={31}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Reels Bottom Tab"
        component={ReelScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="clipboard-play-outline"
              color={focused ? 'white' : 'grey'}
              size={36}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile Bottom Tab"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                borderWidth: 2,
                borderColor: focused ? 'white' : 'transparent',
                borderRadius: 50,
              }}>
              <Image
                source={{
                  uri: currentUser?.profileImage,
                }}
                resizeMode="cover"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                }}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default AppNavigator;
