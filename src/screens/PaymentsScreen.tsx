import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

export default function PaymentsScreen() {
  const { colors } = useTheme();

  const history = [
    ["Czesne - semestr 5 zimowy", "15.02.2026", "930 zł"],
    ["Czesne - semestr 4 letni", "29.09.2025", "930 zł"],
    ["Legitymacja studencka", "20.02.2025", "17 zł"],
    ["Czesne - semestr 3 zimowy", "10.02.2025", "930 zł"],
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Do zapłaty */}
      <Card style={[styles.paymentDue, { borderColor: colors.danger + "80" }]}> 
        <View style={styles.dueRow}>
          <Text style={[styles.dueLabel, { color: colors.muted }]}>Do zapłaty</Text>
          <Text style={[styles.dueAmount, { color: colors.danger }]}>930 zł</Text>
        </View>
        <Text style={[styles.dueTitle, { color: colors.text }]}>Czesne · semestr 6 letni</Text>
        <Text style={[styles.dueSub, { color: colors.muted }]}>Termin płatności: 5 października 2026</Text>
        
        <Button style={[styles.primaryBtn, { backgroundColor: colors.blue, shadowColor: colors.blue }]}>
          <Text style={styles.primaryBtnText}>Zapłać teraz</Text>
          <Icon name="chevron" size={17} color="#ffffff" />
        </Button>
      </Card>

      {/* Statystyki finansowe */}
      <View style={styles.financeStats}>
        <Card style={styles.statCard}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Zapłacono łącznie</Text>
          <Text style={[styles.statValue, { color: colors.blue }]}>12 817 zł</Text>
          <Text style={[styles.statSub, { color: colors.muted }]}>od początku studiów</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Rata miesięczna</Text>
          <Text style={[styles.statValue, { color: colors.blue }]}>930 zł</Text>
          <Text style={[styles.statSub, { color: colors.muted }]}>4 raty pozostały</Text>
        </Card>
      </View>

      {/* Saldo konta */}
      <Card style={styles.balanceCardWrapper}>
        <LinearGradient
          colors={[colors.blue, "#304fc4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceGradient}
        >
          <Text style={styles.balanceLabel}>Saldo konta studenckiego</Text>
          <Text style={styles.balanceValue}>0,00 zł</Text>
          <View style={styles.balanceDetails}>
            <View style={styles.balanceDetailCol}>
              <Text style={styles.balanceDetailText}>Nr albumu</Text>
              <Text style={styles.balanceDetailBold}>80725</Text>
            </View>
            <View style={styles.balanceDetailCol}>
              <Text style={styles.balanceDetailText}>Rok akademicki</Text>
              <Text style={styles.balanceDetailBold}>2025/2026</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>

      {/* Tytuł sekcji historii */}
      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Historia płatności</Text>
        <Button>
          <Text style={[styles.sectionTitleLink, { color: colors.blue }]}>Wszystkie</Text>
        </Button>
      </View>

      {/* Lista historii */}
      <View style={styles.historyList}>
        {history.map((p) => (
          <Card key={p[0]} style={styles.historyRow}>
            <View style={styles.historyInfo}>
              <Text style={[styles.historyTitle, { color: colors.text }]}>{p[0]}</Text>
              <Text style={[styles.historyDate, { color: colors.muted }]}>Zapłacono: {p[1]}</Text>
            </View>
            <View style={styles.historyAmountCol}>
              <Text style={[styles.historyAmount, { color: colors.success }]}>{p[2]}</Text>
              <View style={styles.paidStatus}>
                <Icon name="check" size={12} color={colors.success} />
                <Text style={[styles.paidStatusText, { color: colors.success }]}>opłacono</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

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
  paymentDue: {
    padding: 18,
    borderWidth: 1,
    gap: 7,
  },
  dueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  dueLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "800",
  },
  dueAmount: {
    fontSize: 23,
    fontWeight: "bold",
  },
  dueTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  dueSub: {
    fontSize: 9,
  },
  primaryBtn: {
    height: 45,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 16,
    marginTop: 7,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 4,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  financeStats: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 16,
    gap: 5,
  },
  statLabel: {
    textTransform: "uppercase",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  statSub: {
    fontSize: 9,
  },
  balanceCardWrapper: {
    padding: 0,
    overflow: "hidden",
  },
  balanceGradient: {
    padding: 20,
    gap: 7,
  },
  balanceLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
  balanceDetails: {
    flexDirection: "row",
    gap: 40,
    marginTop: 8,
  },
  balanceDetailCol: {
    flexDirection: "column",
  },
  balanceDetailText: {
    fontSize: 8,
    color: "rgba(255,255,255,0.75)",
  },
  balanceDetailBold: {
    opacity: 1,
    fontSize: 11,
    marginTop: 3,
    fontWeight: "bold",
    color: "#ffffff",
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
  sectionTitleLink: {
    fontSize: 11,
    fontWeight: "bold",
  },
  historyList: {
    gap: 9,
  },
  historyRow: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyInfo: {
    flexDirection: "column",
    gap: 3,
  },
  historyTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  historyDate: {
    fontSize: 8,
  },
  historyAmountCol: {
    flexDirection: "column",
    gap: 3,
    alignItems: "flex-end",
  },
  historyAmount: {
    fontSize: 13,
    fontWeight: "bold",
  },
  paidStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  paidStatusText: {
    textTransform: "uppercase",
    fontSize: 7,
    fontWeight: "bold",
    marginLeft: 2,
  },
});