import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {signOut} from 'firebase/auth';
import {auth} from '../../../firebase-config';
import {useDispatch} from 'react-redux';
import {UserSlice} from '../../redux/UserSlice';
function Header({currentUser}) {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        console.log('successful');
        dispatch(UserSlice.actions.SET_CURRENT_USER(null));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View className="flex-row justify-between items-center p-3">
      {/* USERNAME */}
      <Text className="text-white font-bold text-2xl leading-6">
        {currentUser.username}
      </Text>

      {/* EXIT BUTTON */}
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Sign Out',
            'Are you sure ?',
            [
              {
                text: 'Yes',
                onPress: () => {
                  handleSignOut();
                },
              },
              {
                text: 'No',
              },
            ],
            {
              userInterfaceStyle: 'dark',
            },
          );
        }}>
        <Ionicons name="exit-outline" color="white" size={35} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
