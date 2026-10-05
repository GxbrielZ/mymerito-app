import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

export default function KnowledgeScreen() {
  const { colors } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const contacts = [
    ["AW", "dr Anna Wiśniewska", "anna.wisniewska@merito.pl"],
    ["PK", "dr Piotr Kowalski", "piotr.kowalski@merito.pl"],
    ["MZ", "dr hab. Marek Zieliński", "marek.zielinski@merito.pl"]
  ];

  const faq = [
    ["Jak uzyskać zaświadczenie o studiowaniu?", "W zakładce Dokumenty wybierz „Zaświadczenie o statusie studenta”. Dokument wygeneruje się automatycznie w formacie PDF."],
    ["Gdzie mogę sprawdzić termin płatności?", "Wszystkie bieżące i przyszłe należności znajdziesz w zakładce Płatności i świadczenia."],
    ["Jak zgłosić nieobecność na zajęciach?", "Skontaktuj się bezpośrednio z prowadzącym przez podany adres e-mail i dołącz stosowne usprawiedliwienie."],
    ["Jak zapisać się na egzamin poprawkowy?", "Termin poprawkowy pojawi się automatycznie w kalendarzu po wpisaniu oceny niedostatecznej."]
  ];

  const filteredContacts = contacts.filter((c) => 
    c[1].toLowerCase().includes(query.toLowerCase()) || 
    c[2].toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaq = faq.filter((item) => 
    item[0].toLowerCase().includes(query.toLowerCase()) || 
    item[1].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Pasek wyszukiwania */}
      <View style={[styles.searchField, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        <Icon name="search" size={19} color={colors.muted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          value={query}
          onChangeText={setQuery}
          placeholder="Szukaj w bazie wiedzy..."
          placeholderTextColor={colors.muted}
        />
      </View>

      {/* Sekcja: Kontakt do wykładowców */}
      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Kontakt do wykładowców</Text>
        <Text style={[styles.sectionTitleBold, { color: colors.blue }]}>Semestr 6</Text>
      </View>

      <View style={styles.sectionContainer}>
        {filteredContacts.length > 0 ? (
          <Card style={styles.listCard}>
            {filteredContacts.map((c, index) => (
              <View 
                key={c[0]} 
                style={[
                  styles.contactRow, 
                  index > 0 && { borderTopWidth: 1, borderTopColor: colors.line }
                ]}
              >
                <View style={[styles.avatarTiny, { backgroundColor: colors.blue }]}>
                  <Text style={styles.avatarTinyText}>{c[0]}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactName, { color: colors.text }]}>{c[1]}</Text>
                  <Text style={[styles.contactEmail, { color: colors.muted }]}>{c[2]}</Text>
                </View>
                <Button style={styles.mailBtn}>
                  <Icon name="mail" size={19} color={colors.blue} />
                </Button>
              </View>
            ))}
          </Card>
        ) : (
          <Card style={styles.emptyState}>
            <Icon name="search" color={colors.muted} size={24} />
            <Text style={[styles.emptyStateBold, { color: colors.text }]}>Brak wyników</Text>
            <Text style={[styles.emptyStateText, { color: colors.muted }]}>Nie znaleziono wykładowcy.</Text>
          </Card>
        )}
      </View>

      {/* Sekcja: Najczęstsze pytania */}
      <View style={styles.sectionTitle}>
        <Text style={[styles.headingSpan, { color: colors.muted }]}>Najczęstsze pytania</Text>
      </View>

      <View style={styles.sectionContainer}>
        {filteredFaq.length > 0 ? (
          <Card style={styles.listCard}>
            {filteredFaq.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <View 
                  key={item[0]} 
                  style={[
                    styles.faqItem, 
                    index > 0 && { borderTopWidth: 1, borderTopColor: colors.line }
                  ]}
                >
                  <Button 
                    style={styles.faqButton} 
                    onPress={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <Text style={[styles.faqQuestion, { color: colors.text }]}>{item[0]}</Text>
                    <View style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}>
                      <Icon name="chevron" size={17} color={colors.muted} />
                    </View>
                  </Button>
                  
                  {isOpen && (
                    <Text style={[styles.faqAnswer, { color: colors.muted }]}>{item[1]}</Text>
                  )}
                </View>
              );
            })}
          </Card>
        ) : (
          <Card style={styles.emptyState}>
            <Icon name="search" color={colors.muted} size={24} />
            <Text style={[styles.emptyStateBold, { color: colors.text }]}>Brak wyników</Text>
            <Text style={[styles.emptyStateText, { color: colors.muted }]}>Nie znaleziono odpowiedzi na to pytanie.</Text>
          </Card>
        )}
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
  searchField: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    shadowColor: "#243c6e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    height: "100%",
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
  sectionContainer: {
    gap: 9,
  },
  listCard: {
    paddingVertical: 4,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  avatarTiny: {
    width: 35,
    height: 35,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTinyText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
  contactInfo: {
    flex: 1,
    gap: 3,
  },
  contactName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  contactEmail: {
    fontSize: 9,
  },
  mailBtn: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  faqItem: {
    flexDirection: "column",
  },
  faqButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    width: "100%",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
  },
  faqAnswer: {
    marginTop: -2,
    marginBottom: 14,
    marginHorizontal: 15,
    fontSize: 10,
    lineHeight: 15.5,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    gap: 6,
    shadowOpacity: 0,
    elevation: 0,
  },
  emptyStateBold: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyStateText: {
    fontSize: 9,
  },
});