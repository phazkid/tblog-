import React, { useState } from "react";
import { TextInput as RNTextInput, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  label?: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
  editable?: boolean;
}

export function TextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  label,
  keyboardType = "default",
  editable = true,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isSecure = secureTextEntry && !showPassword;

  return (
    <View className="w-full">
      {label && (
        <Text className="text-foreground text-sm font-semibold mb-2">{label}</Text>
      )}
      <View
        className={cn(
          "flex-row items-center px-4 py-3 rounded-xl border-2",
          isFocused ? "border-primary bg-neutral-dark" : "border-neutral-lighter bg-neutral-dark",
          error && "border-red-500"
        )}
      >
        <RNTextInput
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-foreground text-base font-medium"
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#8B5CF6"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-500 text-xs font-medium mt-1">{error}</Text>
      )}
    </View>
  );
}
