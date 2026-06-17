import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePassword, validateFullName } from "@/lib/utils";

interface AuthScreenProps {
  initialTab?: "login" | "register";
}

export function AuthScreen({ initialTab = "login" }: AuthScreenProps) {
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");

  // Register form
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerEmailError, setRegisterEmailError] = useState("");
  const [registerPasswordError, setRegisterPasswordError] = useState("");
  const [registerConfirmPasswordError, setRegisterConfirmPasswordError] = useState("");
  const [registerFullNameError, setRegisterFullNameError] = useState("");

  const { login, register } = useAuth();

  const handleLogin = async () => {
    // Clear errors
    setLoginEmailError("");
    setLoginPasswordError("");

    // Validate
    if (!validateEmail(loginEmail)) {
      setLoginEmailError("Please enter a valid email");
      return;
    }
    if (!loginPassword) {
      setLoginPasswordError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const result = await login(loginEmail, loginPassword);
      if (!result.success) {
        Alert.alert("Login Failed", result.error || "Please try again");
      }
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    // Clear errors
    setRegisterEmailError("");
    setRegisterPasswordError("");
    setRegisterConfirmPasswordError("");
    setRegisterFullNameError("");

    // Validate
    const nameError = validateFullName(registerFullName);
    if (nameError) {
      setRegisterFullNameError(nameError);
      return;
    }

    if (!validateEmail(registerEmail)) {
      setRegisterEmailError("Please enter a valid email");
      return;
    }

    const passwordError = validatePassword(registerPassword);
    if (passwordError) {
      setRegisterPasswordError(passwordError);
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterConfirmPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await register(registerEmail, registerPassword, registerFullName);
      if (!result.success) {
        Alert.alert("Registration Failed", result.error || "Please try again");
      }
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-between py-8">
          {/* Header */}
          <Animated.View entering={FadeIn.duration(600)} className="mb-8">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                <MaterialCommunityIcons name="bitcoin" size={24} color="#0f0f0f" />
              </View>
              <Text className="text-2xl font-bold text-foreground">FabsExchange</Text>
            </View>
            <Text className="text-sm text-neutral-light">
              Secure crypto trading in Naira
            </Text>
          </Animated.View>

          {/* Tab Switcher */}
          <Animated.View
            entering={SlideInUp.delay(100)}
            className="flex-row gap-2 mb-8 bg-neutral-dark p-1 rounded-lg"
          >
            <Button
              title="Login"
              onPress={() => setTab("login")}
              variant={tab === "login" ? "primary" : "outline"}
              size="md"
              className="flex-1"
            />
            <Button
              title="Register"
              onPress={() => setTab("register")}
              variant={tab === "register" ? "primary" : "outline"}
              size="md"
              className="flex-1"
            />
          </Animated.View>

          {/* Forms */}
          <Animated.View entering={SlideInUp.delay(200)} className="flex-1">
            {tab === "login" ? (
              <View className="gap-4">
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  keyboardType="email-address"
                  error={loginEmailError}
                />
                <TextInput
                  label="Password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  secureTextEntry
                  error={loginPasswordError}
                />
                <Text className="text-primary text-sm font-semibold mt-2 text-right">
                  Forgot Password?
                </Text>
              </View>
            ) : (
              <View className="gap-4">
                <TextInput
                  label="Full Name"
                  placeholder="John Doe"
                  value={registerFullName}
                  onChangeText={setRegisterFullName}
                  error={registerFullNameError}
                />
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChangeText={setRegisterEmail}
                  keyboardType="email-address"
                  error={registerEmailError}
                />
                <TextInput
                  label="Password"
                  placeholder="Create a strong password"
                  value={registerPassword}
                  onChangeText={setRegisterPassword}
                  secureTextEntry
                  error={registerPasswordError}
                />
                <TextInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={registerConfirmPassword}
                  onChangeText={setRegisterConfirmPassword}
                  secureTextEntry
                  error={registerConfirmPasswordError}
                />
              </View>
            )}
          </Animated.View>

          {/* CTA Button */}
          <Animated.View entering={SlideInUp.delay(400)} className="gap-4">
            <Button
              title={tab === "login" ? "Sign In" : "Create Account"}
              onPress={tab === "login" ? handleLogin : handleRegister}
              variant="primary"
              size="lg"
              loading={loading}
            />
            <Text className="text-neutral-light text-xs text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
