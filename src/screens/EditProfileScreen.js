import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../firebase-config';
import {useDispatch} from 'react-redux';
import {UserSlice} from '../redux/UserSlice';
import {launchImageLibrary} from 'react-native-image-picker';
const EditProfileScreen = ({route}) => {
  const {currentUser} = route.params;
  const [name, setName] = useState(currentUser?.name);
  const [username, setUsername] = useState(currentUser?.username);
  const [pronouns, setPronouns] = useState(currentUser?.pronouns);
  const [bio, setBio] = useState(currentUser?.bio);
  const [avatar, setAvartar] = useState(currentUser.profileImage);

  const state = {
    name,
    setName,
    username,
    setUsername,
    pronouns,
    setPronouns,
    bio,
    setBio,
    avatar,
    setAvartar,
    uid: currentUser.uid,
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header state={state} />
      <AvatarUser state={state} />
      <InfoUser state={state} />
    </SafeAreaView>
  );
};

function Header({state}) {
  const {uid, bio, name, username, avatar} = state;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleEditProfile = async () => {
    setIsLoading(true);
    try {
      const userRef = await doc(db, 'users', uid);
      await updateDoc(userRef, {
        name: name,
        username: username,
        bio: bio,
        profileImage: avatar,
      });
      const userUpdated = await getDoc(userRef);
      userUpdated &&
        (await dispatch(
          UserSlice.actions.SET_CURRENT_USER(userUpdated.data()),
        ));
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <View className="flex-row items-center h-12 border-b-0.5 border-white/25">
      <Pressable
        className="w-20"
        onPress={() => {
          navigation.goBack();
        }}>
        <Text className="text-center text-lg font-medium text-white/95 leading-5">
          Cancel
        </Text>
      </Pressable>
      <View className="flex-1 items-center">
        <Text className="text-white font-bold text-lg leading-5">
          Edit profile
        </Text>
      </View>
      <Pressable className="w-20" onPress={handleEditProfile}>
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text className="text-center text-blue-500 font-bold text-lg leading-5">
            Done
          </Text>
        )}
      </Pressable>
    </View>
  );
}

function AvatarUser({state}) {
  const {avatar, setAvartar} = state;
  const pickImageFromGalery = async () => {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);
    if (result?.assets) {
      setAvartar(result?.assets[0]?.uri);
      return;
    }
  };

  return (
    <View className="h-44 items-center justify-center border-b-0.5 border-white/30">
      <View className="items-center space-y-3">
        <Image
          source={{uri: avatar}}
          resizeMode="cover"
          className="w-24 h-24 rounded-full"
        />
        <TouchableOpacity onPress={pickImageFromGalery}>
          <Text className="text-blue-500 font-bold text-base">
            Edit picture or avatar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoUser({state}) {
  const {
    name,
    setName,
    username,
    setUsername,
    pronouns,
    setPronouns,
    bio,
    setBio,
  } = state;

  return (
    <View className="px-3">
      {/* NAME */}
      <View className="flex-row h-14 items-center">
        <Text className="text-white w-28 text-lg leading-5 font-medium">
          Name
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          className="flex-1 text-white text-lg leading-5 font-medium h-full border-b-0.5 border-white/30"
          placeholder="Name"
          placeholderTextColor={'grey'}
        />
      </View>

      {/* USERNAME */}
      <View className="flex-row h-14 items-center">
        <Text className="text-white w-28 text-lg leading-5 font-medium">
          Username
        </Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          className="flex-1 text-white text-lg leading-5 font-medium h-full border-b-0.5 border-white/30"
          placeholder="Username"
          placeholderTextColor={'grey'}
        />
      </View>

      {/* PRONOUNS  */}
      <View className="flex-row h-14 items-center ">
        <Text className="text-white w-28 text-lg leading-5 font-medium">
          Pronouns
        </Text>
        <TextInput
          value={pronouns}
          onChangeText={setPronouns}
          autoCapitalize="none"
          className="flex-1 text-white text-lg leading-5 font-medium h-full border-b-0.5 border-white/30"
          placeholder="Pronouns"
          placeholderTextColor={'grey'}
        />
      </View>

      {/* BIO */}
      <View className="flex-row h-14 items-center border-b-0.5 border-white/30 ">
        <Text className="text-white w-28 text-lg leading-5 font-medium">
          Bio
        </Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          autoCapitalize="none"
          className="flex-1 text-white text-lg leading-5 font-medium h-full "
          placeholder="Bio"
          placeholderTextColor={'grey'}
        />
      </View>

      <TouchableOpacity className="flex-row h-14 items-center ">
        <Text className="text-blue-500  text-lg leading-5 font-medium">
          Personal information
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfileScreen;
