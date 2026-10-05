import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Header from "./src/components/Header";
import BottomNav from "./src/components/BottomNav";
import Drawer from "./src/components/Drawer";
import ChatPanel from "./src/components/ChatPanel"; // Importujemy panel czatu
import Button from "./src/components/Button"; // Importujemy Button do FAB
import Icon from "./src/components/Icon"; // Importujemy Icon do FAB
import GradesScreen from "./src/screens/GradesScreen";
import PaymentsScreen from "./src/screens/PaymentsScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import InternshipsScreen from "./src/screens/InternshipsScreen";
import DocumentsScreen from "./src/screens/DocumentsScreen";
import FacultyScreen from "./src/screens/FacultyScreen";
import KnowledgeScreen from "./src/screens/KnowledgeScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import { Screen } from "./src/types";

const titles: Partial<Record<Screen, string>> = {
  calendar: "Kalendarz",
  grades: "Oceny",
  payments: "Płatności",
  internships: "Praktyki",
  documents: "Dokumenty",
  faculty: "Ocena kadry",
  knowledge: "Baza wiedzy",
  gallery: "Galeria",
  profile: "Konto",
};

function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Dodajemy stan do obsługi widoczności czatu
  const [chatOpen, setChatOpen] = useState(false);

  const { colors, isDark } = useTheme();

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      </SafeAreaProvider>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home": return <HomeScreen />;
      case "calendar": return <CalendarScreen />;
      case "grades": return <GradesScreen />;
      case "payments": return <PaymentsScreen />;
      case "profile": return <ProfileScreen />;
      case "internships": return <InternshipsScreen />;
      case "documents": return <DocumentsScreen />;
      case "faculty": return <FacultyScreen />;
      case "knowledge": return <KnowledgeScreen />;
      case "gallery": return <GalleryScreen />;
      default:
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: colors.muted }}>Ekran w budowie</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={[styles.appContainer, { backgroundColor: colors.appBg }]}>
        <View style={[styles.mobileShell, { backgroundColor: colors.bg }]}>
          <Header
            title={titles[currentScreen]}
            onMenu={() => setDrawerOpen(true)}
          />
          
          <View style={styles.content}>
            {renderScreen()}
          </View>

          <BottomNav screen={currentScreen} setScreen={setCurrentScreen} />
          
          {/* Pływający przycisk (FAB) otwierający czat */}
          <Button 
            style={[styles.fab, { backgroundColor: colors.blue }]} 
            onPress={() => setChatOpen(true)}
          >
            <Icon name="chat" color="#ffffff" size={24} />
          </Button>

          <Drawer 
            open={drawerOpen} 
            onClose={() => setDrawerOpen(false)} 
            setScreen={setCurrentScreen} 
            logout={() => { 
              setLoggedIn(false); 
              setDrawerOpen(false); 
              setChatOpen(false); // Zamykamy czat przy wylogowaniu
              setCurrentScreen("home"); 
            }} 
          />

          {/* Nakładka czatu */}
          <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />

        </View>
      </View>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mobileShell: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 90, // Wysokość nad dolnym paskiem nawigacji
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2146c7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8, // Dodaje cień na Androidzie
  },
});