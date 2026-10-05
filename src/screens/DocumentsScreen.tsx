import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { IconName } from "../types";
import { useTheme } from "../theme/ThemeContext";

export default function DocumentsScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Wszystkie");
  const { colors } = useTheme();
  
  const docs: [string, string, IconName][] = [
    ["Podanie o stypendium rektora", "Wniosek · PDF", "file"], // UWAGA: Wcześniej miało "Wniosek", zmienimy na "Podanie" dla spójności
    ["Zaświadczenie o statusie studenta", "Zaświadczenie · PDF", "check"],
    ["Wniosek o urlop dziekański", "Wniosek · DOCX", "calendar"],
    ["Podanie o indywidualną organizację studiów", "Podanie · PDF", "user"],
    ["Regulamin studiów 2025/2026", "Regulamin · PDF", "book"],
    ["Wniosek o wydanie duplikatu legitymacji", "Wniosek · PDF", "card"]
  ];

  // Poprawienie literówki w typie pierwszego dokumentu, żeby pasował do tytułu "Podanie..."
  docs[0][1] = "Podanie · PDF";

  const filters = ["Wszystkie", "Wnioski", "Podania", "Zaświadczenia"];

  const filtered = docs.filter((doc) => {
    // Sprawdzamy dopasowanie tekstu
    const matchesQuery = doc[0].toLowerCase().includes(query.toLowerCase());
    
    // Sprawdzamy dopasowanie kategorii
    let matchesCategory = true;
    if (activeFilter === "Wnioski") {
      matchesCategory = doc[1].includes("Wniosek");
    } else if (activeFilter === "Podania") {
      matchesCategory = doc[1].includes("Podanie");
    } else if (activeFilter === "Zaświadczenia") {
      matchesCategory = doc[1].includes("Zaświadczenie");
    }

    return matchesQuery && matchesCategory;
  });

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Pasek wyszukiwania */}
      <View style={[styles.searchField, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        <Icon name="search" size={19} color={colors.muted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          value={query}
          onChangeText={setQuery}
          placeholder="Szukaj dokumentu..."
          placeholderTextColor={colors.muted}
        />
      </View>

      {/* Filtry (przewijane w poziomie) */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <Button 
                key={filter}
                style={[
                  styles.chip, 
                  isActive 
                    ? { backgroundColor: colors.blue, borderColor: colors.blue } 
                    : { backgroundColor: colors.surface, borderColor: colors.line }
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.chipText, 
                  isActive ? styles.chipTextActive : { color: colors.text }
                ]}>
                  {filter}
                </Text>
              </Button>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista dokumentów */}
      <View style={styles.documentList}>
        {filtered.map((doc) => (
          <Card key={doc[0]} style={styles.documentRow}>
            <View style={[styles.docIcon, { backgroundColor: colors.blueLight }]}>
              <Icon name={doc[2]} color={colors.blue} size={19} />
            </View>
            <View style={styles.docInfo}>
              <Text style={[styles.docTitle, { color: colors.text }]}>{doc[0]}</Text>
              <Text style={[styles.docSub, { color: colors.muted }]}>{doc[1]}</Text>
            </View>
            <Button style={styles.downloadBtn}>
              <Icon name="download" color={colors.blue} size={19} />
            </Button>
          </Card>
        ))}

        {/* Pusty stan, gdy nic nie znaleziono */}
        {!filtered.length && (
          <Card style={styles.emptyState}>
            <Icon name="search" color={colors.muted} size={24} />
            <Text style={[styles.emptyStateBold, { color: colors.text }]}>Brak wyników</Text>
            <Text style={[styles.emptyStateText, { color: colors.muted }]}>Spróbuj wpisać inną frazę lub zmień filtr.</Text>
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
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    height: "100%",
  },
  filterWrapper: {
    marginHorizontal: -20,
  },
  filterChips: {
    paddingHorizontal: 20,
    gap: 7,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 99,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 10,
    fontWeight: "700",
  },
  chipTextActive: {
    color: "#ffffff",
  },
  documentList: {
    gap: 9,
  },
  documentRow: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  docInfo: {
    flex: 1,
    gap: 4,
  },
  docTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  docSub: {
    fontSize: 9,
  },
  downloadBtn: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
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