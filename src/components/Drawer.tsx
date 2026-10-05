import React from "react";
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen, IconName } from "../types";
import Icon from "./Icon";
import Button from "./Button";
import { useTheme } from "../theme/ThemeContext";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  setScreen: (screen: Screen) => void;
  logout: () => void;
};

const menuItems: { screen: Screen; label: string; icon: IconName }[] = [
  { screen: "calendar", label: "Kalendarz", icon: "calendar" },
  { screen: "grades", label: "Oceny", icon: "chart" },
  { screen: "payments", label: "Płatności i świadczenia", icon: "card" },
  { screen: "internships", label: "Praktyki", icon: "briefcase" },
  { screen: "documents", label: "Dokumenty", icon: "file" },
  { screen: "faculty", label: "Ocena kadry dydaktycznej", icon: "star" },
  { screen: "knowledge", label: "Baza wiedzy", icon: "book" },
  { screen: "gallery", label: "Galeria", icon: "eye" },
];

export default function Drawer({ open, onClose, setScreen, logout }: DrawerProps) {
  const insets = useSafeAreaInsets();
  
  // Pobieramy stan i kolory z naszego motywu
  const { isDark, toggleTheme, colors } = useTheme();

  const navigate = (screen: Screen) => {
    setScreen(screen);
    onClose();
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.container}>
        {/* Zaciemnione tło */}
        <Pressable style={styles.scrim} onPress={onClose} />
        
        {/* Panel boczny (dynamiczne tło) */}
        <View style={[styles.drawer, { paddingBottom: Math.max(insets.bottom, 22), backgroundColor: colors.surface }]}>
          
          {/* Nagłówek menu */}
          <View style={[styles.drawerTop, { paddingTop: Math.max(insets.top, 20) + 10, backgroundColor: colors.blueLight }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MN</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.blue }]}>Michał Nowak</Text>
              <Text style={[styles.userDetail, { color: colors.muted }]}>Nr albumu: 80725 · Sem. 6</Text>
              <Text style={[styles.userDetail, { color: colors.muted }]}>Informatyka · WSB Merito</Text>
            </View>
            <Button style={[styles.closeBtn, { backgroundColor: colors.surface }]} onPress={onClose}>
              <Icon name="close" color={colors.text} />
            </Button>
          </View>

          {/* Lista ekranów */}
          <ScrollView style={styles.drawerMenu} showsVerticalScrollIndicator={false}>
            <Button style={styles.menuItem} onPress={() => navigate("home")}>
              <View style={[styles.menuIconWrapper, { backgroundColor: colors.blueLight }]}>
                <Icon name="home" size={19} color={colors.blue} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Pulpit</Text>
              <Icon name="chevron" size={17} color={colors.muted} />
            </Button>

            {menuItems.map((item) => (
               <Button key={item.screen} style={styles.menuItem} onPress={() => navigate(item.screen)}>
                 <View style={[styles.menuIconWrapper, { backgroundColor: colors.blueLight }]}>
                   <Icon name={item.icon} size={19} color={colors.blue} />
                 </View>
                 <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
                 <Icon name="chevron" size={17} color={colors.muted} />
               </Button>
            ))}
          </ScrollView>

          {/* Ustawienia */}
          <View style={[styles.drawerSettings, { borderTopColor: colors.line }]}>
            <Button style={styles.settingBtn} onPress={toggleTheme}>
              <Icon name="moon" size={19} color={colors.text} />
              <Text style={[styles.settingBtnText, { color: colors.text }]}>Tryb ciemny</Text>
              <View style={[styles.switch, isDark && styles.switchOn]}>
                <View style={[styles.switchThumb, isDark && styles.switchThumbOn]} />
              </View>
            </Button>
            <Button style={styles.settingBtn} onPress={logout}>
              <Icon name="logout" size={19} color={colors.danger} />
              <Text style={[styles.settingBtnText, { color: colors.danger }]}>Wyloguj się</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  scrim: {
    flex: 1,
    backgroundColor: "rgba(13, 23, 45, 0.42)",
  },
  drawer: {
    width: "88%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
  },
  drawerTop: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#2146c7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2146c7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  userDetail: {
    fontSize: 9,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    top: 18,
  },
  drawerMenu: {
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  menuItem: {
    width: "100%",
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 13,
    gap: 12,
    marginBottom: 4,
  },
  menuIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
  },
  drawerSettings: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 5,
  },
  settingBtn: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingBtnText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
  },
  switch: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#d9e0eb",
    padding: 3,
    justifyContent: "center",
  },
  switchOn: {
    backgroundColor: "#2146c7",
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  switchThumbOn: {
    transform: [{ translateX: 18 }],
  },
});