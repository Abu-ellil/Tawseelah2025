import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loading = ({ 
  loading = true, 
  size = 'large', 
  color, 
  text, 
  style, 
  indicatorStyle,
  textStyle 
}) => {
  if (!loading) return null;

  return (
    <View 
      className="flex-1 flex items-center justify-center"
      style={style}
    >
      <ActivityIndicator 
        size={size}
        color={color}
        style={indicatorStyle}
      />
      {text && (
        <Text 
          className="mt-4 text-base"
          style={[
            { color: '#6B7280' }, // gray-500
            textStyle
          ]}
        >
          {text}
        </Text>
      )}
    </View>
  );
};

export default Loading;