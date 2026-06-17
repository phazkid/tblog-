import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { HookScreen } from "@/screens/HookScreen";
import { HowItWorksScreen } from "@/screens/HowItWorksScreen";
import { useAuth } from "@/context/AuthContext";

type OnboardingStep = "hook" | "how-it-works" | "auth-register" | "auth-login";

export default function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>("hook");
  const { isSignedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        {/* Loading state can be enhanced with spinner */}
      </View>
    );
  }

  const handleGetStarted = () => {
    setStep("how-it-works");
  };

  const handleHowItWorksNext = () => {
    setStep("auth-register");
  };

  const handleLoginPress = () => {
    setStep("auth-login");
  };

  return (
    <View className="flex-1 bg-background">
      {step === "hook" && (
        <HookScreen
          onGetStarted={handleGetStarted}
          onLoginPress={handleLoginPress}
        />
      )}
      {step === "how-it-works" && (
        <HowItWorksScreen onNext={handleHowItWorksNext} />
      )}
      {(step === "auth-register" || step === "auth-login") && (
        <AuthScreen
          initialTab={step === "auth-login" ? "login" : "register"}
        />
      )}
    </View>
  );
}
