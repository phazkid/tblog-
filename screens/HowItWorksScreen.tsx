import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, FlatList, Dimensions } from "react-native";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { Button } from "@/components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HowItWorksScreenProps {
  onNext: () => void;
}

interface Slide {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: "1",
    title: "Send Naira",
    description: "Transfer naira to your FabsExchange account via bank transfer or mobile money",
    icon: "bank-transfer-in",
    color: "#8B5CF6",
  },
  {
    id: "2",
    title: "Receive Crypto",
    description: "Get your cryptocurrency instantly at the best market rates",
    icon: "bitcoin",
    color: "#FBBF24",
  },
  {
    id: "3",
    title: "Live Support",
    description: "Our dedicated support team is available 24/7 to help you",
    icon: "chat-bubble-outline",
    color: "#8B5CF6",
  },
];

export function HowItWorksScreen({ onNext }: HowItWorksScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(currentIndex);
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={{ width: screenWidth }} className="px-6 py-12 items-center justify-center flex-1">
      <Animated.View entering={FadeIn.duration(600)} className="items-center w-full">
        {/* Icon */}
        <View
          className="w-24 h-24 rounded-full items-center justify-center mb-6"
          style={{ backgroundColor: item.color + "20" }}
        >
          <MaterialCommunityIcons name={item.icon as any} size={48} color={item.color} />
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-foreground text-center mb-3">
          {item.title}
        </Text>

        {/* Description */}
        <Text className="text-base font-medium text-neutral-light text-center leading-6">
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Carousel */}
        <FlatList
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />

        {/* Dots Indicator */}
        <Animated.View entering={SlideInUp.delay(300)} className="flex-row justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`rounded-full transition-all ${
                index === currentIndex ? "bg-accent w-8 h-3" : "bg-neutral-lighter w-3 h-3"
              }`}
            />
          ))}
        </Animated.View>

        {/* CTA Button */}
        <Animated.View entering={SlideInUp.delay(500)} className="px-6 pb-8">
          <Button
            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            onPress={onNext}
            variant="primary"
            size="lg"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
