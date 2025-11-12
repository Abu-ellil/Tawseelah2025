import React from 'react';
import { View, Text } from 'react-native';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  style, 
  contentStyle,
  headerStyle,
  titleStyle,
  subtitleStyle
}) => {
  return (
    <View 
      className="rounded-2xl shadow-sm"
      style={[
        { 
          backgroundColor: '#FFFFFF', // white
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 3,
        },
        style
      ]}
    >
      {(title || subtitle) && (
        <View className="p-4 border-b border-gray-100" style={headerStyle}>
          {title && (
            <Text 
              className="text-lg font-bold"
              style={[
                { color: '#1F2937' }, // gray-800
                titleStyle
              ]}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text 
              className="text-sm mt-1"
              style={[
                { color: '#6B7280' }, // gray-500
                subtitleStyle
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
      
      <View className="p-4" style={contentStyle}>
        {children}
      </View>
    </View>
  );
};

export default Card;