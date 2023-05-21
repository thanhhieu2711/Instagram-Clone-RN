import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import React from 'react';
import Header from '../components/notification/Header';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {collection, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase-config';
import {useSelector} from 'react-redux';
import {listUserSelector} from '../redux/Selectors';

const NotificationScreen = ({route}) => {
  const {currentUser} = route.params;
  const listUser = useSelector(listUserSelector);
  const [listNotification] = useCollectionData(
    query(
      collection(db, 'users', currentUser?.uid, 'notifications'),
      orderBy('create_at', 'desc'),
    ),
  );

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <Header />
      <ScrollView className="flex-1 mt-5 space-y-5">
        {listNotification?.map(item => {
          const sender = listUser?.find(item => {
            let search = listNotification?.find(
              user => user.uid === item.sender,
            );
            return search;
          });
          console.log(sender);
          return (
            <View
              key={item.notification_id}
              className=" flex-row items-center space-x-3 px-2">
              <View className="h-12 w-12 ">
                <Image
                  source={{uri: sender?.profileImage}}
                  resizeMode="cover"
                  className="w-full h-full rounded-full"
                />
              </View>
              <View className=" flex-1 text-justify">
                <Text className="font-bold text-white text-lg leading-5">
                  {sender.username}{' '}
                  <Text className="font-medium">
                    {item.content} . <Text className="text-white/70 ">3s</Text>
                  </Text>
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
