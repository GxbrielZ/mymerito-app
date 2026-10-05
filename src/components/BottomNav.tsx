import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen, IconName } from "../types";
import Icon from "./Icon";
import Button from "./Button";
import { useTheme } from "../theme/ThemeContext";

type BottomNavProps = {
  screen: Screen;
  setScreen: (screen: Screen) => void;
};

export default function BottomNav({ screen, setScreen }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const tabs: { id: Screen; label: string; icon: IconName }[] = [
    { id: "home", label: "Pulpit", icon: "home" },
    { id: "payments", label: "Płatności", icon: "card" },
    { id: "calendar", label: "Kalendarz", icon: "calendar" },
    { id: "knowledge", label: "Baza wiedzy", icon: "book" },
    { id: "profile", label: "Konto", icon: "user" },
  ];

  return (
    <View style={[
      styles.nav, 
      { 
        paddingBottom: Math.max(insets.bottom, 8), 
        backgroundColor: colors.surface, 
        borderTopColor: colors.line 
      }
    ]}>
      {tabs.map((tab) => {
        const isActive = screen === tab.id;
        return (
          <Button key={tab.id} style={styles.tab} onPress={() => setScreen(tab.id)}>
            {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.blue }]} />}
            <Icon name={tab.icon} size={22} color={isActive ? colors.blue : colors.muted} />
            <Text style={[
              styles.label, 
              { color: isActive ? colors.blue : colors.muted, fontWeight: isActive ? "bold" : "normal" }
            ]}>
              {tab.label}
            </Text>
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    paddingTop: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    width: 28,
    height: 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  label: {
    fontSize: 9,
  },
});