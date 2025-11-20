import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { useTheme } from "../../theme/ThemeContext";

// Mock data
import { mockRegister } from "../../utils/mockData";

const RegisterScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("خطأ", "الرجاء ملء جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("خطأ", "كلمة المرور غير مطابقة");
      return;
    }

    if (password.length < 6) {
      Alert.alert("خطأ", "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    try {
      // في تطبيق حقيقي، سيتم استدعاء API لتسجيل المستخدم
      const response = await mockRegister({ name, email, phone, password });

      if (response.success) {
        // تسجيل الدخول التلقائي بعد التسجيل
        dispatch(
          loginSuccess({
            user: response.user,
            token: response.token,
          })
        );

        // الانتقال إلى الشاشة الرئيسية
        router.replace("/home");
      } else {
        Alert.alert("خطأ", response.message);
      }
    } catch (err) {
      Alert.alert("خطأ", "حدث خطأ أثناء محاولة إنشاء الحساب");
    }
  };

  return (
    <View
      className="flex-1 justify-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* شعار التطبيق */}
      <View className="items-center mb-6">
        <Image
          source={require("../../../assets/logo.png")}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-2xl font-bold" style={{ color: colors.primary }}>
          توصيلة
        </Text>
        <Text style={{ color: colors.placeholder }}>إنشاء حساب جديد</Text>
      </View>

      {/* نموذج التسجيل */}
      <View>
        <Text
          className="text-lg font-medium mb-2"
          style={{ color: colors.text }}
        >
          الاسم الكامل
        </Text>
        <TextInput
          className="p-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          }}
          placeholder="أدخل اسمك الكامل"
          placeholderTextColor={colors.placeholder}
          value={name}
          onChangeText={setName}
        />

        <Text
          className="text-lg font-medium mb-2"
          style={{ color: colors.text }}
        >
          البريد الإلكتروني
        </Text>
        <TextInput
          className="p-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          }}
          placeholder="أدخل بريدك الإلكتروني"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text
          className="text-lg font-medium mb-2"
          style={{ color: colors.text }}
        >
          رقم الهاتف
        </Text>
        <TextInput
          className="p-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          }}
          placeholder="أدخل رقم هاتفك"
          placeholderTextColor={colors.placeholder}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text
          className="text-lg font-medium mb-2"
          style={{ color: colors.text }}
        >
          كلمة المرور
        </Text>
        <TextInput
          className="p-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          }}
          placeholder="أدخل كلمة المرور"
          placeholderTextColor={colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text
          className="text-lg font-medium mb-2"
          style={{ color: colors.text }}
        >
          تأكيد كلمة المرور
        </Text>
        <TextInput
          className="p-4 rounded-xl mb-6 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          }}
          placeholder="أعد إدخال كلمة المرور"
          placeholderTextColor={colors.placeholder}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="w-full py-4 rounded-xl items-center mb-4"
          style={{ backgroundColor: colors.primary }}
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-lg">إنشاء الحساب</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full py-3 rounded-xl items-center border"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
          onPress={() => router.back()}
        >
          <Text className="text-primary font-bold">تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>

      {/* شروط الخدمة */}
      <View className="mt-6 items-center">
        <Text style={{ color: colors.placeholder, textAlign: "center" }}>
          بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
