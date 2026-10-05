import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.logo}>
      <View style={[styles.logoMark, compact && styles.logoMarkCompact]}>
        <Text
          style={[styles.logoMarkText, compact && styles.logoMarkTextCompact]}
        >
          M
        </Text>
      </View>
      <View>
        <Text style={[styles.title, compact && styles.titleCompact]}>
          MyMerito
        </Text>
        <Text style={styles.subtitle}>WSB MERITO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  logoMark: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#2146c7",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2146c7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 3,
  },
  logoMarkCompact: {
    width: 38,
    height: 38,
    borderRadius: 10,
  },
  logoMarkText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },
  logoMarkTextCompact: {
    fontSize: 21,
  },
  title: {
    color: "#2146c7",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: -0.5,
    lineHeight: 23,
  },
  titleCompact: {
    fontSize: 18,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: "#718096",
    marginTop: 3,
    fontWeight: "700",
  },
});
