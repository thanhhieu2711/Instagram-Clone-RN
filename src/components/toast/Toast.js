/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  messageToastSelector,
  typeToastSelector,
  visibleToastSelector,
} from '../../redux/Selectors';

const Toast = () => {
  const isVisible = useSelector(visibleToastSelector);
  const message = useSelector(messageToastSelector);
  const type = useSelector(typeToastSelector);

  return (
    isVisible && (
      <View
        style={{
          backgroundColor: type ? 'green' : '#AF0404',
          position: 'absolute',
          bottom: 10,
          width: '100%',
          paddingVertical: 14,
          paddingHorizontal: 12,
          borderRadius: 5,
        }}>
        <Text
          className="font-bold text-base tracking-widest leading-5"
          style={{color: 'white'}}>
          {message}
        </Text>
      </View>
    )
  );
};

export default Toast;
