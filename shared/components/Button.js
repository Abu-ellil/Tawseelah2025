import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  loading = false, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  style,
  textStyle 
}) => {
  // تحديد الألوان حسب النوع
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#9CA3AF' : '#4F46E5', // indigo-600
          textColor: 'white',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? '#D1D5DB' : '#7C3AED', // violet-600
          textColor: 'white',
        };
      case 'success':
        return {
          backgroundColor: disabled ? '#9CA3AF' : '#10B981', // emerald-500
          textColor: 'white',
        };
      case 'danger':
        return {
          backgroundColor: disabled ? '#9CA3AF' : '#EF4444', // red-500
          textColor: 'white',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: '#4F46E5',
          borderWidth: 1,
          textColor: disabled ? '#9CA3AF' : '#4F46E5',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          textColor: disabled ? '#9CA3AF' : '#4F46E5',
        };
      default:
        return {
          backgroundColor: disabled ? '#9CA3AF' : '#4F46E5',
          textColor: 'white',
        };
    }
  };

  // تحديد الحجم
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 };
      case 'large':
        return { paddingHorizontal: 24, paddingVertical: 16, borderRadius: 12 };
      default:
        return { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth,
          alignItems: 'center',
          justifyContent: 'center',
          ...sizeStyles,
        },
        style,
        disabled && { opacity: 0.6 }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.textColor} />
      ) : (
        <Text
          style={[
            {
              color: variantStyles.textColor,
              fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
              fontWeight: '600',
            },
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;