import { View, Text } from 'react-native';

export default function TestNativeWind() {
  return (
    <View className="flex-1 justify-center items-center bg-red-500 p-6">
      <Text className="text-white text-2xl font-bold mb-4">
        NativeWind Test
      </Text>
      <Text className="text-white text-lg">
        Red background with white text = NativeWind working!
      </Text>
    </View>
  );
}