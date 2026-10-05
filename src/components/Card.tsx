import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function Card({ style, children, ...props }: ViewProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    shadowColor: "#243c6e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
});