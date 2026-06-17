import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-8">
        {/* Welcome Section */}
        <Animated.View entering={FadeIn.duration(600)} className="mb-8">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user?.fullName}! 👋
          </Text>
          <Text className="text-neutral-light text-base">
            Dashboard coming soon. Your trading experience awaits!
          </Text>
        </Animated.View>

        {/* Info Card */}
        <Animated.View
          entering={SlideInUp.delay(200)}
          className="bg-neutral-dark rounded-2xl p-6 mb-8"
        >
          <View className="flex-row items-center gap-3 mb-3">
            <MaterialCommunityIcons name="information" size={20} color="#FBBF24" />
            <Text className="text-accent font-semibold">Account Created</Text>
          </View>
          <Text className="text-foreground text-sm leading-5">
            Your account has been successfully set up. Features like trading, wallets, and transactions will be available soon.
          </Text>
          <Text className="text-neutral-light text-xs mt-3">
            Email: {user?.email}
          </Text>
        </Animated.View>

        {/* Features Coming Soon */}
        <Animated.View entering={SlideInUp.delay(400)} className="gap-3 mb-8">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Coming Soon
          </Text>
          {[
            { icon: "swap-horizontal", label: "Buy & Sell Crypto" },
            { icon: "wallet", label: "Wallet Management" },
            { icon: "history", label: "Transaction History" },
            { icon: "bell", label: "Price Alerts" },
          ].map((item, index) => (
            <View
              key={index}
              className="bg-neutral-dark rounded-lg px-4 py-3 flex-row items-center gap-3"
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color="#8B5CF6"
              />
              <Text className="text-foreground font-medium flex-1">{item.label}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#6b7280"
              />
            </View>
          ))}
        </Animated.View>

        {/* Flex spacer */}
        <View className="flex-1" />

        {/* Logout Button */}
        <Animated.View entering={SlideInUp.delay(600)}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            size="lg"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
