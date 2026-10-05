import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import { useTheme } from "../theme/ThemeContext";

export default function GradesScreen() {
  const { colors } = useTheme();

  const grades = [
    ["Zaawansowane proj. aplikacji mobilnych", "dr Anna Wiśniewska", "4,5", "6", "C214"],
    ["Przygotowanie studenta do rynku pracy", "mgr Julia Kaczmarek", "4,0", "3", "C118"],
    ["Projekt wdrożeniowy", "dr Piotr Kowalski", "5,0", "5", "B112"],
    ["Algorytmy i struktury danych", "dr hab. Marek Zieliński", "3,5", "6", "A105"],
    ["Bazy danych NoSQL", "mgr inż. Jan Borkowski", "4,0", "4", "A307"],
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Karta ze średnią ocen (Hero) */}
      <Card style={styles.heroCardWrapper}>
        <LinearGradient
          colors={[colors.blue, "#526ee0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroTextCol}>
            <Text style={styles.heroLabel}>Średnia ocen</Text>
            <Text style={styles.heroValue}>4,2</Text>
            <Text style={styles.heroSub}>+0,2 względem semestru 5</Text>
          </View>
          
          <View style={styles.gradeRing}>
            <Text style={styles.ringValue}>90%</Text>
            <Text style={styles.ringLabel}>ECTS</Text>
          </View>
        </LinearGradient>
      </Card>

      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Twoje przedmioty</Text>
        <Text style={[styles.sectionTitleBold, { color: colors.blue }]}>{grades.length} przedmiotów</Text>
      </View>

      {/* Lista ocen */}
      <Card style={styles.gradeListCard}>
        {grades.map((grade, index) => (
          <View 
            key={grade[0]} 
            style={[
              styles.gradeRow, 
              index > 0 && { borderTopColor: colors.line, borderTopWidth: 1 }
            ]}
          >
            <View style={styles.gradeInfo}>
              <Text style={[styles.gradeTitle, { color: colors.text }]}>{grade[0]}</Text>
              <Text style={[styles.gradeDetails, { color: colors.muted }]}>{grade[1]} · sala {grade[4]}</Text>
              <Text style={[styles.gradeEcts, { color: colors.muted }]}>ECTS: {grade[3]}</Text>
            </View>
            <Text style={[styles.gradeResult, { color: colors.blue }]}>{grade[2]}</Text>
          </View>
        ))}
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
  heroCardWrapper: {
    padding: 0, 
    overflow: "hidden",
  },
  heroGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTextCol: {
    flexDirection: "column",
  },
  heroLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "rgba(255, 255, 255, 0.75)",
    fontWeight: "bold",
  },
  heroValue: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "bold",
    color: "#ffffff",
  },
  heroSub: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.75)",
  },
  gradeRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 7,
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderTopColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  ringValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
  ringLabel: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.75)",
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
  gradeListCard: {
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    gap: 12,
  },
  gradeInfo: {
    flex: 1,
    gap: 3,
  },
  gradeTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  gradeDetails: {
    fontSize: 9,
  },
  gradeEcts: {
    fontSize: 9,
  },
  gradeResult: {
    fontSize: 20,
    fontWeight: "bold",
  },
});