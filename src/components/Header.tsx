import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import Logo from "./Logo";
import Button from "./Button";
import { useTheme } from "../theme/ThemeContext";

type HeaderProps = {
  title?: string;
  onMenu: () => void;
};

export default function Header({ onMenu }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[
      styles.header, 
      { paddingTop: Math.max(insets.top, 14), backgroundColor: colors.surface, borderBottomColor: colors.line }
    ]}>
      <Logo /> 
      
      <Button style={[styles.menuBtn, { borderColor: colors.line, backgroundColor: colors.surface }]} onPress={onMenu}>
        <Icon name="menu" color={colors.text} size={22} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});