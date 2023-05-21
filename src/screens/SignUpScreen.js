/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth} from '../../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from '../../firebase-config';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import LoadingModal from '../Modal/LoadingModal';
import {defaultImage} from '../assets/defaultImage';
const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const regexGmail = /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/g;
  const checkEmail = regexGmail.test(email);

  const addUser = async userCredential => {
    try {
      const docRef = doc(db, 'users', userCredential.user.uid);
      const data = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: '',
        username: username,
        profileImage: defaultImage,
        createAt: serverTimestamp(),
        bio: '',
        following: [],
        followers: [],
        postsSaved: [],
      };
      await setDoc(docRef, data);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowLoading(false);
      Alert.alert(
        'Successfully',
        '',
        [
          {
            text: 'Cancel',
            isPreferred: true,
          },
          {
            text: 'Login now',
            isPreferred: true,
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        {
          userInterfaceStyle: 'dark',
        },
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignup = async () => {
    if (checkEmail === false && email.trim().length === 0) {
      Alert.alert('Email required', 'Enter your first name to continue.');
    } else if (checkEmail === false) {
      Alert.alert('Email invalid');
    } else if (username.trim().length === 0) {
      Alert.alert('First name required', 'Enter your first name to continue.');
    } else if (password.trim().length === 0) {
      Alert.alert('Password required', 'Enter your password to continue.');
    } else if (password.length < 6 && password.length > 18) {
      Alert.alert('Password must be than 8 characters');
    } else if (password.includes(' ')) {
      Alert.alert("Password isn't included space");
    } else if (confirmPassword !== password) {
      Alert.alert('Confirm password is not matched');
    } else {
      try {
        setShowLoading(true);
        await createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            addUser(userCredential);
          })
          .catch(error => {
            console.log(error);
            setShowLoading(false);
            Alert.alert(
              'Email already in use ',
              'You can use other email to continue!',
            );
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LinearGradient
      colors={Colors.primaryColor}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      className="flex-1 items-center pt-28">
      {/* BACK BUTTON */}
      <TouchableOpacity
        className="absolute top-10 left-8"
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="ios-chevron-back" size={32} color={'white'}></Ionicons>
        {/* arrow-back */}
      </TouchableOpacity>

      {/* TITLE */}
      <View className="w-5/6 space-y-3">
        <Text className="text-4xl font-bold text-white">Sign Up</Text>
        <Text className="text-white text-base font-semibold">
          Enter the email where you can be contacted. No one will see this on
          your profile
        </Text>
      </View>

      {/* GROUP INPUT */}
      <View className="w-full items-center space-y-5 mt-10 ">
        {/* Email */}
        <View className="w-5/6 bg-gray-50/20 rounded-md">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={'lightgrey'}
            className="px-4 py-6 text-lg leading-5 font-medium text-white"
            autoCapitalize="none"
          />
        </View>

        {/* USERNAME */}
        <View className="w-5/6 bg-gray-50/20 rounded-md">
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={'lightgrey'}
            className="px-4 py-6 text-lg leading-5 font-medium text-white"
            autoCapitalize="none"
          />
        </View>

        {/* PASSWORD */}
        <View
          className="flex-row items-center justify-center space-x-4
         w-5/6 bg-gray-50/20 rounded-md px-4 ">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={'lightgrey'}
            className="flex-1 py-6 text-lg leading-5 font-medium text-white"
            autoCapitalize="none"
            secureTextEntry={hidePassword}
          />
          <Pressable
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            {password ? (
              hidePassword ? (
                <Ionicons name="ios-eye-outline" size={26} color={'white'} />
              ) : (
                <Ionicons name="md-eye-off-outline" size={26} color={'white'} />
              )
            ) : null}
          </Pressable>

          {/* <Ionicons name="md-eye-off-outline" size={26} color={'white'} /> */}
        </View>

        {/* CONFIRN PASSWORD */}
        <View
          className="flex-row items-center justify-center space-x-4
         w-5/6 bg-gray-50/20 rounded-md px-4 ">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor={'lightgrey'}
            className="flex-1 py-6 text-lg leading-5 font-medium text-white"
            autoCapitalize="none"
            secureTextEntry={hideConfirmPassword}
          />
          <Pressable
            onPress={() => {
              setHideConfirmPassword(!hideConfirmPassword);
            }}>
            {confirmPassword ? (
              hideConfirmPassword ? (
                <Ionicons name="ios-eye-outline" size={26} color={'white'} />
              ) : (
                <Ionicons name="md-eye-off-outline" size={26} color={'white'} />
              )
            ) : null}
          </Pressable>

          {/* <Ionicons name="md-eye-off-outline" size={26} color={'white'} /> */}
        </View>
      </View>

      {/* BUTTON Sign Up */}
      <TouchableOpacity
        className="w-5/6 bg-white rounded-md items-center mt-5"
        onPress={handleSignup}>
        <Text className="text-pink-600 font-semibold py-4 text-lg leading-5">
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* TEXT HELPER */}
      <View className="flex-row items-center mt-7">
        <Text className="text-white  text-base">
          Already you had an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text className="text-white font-medium text-base underline">
            Login here.
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGO BOTTOM */}
      <View className="w-20 h-20 absolute bottom-0">
        <Image
          source={{
            uri: 'https://www.citypng.com/public/uploads/small/11640344612dld2zxme2wo06d5tycstmtr5wd5ka5xkw95yyifgxyzoqcw5lfc8hyjc7rkl0hzykywrw10ibe6vbd4ovrwrlfkwokcgn9fxqs5g.png',
          }}
          resizeMode="contain"
          className="w-full h-full"
        />
      </View>
      {showLoading && <LoadingModal />}
    </LinearGradient>
  );
};

export default SignUpScreen;
