import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
}: ButtonProps) {
  const baseStyle = "rounded-xl font-semibold flex-row items-center justify-center";

  const variantStyles = {
    primary: "bg-primary active:bg-primary-dark",
    secondary: "bg-accent active:bg-accent-dark",
    outline: "border-2 border-primary active:border-primary-dark",
  };

  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const textVariantStyles = {
    primary: "text-background",
    secondary: "text-background",
    outline: "text-primary",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={cn(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#8B5CF6" : "#0f0f0f"} />
      ) : (
        <Text
          className={cn("text-base font-semibold", textVariantStyles[variant])}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
