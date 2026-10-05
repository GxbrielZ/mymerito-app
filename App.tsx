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

// Funkcja zawierająca całą logikę nawigacji i ekranów
function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pobieramy informacje o motywie
  const { colors, isDark } = useTheme();

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      </SafeAreaProvider>
    );
  }

  // Mechanizm przełączania widoków
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
      {/* Dynamiczny pasek powiadomień */}
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Tło otaczające aplikację korzysta z colors.appBg */}
      <View style={[styles.appContainer, { backgroundColor: colors.appBg }]}>
        
        {/* Tło główne aplikacji korzysta z colors.bg */}
        <View style={[styles.mobileShell, { backgroundColor: colors.bg }]}>
          <Header
            title={titles[currentScreen]}
            onMenu={() => setDrawerOpen(true)}
          />
          
          <View style={styles.content}>
            {renderScreen()}
          </View>

          <BottomNav screen={currentScreen} setScreen={setCurrentScreen} />
          <Drawer 
            open={drawerOpen} 
            onClose={() => setDrawerOpen(false)} 
            setScreen={setCurrentScreen} 
            logout={() => { 
              setLoggedIn(false); 
              setDrawerOpen(false); 
              setCurrentScreen("home"); 
            }} 
          />
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
    // Usunięto alignItems: "center", dzięki czemu kontener naturalnie wypełnia ekran
  },
  mobileShell: {
    flex: 1,
    width: "100%",
    // Usunięto maxWidth: 470, co pozwala aplikacji rozciągnąć się od krawędzi do krawędzi
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
});