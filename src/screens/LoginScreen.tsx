import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import { useTheme } from "../theme/ThemeContext";

type LoginProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginProps) {
  const [album, setAlbum] = useState("80725");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  
  // Pobieramy kolory z naszego motywu
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.appBg }]}
    >
      <View style={styles.content}>
        
        {/* Nagłówek z logo */}
        <View style={styles.header}>
          <Logo />
          <Text style={[styles.subtitle, { color: colors.muted }]}>Twoje studia. Zawsze pod ręką.</Text>
        </View>

        {/* Karta logowania */}
        <Card style={styles.card}>
          <Text style={[styles.eyebrow, { color: colors.blue }]}>Witaj ponownie</Text>
          <Text style={[styles.title, { color: colors.text }]}>Zaloguj się</Text>
          <Text style={[styles.desc, { color: colors.muted }]}>Użyj danych z systemu uczelnianego.</Text>

          <View style={styles.form}>
            
            {/* Pole: Login */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.muted }]}>Numer albumu lub adres e-mail</Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.bg, borderColor: colors.line }]}>
                <Icon name="user" color={colors.muted} size={20} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={album}
                  onChangeText={setAlbum}
                  placeholderTextColor={colors.muted}
                />
              </View>
            </View>

            {/* Pole: Hasło */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.muted }]}>Hasło</Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.bg, borderColor: colors.line }]}>
                <Icon name="file" color={colors.muted} size={20} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={colors.muted}
                />
                <Button onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Icon name="eye" color={colors.muted} size={20} />
                </Button>
              </View>
            </View>

            {/* Zapomniałem hasła */}
            <Button style={styles.forgotBtn}>
              <Text style={[styles.forgotText, { color: colors.blue }]}>Nie pamiętasz hasła?</Text>
            </Button>

            {/* Przycisk logowania */}
            <Button style={[styles.loginBtn, { backgroundColor: colors.blue }]} onPress={onLogin}>
              <Text style={styles.loginBtnText}>Zaloguj się</Text>
              <Icon name="chevron" color="#ffffff" size={16} />
            </Button>

            <Text style={[styles.helpText, { color: colors.muted }]}>
              Problem z logowaniem? <Text style={{ color: colors.blue, fontWeight: "bold" }}>Skontaktuj się z pomocą</Text>
            </Text>
          </View>
        </Card>

        <Text style={[styles.footerText, { color: colors.muted }]}>Bezpieczne logowanie · MyMerito 2026</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    gap: 10,
  },
  subtitle: {
    fontSize: 12,
  },
  card: {
    width: "100%",
    padding: 24,
    gap: 6,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 11,
    marginBottom: 16,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: "100%",
  },
  eyeBtn: {
    padding: 4,
  },
  forgotBtn: {
    alignSelf: "flex-end",
  },
  forgotText: {
    fontSize: 10,
    fontWeight: "700",
  },
  loginBtn: {
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  loginBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 10,
  },
  footerText: {
    fontSize: 9,
    marginTop: 30,
  },
});