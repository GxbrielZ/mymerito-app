import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

const initialNotifications = [
  { id: 1, type: "chart", title: "Nowa ocena", desc: "Zaawansowane proj. aplikacji mobilnych - 4,5", read: false },
  { id: 2, type: "pin", title: "Zmiana sali", desc: "Projekt wdrożeniowy: B112 → B205 (sobota)", read: false },
  { id: 3, type: "calendar", title: "Ważny termin", desc: "Oddanie projektu końcowego - 28 września", read: false },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);

  const dismiss = (id: number) => setNotifications(notifications.filter((n) => n.id !== id));
  const read = (id: number) => setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));

  const week = [
    { day: "Pon", date: "14" },
    { day: "Wt", date: "15" },
    { day: "Śr", date: "16" },
    { day: "Czw", date: "17" },
    { day: "Pt", date: "18" },
    { day: "Sob", date: "19", highlight: true },
    { day: "Nd", date: "20" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Sekcja Powitania */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.greeting, { color: colors.muted }]}>Dzień dobry,</Text>
          <Text style={[styles.name, { color: colors.text }]}>Michał Nowak</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.date, { color: colors.muted }]}>Sobota, 19 września</Text>
          <Text style={[styles.semester, { color: colors.muted }]}>Semestr 6 letni</Text>
        </View>
      </View>

      {/* Plan tygodnia */}
      <Card style={styles.cardPadding}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>PLAN TYGODNIA</Text>
          <Button>
            <Text style={[styles.linkText, { color: colors.blue }]}>Pełny plan ›</Text>
          </Button>
        </View>
        
        <View style={styles.weekGrid}>
          {week.map((item, i) => (
            <View 
              key={i} 
              style={[
                styles.dayItem, 
                item.highlight && { backgroundColor: colors.blue }
              ]}
            >
              <Text style={[
                styles.dayName, 
                { color: item.highlight ? "#ffffff" : colors.text }
              ]}>{item.day}</Text>
              
              <Text style={[
                styles.dayDate, 
                { color: item.highlight ? "#ffffff" : colors.text }
              ]}>{item.date}</Text>
              
              {item.highlight && (
                <View style={[
                  styles.dot, 
                  { backgroundColor: item.highlight ? "#ffffff" : colors.blue }
                ]} />
              )}
            </View>
          ))}
        </View>
      </Card>

      {/* Dzisiejsze zajęcia */}
      <View style={styles.sectionHeaderOuter}>
        <Text style={[styles.sectionTitleOuter, { color: colors.muted }]}>DZISIAJ · SOB, 19 WRZ</Text>
        <Text style={[styles.linkText, { color: colors.blue }]}>3 zajęcia</Text>
      </View>

      <Card style={styles.cardPadding}>
        {/* Zajęcia 1 */}
        <View style={[styles.classItem, { borderBottomColor: colors.line, borderBottomWidth: 1, paddingTop: 0 }]}>
          <View style={styles.timeCol}>
            <Text style={[styles.timeStart, { color: colors.blue }]}>08:30</Text>
            <Text style={[styles.timeEnd, { color: colors.muted }]}>10:00</Text>
          </View>
          <View style={[styles.classAccent, { backgroundColor: colors.blue }]} />
          <View style={styles.classInfo}>
            <Text style={[styles.classTitle, { color: colors.text }]}>Algorytmy i struktury danych</Text>
            <View style={styles.classDetailRow}>
              <Icon name="user" size={11} color={colors.muted} />
              <Text style={[styles.classDetail, { color: colors.muted }]}>dr hab. Marek Zieliński</Text>
            </View>
            <View style={styles.classDetailRow}>
              <Icon name="pin" size={11} color={colors.muted} />
              <Text style={[styles.classDetail, { color: colors.muted }]}>A105 · Zajęcia</Text>
            </View>
          </View>
        </View>

        {/* Zajęcia 2 */}
        <View style={[styles.classItem, { borderBottomColor: colors.line, borderBottomWidth: 1 }]}>
          <View style={styles.timeCol}>
            <Text style={[styles.timeStart, { color: colors.blue }]}>10:15</Text>
            <Text style={[styles.timeEnd, { color: colors.muted }]}>11:45</Text>
          </View>
          <View style={[styles.classAccent, { backgroundColor: "#8257dc" }]} />
          <View style={styles.classInfo}>
            <Text style={[styles.classTitle, { color: colors.text }]}>Przygotowanie studenta do rynku pracy</Text>
            <View style={styles.classDetailRow}>
              <Icon name="user" size={11} color={colors.muted} />
              <Text style={[styles.classDetail, { color: colors.muted }]}>mgr Julia Kaczmarek</Text>
            </View>
            <View style={styles.classDetailRow}>
              <Icon name="pin" size={11} color={colors.muted} />
              <Text style={[styles.classDetail, { color: colors.muted }]}>C118 · Zajęcia</Text>
            </View>
          </View>
        </View>

        {/* Zajęcia 3 */}
        <View style={[styles.classItem, { paddingBottom: 0 }]}>
          <View style={styles.timeCol}>
            <Text style={[styles.timeStart, { color: colors.blue }]}>12:00</Text>
            <Text style={[styles.timeEnd, { color: colors.muted }]}>13:30</Text>
          </View>
          <View style={[styles.classAccent, { backgroundColor: colors.blue }]} />
          <View style={styles.classInfo}>
            <Text style={[styles.classTitle, { color: colors.text }]}>Projekt wdrożeniowy</Text>
            <View style={styles.classDetailRow}>
              <Icon name="user" size={11} color={colors.muted} />
              <Text style={[styles.classDetail, { color: colors.muted }]}>dr Piotr Kowalski</Text>
            </View>
            <View style={styles.classDetailRow}>
              <Icon name="pin" size={11} color={colors.muted} />
              <Text style={[styles.classDetail, { color: colors.muted }]}>B205 · Zajęcia</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Powiadomienia */}
      <View style={styles.sectionHeaderOuter}>
        <Text style={[styles.sectionTitleOuter, { color: colors.muted }]}>POWIADOMIENIA</Text>
        <Text style={[styles.linkText, { color: colors.blue }]}>{notifications.filter(n => !n.read).length} nowe</Text>
      </View>

      <View style={styles.notificationsList}>
        {notifications.map((notif) => {
          const baseColor = notif.type === "chart" ? colors.blue : notif.type === "pin" ? "#9f7aea" : colors.warning;
          const activeColor = notif.read ? colors.success : baseColor;

          return (
            <Card 
              key={notif.id} 
              style={[
                styles.notificationCard, 
                { borderLeftColor: activeColor },
                notif.read && { opacity: 0.72 }
              ]}
            >
              <View style={[styles.notifIcon, { backgroundColor: `${activeColor}15` }]}>
                <Icon name={notif.type as any} size={18} color={activeColor} />
              </View>
              <View style={styles.notifInfo}>
                <Text style={[styles.notifTitle, { color: colors.text }]}>{notif.title}</Text>
                <Text style={[styles.notifDesc, { color: colors.muted }]}>{notif.desc}</Text>
                <Text style={[styles.notifTime, { color: colors.muted }]}>{notif.read ? "Przeczytano" : "10 min temu"}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Button style={styles.closeNotifBtn} onPress={() => read(notif.id)}>
                  <Icon name="check" size={16} color={notif.read ? colors.muted : colors.success} />
                </Button>
                <Button style={styles.closeNotifBtn} onPress={() => dismiss(notif.id)}>
                  <Icon name="close" size={16} color={colors.muted} />
                </Button>
              </View>
            </Card>
          );
        })}
        
        {!notifications.length && (
          <Card style={styles.emptyState}>
            <Icon name="check" color={colors.muted} size={24} />
            <Text style={[styles.emptyStateBold, { color: colors.text }]}>Wszystko przeczytane</Text>
            <Text style={[styles.emptyStateText, { color: colors.muted }]}>Nie masz nowych powiadomień.</Text>
          </Card>
        )}
      </View>

      {/* Statystyki */}
      <View style={styles.stats}>
        <Card style={styles.statCard}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Średnia ocen</Text>
          <Text style={[styles.statValue, { color: colors.blue }]}>4,2</Text>
          <Text style={[styles.statSub, { color: colors.muted }]}>+0,2 ten semestr</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Punkty ECTS</Text>
          <Text style={[styles.statValue, { color: colors.blue }]}>162</Text>
          <Text style={[styles.statSub, { color: colors.muted }]}>z 180 punktów</Text>
        </Card>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  greeting: {
    fontSize: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 2,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 10,
    fontWeight: "bold",
  },
  semester: {
    fontSize: 9,
    marginTop: 2,
  },
  cardPadding: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  linkText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  weekGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayItem: {
    alignItems: "center",
    paddingVertical: 10,
    width: 38,
    borderRadius: 12,
    gap: 4,
  },
  dayName: {
    fontSize: 9,
    fontWeight: "600",
  },
  dayDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  sectionHeaderOuter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 4,
  },
  sectionTitleOuter: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  classItem: {
    flexDirection: "row",
    paddingVertical: 12,
    gap: 12,
  },
  timeCol: {
    width: 42,
    alignItems: "flex-start",
    gap: 2,
  },
  timeStart: {
    fontSize: 13,
    fontWeight: "bold",
  },
  timeEnd: {
    fontSize: 10,
  },
  classAccent: {
    width: 3,
    height: "100%",
    borderRadius: 3,
  },
  classInfo: {
    flex: 1,
    gap: 3,
  },
  classTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  classDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  classDetail: {
    fontSize: 10,
  },
  notificationsList: {
    gap: 10,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderLeftWidth: 4,
    gap: 12,
  },
  notifIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  notifInfo: {
    flex: 1,
    gap: 2,
  },
  notifTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  notifDesc: {
    fontSize: 9,
    lineHeight: 12,
  },
  notifTime: {
    fontSize: 9,
    marginTop: 2,
  },
  closeNotifBtn: {
    padding: 4,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    gap: 6,
  },
  emptyStateBold: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyStateText: {
    fontSize: 9,
  },
  stats: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
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
});