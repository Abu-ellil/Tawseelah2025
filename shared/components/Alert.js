import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Alert = ({ 
  visible = false, 
  title, 
  message, 
  onClose, 
  onConfirm,
  confirmText = 'موافق',
  cancelText = 'إلغاء',
  variant = 'info', // 'info', 'success', 'warning', 'error'
  showCancelButton = true,
  style,
  contentStyle,
  titleStyle,
  messageStyle,
  buttonContainerStyle
}) => {
  if (!visible) return null;

  // تحديد الألوان حسب النوع
  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#ECFDF5', // green-50
          borderColor: '#A7F3D0', // green-200
          titleColor: '#065F46', // green-800
          textColor: '#065F46', // green-800
          confirmButtonColor: '#10B981', // green-500
        };
      case 'warning':
        return {
          backgroundColor: '#FFFBEB', // yellow-50
          borderColor: '#FDE68A', // yellow-200
          titleColor: '#92400E', // yellow-800
          textColor: '#92400E', // yellow-800
          confirmButtonColor: '#F59E0B', // amber-500
        };
      case 'error':
        return {
          backgroundColor: '#FEF2F2', // red-50
          borderColor: '#FECACA', // red-200
          titleColor: '#B91C1C', // red-800
          textColor: '#B91C1C', // red-800
          confirmButtonColor: '#EF4444', // red-500
        };
      case 'info':
      default:
        return {
          backgroundColor: '#EFF6FF', // blue-50
          borderColor: '#BFDBFE', // blue-200
          titleColor: '#1E40AF', // blue-800
          textColor: '#1E40AF', // blue-800
          confirmButtonColor: '#3B82F6', // blue-500
        };
    }
  };

  const colors = getVariantColors();

  return (
    <View className="absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View 
        className="w-4/5 rounded-xl p-6"
        style={[
          { 
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: 1
          },
          style
        ]}
      >
        {title && (
          <Text 
            className="text-lg font-bold mb-2 text-center"
            style={[
              { color: colors.titleColor },
              titleStyle
            ]}
          >
            {title}
          </Text>
        )}
        
        {message && (
          <Text 
            className="text-base mb-6 text-center"
            style={[
              { color: colors.textColor },
              messageStyle
            ]}
          >
            {message}
          </Text>
        )}
        
        <View className="flex-row justify-center" style={buttonContainerStyle}>
          {showCancelButton && (
            <TouchableOpacity 
              className="flex-1 py-3 rounded-lg mx-1"
              style={{ backgroundColor: '#E5E7EB' }} // gray-200
              onPress={onClose}
            >
              <Text className="text-center font-bold" style={{ color: '#374151' }}> {/* gray-700 */}
                {cancelText}
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            className="flex-1 py-3 rounded-lg mx-1"
            style={{ backgroundColor: colors.confirmButtonColor }}
            onPress={onConfirm}
          >
            <Text className="text-center font-bold text-white">
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Alert;