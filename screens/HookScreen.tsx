import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  FadeIn,
  SlideInUp,
} from "react-native-reanimated";
import { Button } from "@/components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HookScreenProps {
  onGetStarted: () => void;
  onLoginPress: () => void;
}

export function HookScreen({ onGetStarted, onLoginPress }: HookScreenProps) {
  const floatY = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withSpring(20, { damping: 3, mass: 0.8 }),
        withSpring(0, { damping: 3, mass: 0.8 })
      ),
      -1,
      true
    );
  }, []);

  const floatAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatY.value }],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 items-center justify-between py-12">
        {/* Header Spacing */}
        <View className="flex-1" />

        {/* Logo and Icon Section */}
        <Animated.View entering={FadeIn.duration(600)} className="items-center mb-8">
          <Animated.View style={floatAnimatedStyle}>
            <View className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center mb-6">
              <MaterialCommunityIcons name="bitcoin" size={40} color="#0f0f0f" />
            </View>
          </Animated.View>

          <Animated.View entering={SlideInUp.delay(200)} className="items-center">
            <Text className="text-4xl font-bold text-foreground text-center mb-3">
              FabsExchange
            </Text>
            <Text className="text-xl font-semibold text-accent text-center">
              Buy & Sell Crypto in Naira
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Feature Pills */}
        <Animated.View
          entering={SlideInUp.delay(400)}
          className="w-full items-center gap-3 mb-12"
        >
          <View className="flex-row items-center gap-2 bg-neutral-dark px-4 py-2 rounded-full">
            <MaterialCommunityIcons name="flash" size={16} color="#FBBF24" />
            <Text className="text-sm font-medium text-foreground">Lightning Fast</Text>
          </View>
          <View className="flex-row items-center gap-2 bg-neutral-dark px-4 py-2 rounded-full">
            <MaterialCommunityIcons name="shield-check" size={16} color="#8B5CF6" />
            <Text className="text-sm font-medium text-foreground">Secure & Trusted</Text>
          </View>
          <View className="flex-row items-center gap-2 bg-neutral-dark px-4 py-2 rounded-full">
            <MaterialCommunityIcons name="headset" size={16} color="#FBBF24" />
            <Text className="text-sm font-medium text-foreground">24/7 Live Support</Text>
          </View>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View
          entering={SlideInUp.delay(600)}
          className="w-full gap-3 px-4"
        >
          <Button
            title="Get Started"
            onPress={onGetStarted}
            variant="primary"
            size="lg"
          />
          <Button
            title="I Already Have an Account"
            onPress={onLoginPress}
            variant="outline"
            size="lg"
          />
        </Animated.View>

        {/* Footer Spacing */}
        <View className="h-2" />
      </View>
    </SafeAreaView>
  );
}
