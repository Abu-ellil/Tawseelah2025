import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity } from 'react-native';

const Modal = ({ 
  visible, 
  onClose, 
  title, 
  children, 
  showCloseButton = true,
  modalStyle,
  contentStyle,
  headerStyle,
  titleStyle,
  closeButtonStyle,
  closeButtonTextStyle
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View 
          className="w-full max-w-md rounded-2xl shadow-lg"
          style={[
            { 
              backgroundColor: '#FFFFFF', // white
            },
            modalStyle
          ]}
        >
          {(title || showCloseButton) && (
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200" style={headerStyle}>
              {title && (
                <Text 
                  className="text-lg font-bold flex-1"
                  style={[
                    { color: '#1F2937' }, // gray-800
                    titleStyle
                  ]}
                >
                  {title}
                </Text>
              )}
              
              {showCloseButton && (
                <TouchableOpacity 
                  className="p-2 rounded-full"
                  style={[
                    { backgroundColor: '#F3F4F6' }, // gray-100
                    closeButtonStyle
                  ]}
                  onPress={onClose}
                >
                  <Text 
                    className="text-lg font-bold"
                    style={[
                      { color: '#6B7280' }, // gray-500
                      closeButtonTextStyle
                    ]}
                  >
                    ×
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          
          <View style={contentStyle}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;