import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

export default function FacultyScreen() {
  const { colors, isDark } = useTheme();

  const faculty = [
    { id: 1, name: "dr Anna Wiśniewska", subject: "Zaawansowane proj. aplikacji mobilnych" },
    { id: 2, name: "dr Piotr Kowalski", subject: "Projekt wdrożeniowy" },
    { id: 3, name: "dr hab. Marek Zieliński", subject: "Algorytmy i struktury danych" },
    { id: 4, name: "mgr inż. Jan Borkowski", subject: "Bazy danych NoSQL" },
    { id: 5, name: "mgr Julia Kaczmarek", subject: "Przygotowanie studenta do rynku pracy" },
  ];

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<string[]>([]);

  // Dynamiczny kolor dla banera - jasny w trybie ciemnym, niebieski w jasnym
  const bannerTextColor = isDark ? colors.text : colors.blue;

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Karta informacyjna */}
      <Card style={[styles.infoCard, { backgroundColor: colors.blueLight, shadowOpacity: 0, elevation: 0 }]}>
        <View style={styles.infoIconWrapper}>
          <Icon name="star" color={bannerTextColor} size={22} />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={[styles.infoTitle, { color: bannerTextColor }]}>Ankiety ewaluacyjne</Text>
          <Text style={[styles.infoDesc, { color: bannerTextColor, opacity: 0.8 }]}>
            Oceny są w pełni anonimowe. Twoja opinia pomaga nam podnosić jakość kształcenia.
          </Text>
        </View>
      </Card>

      {/* Lista wykładowców */}
      <View style={styles.facultyList}>
        {faculty.map((person, index) => {
          const isSubmitted = submitted.includes(person.name);
          const currentRating = ratings[person.name] || 0;
          
          // Pobieramy pierwszą literę nazwiska i dodajemy numer z indexu dla awatara
          const avatarInitial = person.name.split(" ").slice(-1)[0][0] + (index + 1);

          return (
            <Card style={styles.facultyCard} key={person.id}>
              {/* Nagłówek wykładowcy */}
              <View style={styles.facultyHead}>
                <View style={[styles.avatarSmall, { backgroundColor: colors.blue }]}>
                  <Text style={styles.avatarText}>{avatarInitial}</Text>
                </View>
                <View style={styles.facultyInfo}>
                  <Text style={[styles.facultyName, { color: colors.text }]}>{person.name}</Text>
                  <Text style={[styles.facultySubject, { color: colors.muted }]}>{person.subject}</Text>
                </View>
              </View>

              {/* Sekcja oceny lub podziękowanie */}
              {isSubmitted ? (
                <View style={[styles.submittedBox, { backgroundColor: colors.success + "15" }]}>
                  <Icon name="check" size={17} color={colors.success} />
                  <Text style={[styles.submittedText, { color: colors.success }]}>Dziękujemy za Twoją ocenę</Text>
                </View>
              ) : (
                <View>
                  {/* Gwiazdki */}
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button 
                        key={star} 
                        style={styles.starBtn}
                        onPress={() => setRatings({ ...ratings, [person.name]: star })}
                      >
                        <Icon 
                          name="star" 
                          color={colors.warning} 
                          fill={currentRating >= star ? colors.warning : "none"} 
                        />
                      </Button>
                    ))}
                  </View>

                  {/* Pole na komentarz */}
                  <TextInput
                    style={[
                      styles.commentInput, 
                      { backgroundColor: colors.bg, borderColor: colors.line, color: colors.text }
                    ]}
                    placeholder="Dodaj komentarz (opcjonalnie)"
                    placeholderTextColor={colors.muted}
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                  />

                  {/* Przycisk wysyłania */}
                  <Button 
                    style={[
                      styles.secondaryBtn, 
                      { borderColor: currentRating ? colors.blue : colors.muted }
                    ]} 
                    disabled={!currentRating}
                    onPress={() => setSubmitted([...submitted, person.name])}
                  >
                    <Text style={[
                      styles.secondaryBtnText, 
                      { color: currentRating ? colors.blue : colors.muted }
                    ]}>
                      Prześlij ocenę
                    </Text>
                  </Button>
                </View>
              )}
            </Card>
          );
        })}
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
  infoCard: {
    flexDirection: "row",
    padding: 16,
    gap: 14,
    alignItems: "center",
  },
  infoIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextContainer: {
    flex: 1,
    gap: 4,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  infoDesc: {
    fontSize: 9,
    lineHeight: 13,
  },
  facultyList: {
    gap: 9,
  },
  facultyCard: {
    padding: 15,
  },
  facultyHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
  },
  facultyInfo: {
    flex: 1,
    gap: 3,
  },
  facultyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  facultySubject: {
    fontSize: 9,
  },
  starsRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 9,
  },
  starBtn: {
    padding: 2,
  },
  commentInput: {
    width: "100%",
    minHeight: 57,
    borderWidth: 1,
    borderRadius: 11,
    padding: 10,
    fontSize: 10,
    marginBottom: 8,
  },
  secondaryBtn: {
    width: "100%",
    height: 37,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    fontSize: 11,
    fontWeight: "700",
  },
  submittedBox: {
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  submittedText: {
    fontSize: 11,
    fontWeight: "700",
  },
});