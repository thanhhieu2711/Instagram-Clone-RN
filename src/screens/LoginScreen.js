/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase-config';
import {useDispatch} from 'react-redux';
import {UserSlice} from '../redux/UserSlice';
import {collection} from '@firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../firebase-config';
import LoadingModal from '../Modal/LoadingModal';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const query = collection(db, 'users');
  const [docs] = useCollectionData(query);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // PASSED VALIDATE
    if (
      email.trim().length !== 0 &&
      !email.includes(' ') &&
      password.trim().length !== 0
    ) {
      try {
        setShowLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
          .then(async currentUser => {
            const currentUserRef = await docs.find(
              item => item.uid === currentUser.user.uid,
            );
            currentUser && setShowLoading(false);
            await dispatch(UserSlice.actions.SET_CURRENT_USER(currentUserRef));
          })
          .catch(error => {
            console.log(error.message);
            setShowLoading(false);
            Alert.alert('Login failed');
          });
      } catch (error) {
        console.log(error);
      }
    } else if (email.trim().length === 0 && !email && password) {
      Alert.alert(
        'Email or mobile number required',
        'Enter your email or mobile number to continue.',
      );
    } else if (password.trim().length === 0 && !password && email) {
      Alert.alert('Password required', 'Enter your password to continue.');
    } else {
      Alert.alert(
        'Email and password required',
        'Enter your email and password to continue.',
      );
    }
  };
  return (
    <LinearGradient
      colors={Colors.primaryColor}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      className="flex-1 items-center">
      {/* LOGO */}
      <View className=" w-48 h-16 mt-40 ">
        <Image
          source={require('../assets/textlogo_white.png')}
          resizeMode="contain"
          className="w-full h-full"
        />
      </View>

      {/* GROUP INPUT */}
      <View className="w-full items-center space-y-5 mt-10 ">
        {/* Email */}
        <View
          className="flex-row items-center justify-between space-x-2
         px-4 w-5/6 bg-gray-50/20 rounded-md">
          <TextInput
            value={email}
            onChangeText={setEmail}
            onFocus={() => {
              setFocusEmail(true);
            }}
            onBlur={() => {
              setFocusEmail(false);
            }}
            placeholder={focusEmail ? null : 'Email or mobile number'}
            placeholderTextColor={'lightgrey'}
            className="flex-1 py-6 text-lg leading-5 font-medium text-white"
            autoCapitalize="none"
          />
          {email ? (
            <TouchableOpacity
              onPress={() => {
                setEmail('');
              }}>
              <Ionicons name="close" size={28} color={'white'} />
            </TouchableOpacity>
          ) : null}
          {focusEmail || email ? (
            <Text
              style={{
                position: 'absolute',
                top: 2,
                left: 8,
                color: 'lightgrey',
                fontWeight: 600,
              }}>
              Email or mobile number
            </Text>
          ) : null}
        </View>

        {/* PASSWORD */}
        <View
          className="flex-row items-center justify-center space-x-4
       w-5/6 bg-gray-50/20 rounded-md px-4 ">
          <TextInput
            value={password}
            onChangeText={setPassword}
            onFocus={() => {
              setFocusPassword(true);
            }}
            onBlur={() => {
              setFocusPassword(false);
            }}
            placeholder={focusPassword ? null : 'Password'}
            placeholderTextColor={'lightgrey'}
            className="flex-1 py-6 text-lg leading-5 font-medium text-white"
            autoCapitalize="none"
            secureTextEntry={hidePassword}
          />
          {password ? (
            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}>
              {hidePassword ? (
                <Ionicons name="ios-eye-outline" size={26} color={'white'} />
              ) : (
                <Ionicons name="md-eye-off-outline" size={26} color={'white'} />
              )}
            </Pressable>
          ) : null}

          {focusPassword || password ? (
            <Text
              style={{
                position: 'absolute',
                top: 2,
                left: 0,
                color: 'lightgrey',
                fontWeight: 600,
              }}>
              Password
            </Text>
          ) : null}
        </View>
      </View>

      {/* BUTTON LOGIN */}
      <TouchableOpacity
        className="w-5/6 bg-white rounded-md items-center mt-5"
        onPress={handleLogin}>
        <Text className="text-pink-600 font-semibold py-4 text-lg leading-5 tracking-wide">
          Login
        </Text>
      </TouchableOpacity>

      {/* TEXT HELPER */}
      <View className="flex-row items-center mt-6">
        <Text className="text-white  text-sm">Forgot your login details? </Text>
        <TouchableOpacity>
          <Text className="text-white font-medium text-sm underline">
            Get help signing in.
          </Text>
        </TouchableOpacity>
      </View>

      {/* LINE SEPERATE */}
      <View className="w-5/6 flex-row items-center my-10 ">
        <View style={{flex: 1, height: 0.5, backgroundColor: 'white'}}></View>
        <Text className=" text-white/70 px-2 font-medium leading-5">Or</Text>
        <View style={{flex: 1, height: 0.5, backgroundColor: 'white'}}></View>
      </View>

      {/* BUTTON LOGIN WITH FACEBOOK */}
      <TouchableOpacity
        className=" w-5/6
    flex-row items-center justify-center space-x-2 ">
        <Ionicons name="ios-logo-facebook" color={'white'} size={24} />
        <Text
          className="text-white text-lg font-semibold
       leading-5 tracking-wide underline">
          Login with Facebook
        </Text>
      </TouchableOpacity>

      {/* CREATE NEW ACCOUNT */}
      <View className="flex-1 mb-6 w-full items-center justify-end">
        <TouchableOpacity
          className="w-5/6 py-4 rounded-md items-center 
      border border-white"
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text className="text-white text-lg leading-5 font-semibold">
            Create new account
          </Text>
        </TouchableOpacity>
        <View className="w-20 h-8 mt-4">
          <Image
            source={{
              uri: 'https://www.citypng.com/public/uploads/small/11640344612dld2zxme2wo06d5tycstmtr5wd5ka5xkw95yyifgxyzoqcw5lfc8hyjc7rkl0hzykywrw10ibe6vbd4ovrwrlfkwokcgn9fxqs5g.png',
            }}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
      </View>

      {showLoading && <LoadingModal />}
    </LinearGradient>
  );
};

export default LoginScreen;
