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
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { useTheme } from "../../theme/ThemeContext";

const RegisterScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [authMethod, setAuthMethod] = useState("email"); // email, phone, social
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleRegister = async () => {
    // التحقق من البيانات الأساسية
    if (!name) {
      Alert.alert("خطأ", "الاسم مطلوب");
      return;
    }

    let identifier = authMethod === "email" ? email : phone;
    if (!identifier) {
      Alert.alert("خطأ", `يرجى إدخال ${authMethod === "email" ? "البريد الإلكتروني" : "رقم الهاتف"}`);
      return;
    }

    if (!password) {
      Alert.alert("خطأ", "كلمة المرور مطلوبة");
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

    setLoading(true);

    try {
      // استدعاء API التسجيل المتقدم
      const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          [authMethod]: identifier,
          password,
          authProvider: authMethod
        }),
      });

      const data = await response.json();

      if (data.success) {
        // تسجيل الدخول التلقائي بعد التسجيل
        dispatch(loginSuccess({
          user: data.data,
          token: data.token,
        }));

        Alert.alert(
          "نجح التسجيل", 
          data.message || "تم إنشاء الحساب بنجاح",
          [{ text: "موافق", onPress: () => router.replace("/home") }]
        );
      } else {
        Alert.alert("خطأ", data.message || "حدث خطأ أثناء إنشاء الحساب");
      }
    } catch (err) {
      Alert.alert("خطأ", "حدث خطأ أثناء محاولة إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    // هنا سيتم تطبيق منطق التسجيل الاجتماعي
    // هذا مثال توضيحي
    Alert.alert(
      "التسجيل الاجتماعي", 
      `سيتم تطبيق التسجيل بـ ${provider} في النسخة النهائية`
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
                اختر طريقة إنشاء الحساب
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
                <Text style={{ color: colors.text }}>📧 إنشاء حساب بالبريد الإلكتروني</Text>
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
                <Text style={{ color: colors.text }}>📱 إنشاء حساب برقم الهاتف</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSocialRegister("google")}
              >
                <Text style={{ color: colors.text }}>🔗 إنشاء حساب بـ Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSocialRegister("facebook")}
              >
                <Text style={{ color: colors.text }}>👍 إنشاء حساب بـ Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.authOption,
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSocialRegister("apple")}
              >
                <Text style={{ color: colors.text }}>🍎 إنشاء حساب بـ Apple</Text>
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
        <View className="items-center mb-8">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-20 h-20 rounded-full mb-2"
          />
          <Text className="text-2xl font-bold" style={{ color: colors.primary }}>
            توصيلة
          </Text>
          <Text style={{ color: colors.placeholder }}>إنشاء حساب جديد</Text>
        </View>

        {/* اختيار طريقة إنشاء الحساب */}
        <TouchableOpacity
          className="flex-row items-center justify-between p-4 rounded-xl mb-6 border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
          onPress={() => setShowAuthModal(true)}
        >
          <Text style={{ color: colors.text }}>
            {authMethod === "email" ? "📧 إنشاء حساب بالبريد الإلكتروني" :
             authMethod === "phone" ? "📱 إنشاء حساب برقم الهاتف" :
             "🔗 إنشاء حساب بالمصادقة الاجتماعية"}
          </Text>
          <Text style={{ color: colors.placeholder }}>▼</Text>
        </TouchableOpacity>

        {/* نموذج التسجيل */}
        <View>
          <Text
            className="text-lg font-medium mb-2"
            style={{ color: colors.text }}
          >
            الاسم الكامل *
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
            {authMethod === "email" ? "البريد الإلكتروني *" : "رقم الهاتف *"}
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

          {authMethod !== "social" && (
            <>
              <Text
                className="text-lg font-medium mb-2"
                style={{ color: colors.text }}
              >
                كلمة المرور *
              </Text>
              <TextInput
                className="p-4 rounded-xl mb-4 border"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                }}
                placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Text
                className="text-lg font-medium mb-2"
                style={{ color: colors.text }}
              >
                تأكيد كلمة المرور *
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
            </>
          )}

          <TouchableOpacity
            className="w-full py-4 rounded-xl items-center mb-6"
            style={{ backgroundColor: colors.primary }}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <Text className="text-white font-bold">جاري الإنشاء...</Text>
            ) : (
              <Text className="text-white font-bold text-lg">إنشاء الحساب</Text>
            )}
          </TouchableOpacity>

          {/* التسجيل الاجتماعي السريع */}
          <View className="mb-6">
            <Text className="text-center mb-3" style={{ color: colors.placeholder }}>
              أو أنشئ حسابك بواسطة
            </Text>
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "#4285F4" }}
                onPress={() => handleSocialRegister("google")}
              >
                <Text className="text-white text-lg">G</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "#1877F2" }}
                onPress={() => handleSocialRegister("facebook")}
              >
                <Text className="text-white text-lg">f</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "#000000" }}
                onPress={() => handleSocialRegister("apple")}
              >
                <Text className="text-white text-lg">🍎</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* رابط تسجيل الدخول */}
          <TouchableOpacity
            className="w-full py-3 rounded-xl items-center border"
            style={{ borderColor: colors.primary, borderWidth: 1 }}
            onPress={() => router.back()}
          >
            <Text className="text-primary font-bold">تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>

        {/* شروط الخدمة */}
        <View className="mt-8 items-center">
          <Text style={{ color: colors.placeholder, textAlign: "center", fontSize: 12 }}>
            بإنشاء حساب، أنت توافق على{' '}
            <Text style={{ color: colors.primary }}>شروط الخدمة</Text>
            {' '}و{' '}
            <Text style={{ color: colors.primary }}>سياسة الخصوصية</Text>
          </Text>
        </View>
      </View>

      {/* نافذة اختيار طريقة إنشاء الحساب */}
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

export default RegisterScreen;
