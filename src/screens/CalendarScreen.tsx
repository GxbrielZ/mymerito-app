import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

export default function CalendarScreen() {
  const { colors } = useTheme();
  
  const [monthOffset, setMonthOffset] = useState(0);
 const [selectedDate, setSelectedDate] = useState<number | null>(19);
  
  const baseYear = 2026;
  const baseMonth = 8; // Wrzesień
  const visibleDate = new Date(baseYear, baseMonth + monthOffset, 1);
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  
  const dates = Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - firstDay + 1;
    return day > 0 && day <= daysInMonth ? String(day) : "";
  });
  
  const weekendDays = Array.from({ length: daysInMonth }, (_, index) => index + 1).filter((day) => {
    const weekday = new Date(year, month, day).getDay();
    return weekday === 0 || weekday === 6;
  });
  
  const classDays = weekendDays.filter((day) => {
    const weekday = new Date(year, month, day).getDay();
    const weekIndex = Math.floor((firstDay + day - 1) / 7);
    if (weekIndex % 3 !== 2) return true;
    return (month + weekIndex) % 2 === 0 ? weekday === 6 : weekday === 0;
  });
  
  const activeDay = selectedDate ?? classDays[0] ?? 1;
  const activeWeekday = new Date(year, month, activeDay).getDay();
  const hasClasses = classDays.includes(activeDay);
  const monthLabel = `${monthNames[month]} ${year}`;
  const scheduleVariant = Math.abs(monthOffset + activeDay) % 3;
  
  const schedules = [
    [
      ["08:00", "09:30", "Zaawansowane proj. aplikacji mobilnych", "dr Anna Wiśniewska", "C214", "#8257dc"],
      ["09:45", "11:15", "Projekt wdrożeniowy", "dr Piotr Kowalski", "B112", colors.blue],
      ["11:30", "13:00", "Bazy danych NoSQL", "mgr inż. Jan Borkowski", "A307", "#8257dc"],
    ],
    [
      ["08:30", "10:00", "Algorytmy i struktury danych", "dr hab. Marek Zieliński", "A105", colors.blue],
      ["10:15", "11:45", "Przygotowanie studenta do rynku pracy", "mgr Julia Kaczmarek", "C118", "#8257dc"],
      ["12:00", "13:30", "Projekt wdrożeniowy", "dr Piotr Kowalski", "B205", colors.blue],
    ],
    [
      ["09:00", "10:30", "Bazy danych NoSQL", "mgr inż. Jan Borkowski", "A312", "#8257dc"],
      ["10:45", "12:15", "Aplikacje mobilne", "dr Anna Wiśniewska", "C209", colors.blue],
    ],
  ];
  
  const schedule = hasClasses
    ? activeWeekday === 0
      ? schedules[scheduleVariant].slice(0, 2)
      : schedules[scheduleVariant]
    : [];
    
  const changeMonth = (direction: number) => {
    setMonthOffset(monthOffset + direction);
    setSelectedDate(null);
  };

  const getEventColor = (colorName: string) => {
    if (colorName === "red") return colors.danger;
    if (colorName === "orange") return colors.warning;
    if (colorName === "purple") return "#8257dc";
    return colors.blue;
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Kontrolki miesiąca i siatka */}
      <Card style={styles.monthCard}>
        <View style={styles.monthHead}>
          <Button style={[styles.monthBtn, { borderColor: colors.line, backgroundColor: colors.surface }]} onPress={() => changeMonth(-1)}>
            <Text style={[styles.monthBtnText, { color: colors.blue }]}>‹</Text>
          </Button>
          <Text style={[styles.monthLabelText, { color: colors.text }]}>{monthLabel}</Text>
          <Button style={[styles.monthBtn, { borderColor: colors.line, backgroundColor: colors.surface }]} onPress={() => changeMonth(1)}>
            <Text style={[styles.monthBtnText, { color: colors.blue }]}>›</Text>
          </Button>
        </View>
        
        <View style={styles.calendarGrid}>
          {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"].map((d) => (
            <View key={d} style={styles.dayHeaderCell}>
              <Text style={[styles.dayHeaderText, { color: colors.muted }]}>{d}</Text>
            </View>
          ))}
          
          {dates.map((d, i) => {
            const isSelected = d === String(activeDay);
            const isClassDay = classDays.includes(Number(d));
            return (
              <View key={`${monthLabel}-${i}`} style={styles.dayCellWrapper}>
                <Button 
                  disabled={!d} 
                  style={[
                    styles.dayCell, 
                    isSelected && { backgroundColor: colors.blue }
                  ]}
                  onPress={() => d && setSelectedDate(Number(d))}
                >
                  <Text style={[
                    styles.dayCellText, 
                    { color: colors.text },
                    isSelected && styles.dayCellTextSelected
                  ]}>
                    {d}
                  </Text>
                  {isClassDay && !isSelected && <View style={[styles.eventDot, { backgroundColor: colors.blue }]} />}
                </Button>
              </View>
            );
          })}
        </View>
      </Card>

      {/* Plan wybranego dnia */}
      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Plan wybranego dnia</Text>
        <Text style={[styles.sectionTitleBold, { color: colors.blue }]}>{activeDay} {monthNames[month].slice(0, 3).toLowerCase()}</Text>
      </View>

      {schedule.length ? (
        <Card style={styles.classesCard}>
          {schedule.map((lesson, idx) => (
            <View style={[styles.classRow, idx > 0 && { borderTopColor: colors.line, borderTopWidth: 1 }]} key={lesson[2]}>
              <View style={styles.timeCol}>
                <Text style={[styles.timeBold, { color: colors.blue }]}>{lesson[0]}</Text>
                <Text style={[styles.timeSpan, { color: colors.muted }]}>{lesson[1]}</Text>
              </View>
              <View style={[styles.classAccent, { backgroundColor: lesson[5] }]} />
              <View style={styles.classInfo}>
                <Text style={[styles.classTitle, { color: colors.text }]}>{lesson[2]}</Text>
                <View style={styles.classDetailRow}>
                  <Icon name="user" size={13} color={colors.muted} />
                  <Text style={[styles.classDetailText, { color: colors.muted }]}>{lesson[3]}</Text>
                </View>
                <View style={styles.classDetailRow}>
                  <Icon name="pin" size={13} color={colors.muted} />
                  <Text style={[styles.classDetailText, { color: colors.muted }]}>{lesson[4]} · Zajęcia</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      ) : (
        <Card style={styles.emptyState}>
          <Icon name="calendar" color={colors.muted} size={24} />
          <Text style={[styles.emptyStateBold, { color: colors.text }]}>Brak zajęć w tym dniu</Text>
          <Text style={[styles.emptyStateText, { color: colors.muted }]}>Wybierz oznaczoną kropką sobotę lub niedzielę, aby zobaczyć plan.</Text>
        </Card>
      )}

      {/* Terminy w miesiącu */}
      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Terminy w miesiącu</Text>
      </View>
      
      <View style={styles.eventList}>
        {[
          [String(Math.min(28, daysInMonth)), monthNames[month].slice(0, 3).toUpperCase(), "Projekt końcowy", "Aplikacje mobilne · dr Anna Wiśniewska · C214", "red"], 
          [String(Math.min(20, daysInMonth)), monthNames[month].slice(0, 3).toUpperCase(), "Kolokwium", "Bazy danych NoSQL · mgr inż. Jan Borkowski · A307", "orange"], 
          [String(Math.min(5, daysInMonth)), monthNames[month].slice(0, 3).toUpperCase(), "Opłata za semestr", "930 zł", "purple"]
        ].map((e) => (
          <Card key={`${monthLabel}-${e[0]}-${e[2]}`} style={styles.eventRow}>
            <View style={[styles.eventDateBlock, { borderRightColor: colors.line, borderRightWidth: 1 }]}>
              <Text style={[styles.eventDateBold, { color: getEventColor(e[4]) }]}>{e[0]}</Text>
              <Text style={[styles.eventDateSub, { color: getEventColor(e[4]) }]}>{e[1]}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={[styles.eventInfoBold, { color: colors.text }]}>{e[2]}</Text>
              <Text style={[styles.eventInfoText, { color: colors.muted }]}>{e[3]}</Text>
            </View>
            <View style={[styles.eventIndicatorDot, { backgroundColor: getEventColor(e[4]) }]} />
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
  monthCard: {
    padding: 14,
  },
  monthHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  monthBtn: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  monthBtnText: {
    fontSize: 23,
    marginTop: -4,
  },
  monthLabelText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayHeaderCell: {
    width: "14.28%",
    alignItems: "center",
    paddingVertical: 4,
  },
  dayHeaderText: {
    fontSize: 9,
    fontWeight: "700",
  },
  dayCellWrapper: {
    width: "14.28%",
    aspectRatio: 1,
    padding: 2,
  },
  dayCell: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCellText: {
    fontSize: 11,
  },
  dayCellTextSelected: {
    color: "#ffffff",
    fontWeight: "800",
  },
  eventDot: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    bottom: 4,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
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
  classesCard: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  classRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  timeCol: {
    width: 48,
    gap: 2,
  },
  timeBold: {
    fontSize: 13,
    fontWeight: "bold",
  },
  timeSpan: {
    fontSize: 10,
  },
  classAccent: {
    width: 3,
    height: 45,
    borderRadius: 3,
  },
  classInfo: {
    flex: 1,
    gap: 5,
  },
  classTitle: {
    fontSize: 13,
    fontWeight: "bold",
  },
  classDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  classDetailText: {
    fontSize: 10,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    gap: 6,
    shadowColor: "#243c6e",
    shadowOpacity: 0.08,
    elevation: 4,
  },
  emptyStateBold: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyStateText: {
    fontSize: 9,
    textAlign: "center",
  },
  eventList: {
    gap: 9,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 13,
    gap: 12,
  },
  eventDateBlock: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  eventDateBold: {
    fontSize: 17,
    fontWeight: "bold",
  },
  eventDateSub: {
    fontSize: 8,
    fontWeight: "bold",
  },
  eventInfo: {
    flex: 1,
    gap: 3,
  },
  eventInfoBold: {
    fontSize: 11,
    fontWeight: "bold",
  },
  eventInfoText: {
    fontSize: 9,
  },
  eventIndicatorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
});