import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import { useTheme } from "../theme/ThemeContext";

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Nagłówek profilu */}
      <View style={styles.profileHead}>
        <View style={[styles.avatarLarge, { backgroundColor: colors.blue, shadowColor: colors.blue }]}>
          <Text style={styles.avatarText}>MN</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>Michał Nowak</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Informatyka · Niestacjonarne</Text>
      </View>

      {/* Karta - Legitymacja studencka */}
      <Card style={styles.studentCardWrapper}>
        <LinearGradient
          colors={[colors.blue, "#324fc2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.studentCardGradient}
        >
          <Text style={styles.cardEyebrow}>Legitymacja studencka</Text>
          <View style={styles.cardGrid}>
            <View style={styles.cardItem}>
              <Text style={styles.cardLabel}>Nr albumu</Text>
              <Text style={styles.cardValue}>80725</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={styles.cardLabel}>Rok akademicki</Text>
              <Text style={styles.cardValue}>2025/2026</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={styles.cardLabel}>Semestr</Text>
              <Text style={styles.cardValue}>6 (letni)</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={styles.cardLabel}>ECTS</Text>
              <Text style={styles.cardValue}>162 / 180</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>

      {/* Karta - Szczegóły profilu */}
      <Card style={styles.profileDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Wydział</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>Wydział Informatyki i Nowych Technologii</Text>
        </View>
        <View style={[styles.detailRow, { borderTopWidth: 1, borderTopColor: colors.line }]}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Kierunek</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>Informatyka</Text>
        </View>
        <View style={[styles.detailRow, { borderTopWidth: 1, borderTopColor: colors.line }]}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Tryb studiów</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>Niestacjonarne</Text>
        </View>
        <View style={[styles.detailRow, { borderTopWidth: 1, borderTopColor: colors.line }]}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Specjalność</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>Programowanie aplikacji mobilnych</Text>
        </View>
      </Card>

      {/* Postęp studiów */}
      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Postęp studiów</Text>
        <Text style={[styles.sectionTitleBold, { color: colors.blue }]}>90%</Text>
      </View>
      
      <Card style={styles.progressCard}>
        <View style={[styles.progressBarBg, { backgroundColor: colors.blueLight }]}>
          <View style={[styles.progressBarFill, { width: "90%", backgroundColor: colors.blue }]} />
        </View>
        <View style={styles.progressCopy}>
          <Text style={[styles.progressText, { color: colors.muted }]}>162 ECTS zdobyte</Text>
          <Text style={[styles.progressText, { color: colors.muted }]}>18 ECTS pozostało</Text>
        </View>
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 124,
    gap: 14,
  },
  profileHead: {
    alignItems: "center",
    marginTop: 7,
    marginBottom: 3,
    gap: 4,
  },
  avatarLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 23,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: -0.7,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 10,
  },
  studentCardWrapper: {
    padding: 0,
    overflow: "hidden",
  },
  studentCardGradient: {
    padding: 19,
  },
  cardEyebrow: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 13,
    rowGap: 14,
  },
  cardItem: {
    width: "50%",
    flexDirection: "column",
  },
  cardLabel: {
    fontSize: 8,
    color: "rgba(255, 255, 255, 0.75)",
  },
  cardValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  profileDetails: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  detailRow: {
    paddingVertical: 12,
    flexDirection: "column",
  },
  detailLabel: {
    fontSize: 8,
  },
  detailValue: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 2,
  },
  headingSpan: {
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 11,
    fontWeight: "800",
  },
  sectionTitleBold: {
    fontSize: 11,
    fontWeight: "bold",
  },
  progressCard: {
    padding: 0,
  },
  progressBarBg: {
    height: 8,
    marginHorizontal: 17,
    marginTop: 17,
    marginBottom: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressCopy: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    paddingBottom: 15,
  },
  progressText: {
    fontSize: 8,
  },
});