import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";
import { useTheme } from "../../theme/ThemeContext";

const LoginScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [authMethod, setAuthMethod] = useState("email"); // email, phone, social
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = async () => {
    let identifier = authMethod === "email" ? email : phone;
    
    if (!identifier || !password) {
      Alert.alert("خطأ", "الرجاء ملء جميع الحقول");
      return;
    }

    // بدء عملية تسجيل الدخول
    dispatch(loginStart());

    try {
      // استدعاء API المصادقة المتقدم
      const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [authMethod]: identifier,
          password,
          authProvider: authMethod
        }),
      });

      const data = await response.json();

      if (data.success) {
        // نجاح تسجيل الدخول
        dispatch(loginSuccess({
          user: data.data,
          token: data.token,
        }));

        // الانتقال إلى الشاشة الرئيسية
        router.replace("/home");
      } else {
        // فشل تسجيل الدخول
        dispatch(loginFailure(data.message || 'حدث خطأ أثناء تسجيل الدخول'));
        Alert.alert("خطأ", data.message || 'بيانات الاعتماد غير صحيحة');
      }
    } catch (err) {
      // خطأ في العملية
      dispatch(loginFailure(err.message));
      Alert.alert("خطأ", "حدث خطأ أثناء محاولة تسجيل الدخول");
    }
  };

  const handleSocialLogin = async (provider) => {
    // هنا سيتم تطبيق منطق المصادقة الاجتماعية
    // هذا مثال توضيحي
    Alert.alert(
      "المصادقة الاجتماعية", 
      `سيتم تطبيق تسجيل الدخول بـ ${provider} في النسخة النهائية`
    );
    setShowAuthModal(false);
  };

  const renderAuthOptions = () => (
    <Modal
      visible={showAuthModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowAuthModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowAuthModal(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View 
              style={[
                styles.modalContent, 
                { backgroundColor: colors.card }
              ]}
            >
              <Text 
                style={[
                  styles.modalTitle, 
                  { color: colors.text }
                ]}
              >
                اختر طريقة المصادقة
              </Text>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => {
                  setAuthMethod("email");
                  setShowAuthModal(false);
                }}
              >
                <Text style={{ color: colors.text }}>📧 تسجيل بالبريد الإلكتروني</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => {
                  setAuthMethod("phone");
                  setShowAuthModal(false);
                }}
              >
                <Text style={{ color: colors.text }}>📱 تسجيل برقم الهاتف</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSocialLogin("google")}
              >
                <Text style={{ color: colors.text }}>🔗 تسجيل بـ Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSocialLogin("facebook")}
              >
                <Text style={{ color: colors.text }}>👍 تسجيل بـ Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSocialLogin("apple")}
              >
                <Text style={{ color: colors.text }}>🍎 تسجيل بـ Apple</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { backgroundColor: colors.primary }
                ]}
                onPress={() => setShowAuthModal(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-10">
        {/* شعار التطبيق */}
        <View className="items-center mb-10">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-3xl font-bold" style={{ color: colors.primary }}>
            توصيلة
          </Text>
          <Text style={{ color: colors.placeholder }}>مرحباً بك مرة أخرى!</Text>
        </View>

        {/* اختيار طريقة المصادقة */}
        <TouchableOpacity
          className="flex-row items-center justify-between p-4 rounded-xl mb-6 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
          onPress={() => setShowAuthModal(true)}
        >
          <Text style={{ color: colors.text }}>
            {authMethod === "email" ? "📧 تسجيل بالبريد الإلكتروني" :
             authMethod === "phone" ? "📱 تسجيل برقم الهاتف" :
             "🔗 تسجيل بالمصادقة الاجتماعية"}
          </Text>
          <Text style={{ color: colors.placeholder }}>▼</Text>
        </TouchableOpacity>

        {/* نموذج تسجيل الدخول */}
        <View>
          <Text
            className="text-lg font-medium mb-2"
            style={{ color: colors.text }}
          >
            {authMethod === "email" ? "البريد الإلكتروني" : "رقم الهاتف"}
          </Text>
          <TextInput
            className="p-4 rounded-xl mb-4 border"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text,
            }}
            placeholder={authMethod === "email" ? "أدخل بريدك الإلكتروني" : "أدخل رقم هاتفك"}
            placeholderTextColor={colors.placeholder}
            value={authMethod === "email" ? email : phone}
            onChangeText={authMethod === "email" ? setEmail : setPhone}
            keyboardType={authMethod === "email" ? "email-address" : "phone-pad"}
            autoCapitalize="none"
          />

          <Text
            className="text-lg font-medium mb-2"
            style={{ color: colors.text }}
          >
            كلمة المرور
          </Text>
          <TextInput
            className="p-4 rounded-xl mb-6 border"
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

          {error ? (
            <View className="bg-red-100 p-3 rounded-xl mb-4">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            className="w-full py-4 rounded-xl items-center mb-4"
            style={{ backgroundColor: colors.primary }}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <Text className="text-white font-bold">جاري التحميل...</Text>
            ) : (
              <Text className="text-white font-bold text-lg">تسجيل الدخول</Text>
            )}
          </TouchableOpacity>

          {/* مصادقة اجتماعية سريعة */}
          <View className="mb-4">
            <Text className="text-center mb-3" style={{ color: colors.placeholder }}>
              أو سجل دخولك بواسطة
            </Text>
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "#4285F4" }}
                onPress={() => handleSocialLogin("google")}
              >
                <Text className="text-white text-lg">G</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "#1877F2" }}
                onPress={() => handleSocialLogin("facebook")}
              >
                <Text className="text-white text-lg">f</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "#000000" }}
                onPress={() => handleSocialLogin("apple")}
              >
                <Text className="text-white text-lg">🍎</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* رابط إنشاء حساب */}
          <TouchableOpacity
            className="w-full py-3 rounded-xl items-center mb-4 border"
            style={{ borderColor: colors.primary, borderWidth: 1 }}
            onPress={() => router.push("/register")}
          >
            <Text className="text-primary font-bold">إنشاء حساب جديد</Text>
          </TouchableOpacity>

          {/* رابط استعادة كلمة المرور */}
          <TouchableOpacity
            className="items-center mb-6"
            onPress={() =>
              Alert.alert(
                "استعادة كلمة المرور",
                authMethod === "email" ? 
                  "سيتم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني" :
                  "سيتم إرسال رمز التحقق إلى رقم هاتفك"
              )
            }
          >
            <Text className="text-primary">
              نسيت كلمة المرور؟
            </Text>
          </TouchableOpacity>
        </View>

        {/* رابط إنشاء حساب في الأسفل */}
        <View className="items-center mt-6">
          <Text style={{ color: colors.placeholder }}>لا تمتلك حساب؟</Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-primary font-bold mt-1">إنشاء حساب جديد</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* نافذة اختيار طريقة المصادقة */}
      {renderAuthOptions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  authOption: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
