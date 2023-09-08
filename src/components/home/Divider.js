/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {View} from 'react-native';
import React from 'react';

const Divider = ({color, height}) => {
  return (
    <View
      style={{
        height: height,
        width: '100%',
        backgroundColor: color,
        marginVertical: 15,
      }}></View>
  );
};

export default Divider;
