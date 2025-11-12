import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  error, 
  secureTextEntry = false, 
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  labelStyle,
  errorStyle
}) => {
  return (
    <View className="w-full mb-4" style={style}>
      {label && (
        <Text className="text-base font-medium mb-2" style={labelStyle}>
          {label}
        </Text>
      )}
      
      <TextInput
        className={`rounded-xl border px-4 py-3 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#9CA3AF" // gray-400
      />
      
      {error && (
        <Text className="text-red-500 text-sm mt-1" style={errorStyle}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;