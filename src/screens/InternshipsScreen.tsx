import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

export default function InternshipsScreen() {
  const [sent, setSent] = useState(false);
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Karta głównego postępu */}
      <Card style={styles.heroCard}>
        <View style={styles.progressRingWrapper}>
          <View style={[
            styles.progressRing, 
            { 
              borderColor: colors.blueLight,
              borderTopColor: colors.blue,
              borderRightColor: colors.blue,
              borderBottomColor: colors.blue,
            }
          ]}>
            <View style={styles.progressInner}>
              <Text style={[styles.progressText, { color: colors.blue }]}>72%</Text>
            </View>
          </View>
        </View>

        <View style={styles.heroInfo}>
          <Text style={[styles.heroLabel, { color: colors.muted }]}>Zrealizowano</Text>
          <Text style={[styles.heroValue, { color: colors.text }]}>518 / 720 godzin</Text>
          <Text style={[styles.heroSub, { color: colors.muted }]}>Pozostały 202 godziny</Text>
        </View>
      </Card>

      {/* Karta miejsca praktyk */}
      <Card style={styles.placeCard}>
        <View style={[styles.placeIconWrapper, { backgroundColor: colors.blueLight }]}>
          <Icon name="briefcase" color={colors.blue} />
        </View>
        <View style={styles.placeInfo}>
          <Text style={[styles.placeLabel, { color: colors.muted }]}>Miejsce praktyk</Text>
          <Text style={[styles.placeName, { color: colors.text }]}>Merito Digital Solutions</Text>
          
          <View style={styles.placeDetailRow}>
            <Icon name="pin" size={13} color={colors.muted} />
            <Text style={[styles.placeDetailText, { color: colors.muted }]}>ul. Fabryczna 12, Wrocław</Text>
          </View>
          
          <View style={styles.placeDetailRow}>
            <Icon name="clock" size={13} color={colors.muted} />
            <Text style={[styles.placeDetailText, { color: colors.muted }]}>01.03-30.09.2026</Text>
          </View>
        </View>
      </Card>

      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Dokumenty i wnioski</Text>
      </View>

      {/* Lista akcji / dokumentów */}
      <Card style={styles.actionListCard}>
        <Button style={styles.actionBtn} onPress={() => setSent(true)}>
          <View style={[styles.menuIcon, { backgroundColor: colors.blueLight }]}>
            <Icon name="file" color={colors.blue} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Nowy wniosek o praktyki</Text>
            <Text style={[styles.actionSub, { color: colors.muted }]}>Wyślij zgłoszenie do opiekuna</Text>
          </View>
          <Icon name="chevron" color={colors.muted} />
        </Button>

        <View style={[styles.divider, { backgroundColor: colors.line }]} />

        <Button style={styles.actionBtn}>
          <View style={[styles.menuIcon, { backgroundColor: colors.blueLight }]}>
            <Icon name="download" color={colors.blue} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Dziennik praktyk</Text>
            <Text style={[styles.actionSub, { color: colors.muted }]}>Pobierz aktualny dokument</Text>
          </View>
          <Icon name="chevron" color={colors.muted} />
        </Button>

        <View style={[styles.divider, { backgroundColor: colors.line }]} />

        <Button style={styles.actionBtn}>
          <View style={[styles.menuIcon, { backgroundColor: colors.blueLight }]}>
            <Icon name="check" color={colors.blue} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Zaświadczenie od pracodawcy</Text>
            <Text style={[styles.actionSub, { color: colors.muted }]}>Dokument zaakceptowany</Text>
          </View>
          <Icon name="chevron" color={colors.muted} />
        </Button>
      </Card>

      {/* Powiadomienie (Toast) o wysłaniu */}
      {sent && (
        <View style={[styles.toast, { backgroundColor: colors.success }]}>
          <Icon name="check" size={17} color="#ffffff" />
          <Text style={styles.toastText}>Wniosek został utworzony.</Text>
        </View>
      )}

      {/* Karta opiekuna */}
      <Card style={styles.supervisorCard}>
        <Text style={[styles.supervisorLabel, { color: colors.muted }]}>Opiekun praktyk</Text>
        <Text style={[styles.supervisorName, { color: colors.text }]}>dr Marta Lewandowska</Text>
        <Text style={[styles.supervisorEmail, { color: colors.muted }]}>marta.lewandowska@merito.pl</Text>
        
        <Button style={[styles.contactBtn, { borderColor: colors.line }]}>
          <Icon name="mail" size={17} color={colors.blue} />
          <Text style={[styles.contactBtnText, { color: colors.blue }]}>Napisz wiadomość</Text>
        </Button>
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
  heroCard: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  progressRingWrapper: {
    width: 83,
    height: 83,
  },
  progressRing: {
    width: 83,
    height: 83,
    borderRadius: 41.5,
    borderWidth: 8,
    transform: [{ rotate: "45deg" }],
    alignItems: "center",
    justifyContent: "center",
  },
  progressInner: {
    transform: [{ rotate: "-45deg" }],
  },
  progressText: {
    fontSize: 16,
    fontWeight: "800",
  },
  heroInfo: {
    flex: 1,
    gap: 4,
  },
  heroLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    fontWeight: "800",
  },
  heroValue: {
    fontSize: 17,
    fontWeight: "bold",
  },
  heroSub: {
    fontSize: 9,
  },
  placeCard: {
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
  placeIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placeInfo: {
    flex: 1,
    gap: 4,
  },
  placeLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    fontWeight: "800",
  },
  placeName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  placeDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeDetailText: {
    fontSize: 9,
  },
  sectionTitle: {
    marginTop: 10,
    paddingHorizontal: 2,
  },
  headingSpan: {
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 11,
    fontWeight: "800",
  },
  actionListCard: {
    paddingVertical: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  actionInfo: {
    flex: 1,
    gap: 3,
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  actionSub: {
    fontSize: 8,
  },
  divider: {
    height: 1,
  },
  toast: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  toastText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
  },
  supervisorCard: {
    padding: 17,
    gap: 4,
  },
  supervisorLabel: {
    textTransform: "uppercase",
    fontSize: 8,
    fontWeight: "800",
  },
  supervisorName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  supervisorEmail: {
    fontSize: 9,
  },
  contactBtn: {
    marginTop: 9,
    height: 38,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  contactBtnText: {
    fontSize: 10,
    fontWeight: "700",
  },
});