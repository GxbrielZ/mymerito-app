import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Modal, Pressable } from "react-native";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTheme } from "../theme/ThemeContext";

const photos = [
  { url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.otouczelnie.pl%2Fassets%2Fuploads%2Fartykul%2520kierunek%2Fwsb-gda%25C5%2584sk.jpg&f=1&nofb=1&ipt=4987039d17426174da14699f6bba9fce151a8b14eae3f992f65c66a28b02f657&ipo=images", title: "Nowy kampus", author: "otouczelnie.pl" },
  { url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D603606742473529&f=1&nofb=1&ipt=d1fea1a57bf39ef09d0b4e4dda130d99ecad8c721dcc34c654e9a0c8abbc96f5&ipo=images", title: "Biblioteka i strefa nauki", author: "facebook.com" },
  { url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.merito.pl%2Fgdansk%2Fsites%2Fgdansk%2Ffiles%2F2025-12%2Frw9a9557.jpg&f=1&nofb=1&ipt=4edec4fdeeacf50275bc3ceb8aca13283f840f3213dc3caadaa7ef778015cf9e&ipo=images", title: "Życie na uczelni", author: "merito.pl" },
  { url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fradiogdansk.pl%2Fwp-content%2Fuploads%2F2024%2F03%2F255387222_4696275827060327_1702732589047225997_n-001.jpg&f=1&nofb=1&ipt=3167e43623a782381c07fe89e468c76739ad4b19dc712029aa03aac7430fff53&ipo=images", title: "Wiosna na kampusie", author: "radiogdansk.pl" },
  { url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2022%2F07%2F15%2F18%2F27%2Fgdansk-7323723_1280.jpg&f=1&nofb=1&ipt=4f6a68140ac126c962b2bca29e62fb8322f85cd1e4f03bfb32c368f2911debb6&ipo=images", title: "Nasze miasto akademickie", author: "Piotr Zakrzewski" },
];

export default function GalleryScreen() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<number | null>(null);

  const showPrevious = () => {
    setSelected((current) => (current === null ? 0 : (current - 1 + photos.length) % photos.length));
  };

  const showNext = () => {
    setSelected((current) => (current === null ? 0 : (current + 1) % photos.length));
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      
      {/* Tytuł strony */}
      <View style={styles.pageTitle}>
        <Text style={[styles.eyebrow, { color: colors.blue }]}>Z życia naszej uczelni</Text>
      </View>

      {/* Siatka zdjęć */}
      <View style={styles.galleryGrid}>
        {photos.map((photo, index) => {
          const isFeatured = index === 0;
          return (
            <Button
              key={photo.url}
              style={[
                styles.galleryItem, 
                isFeatured && styles.featuredItem,
                { backgroundColor: colors.surface } // Tło pod zdjęciem, zanim się załaduje
              ]}
              onPress={() => setSelected(index)}
            >
              <Image source={{ uri: photo.url }} style={styles.galleryImage} />
              <View style={styles.galleryOverlay} />
              <View style={styles.galleryCopy}>
                <Text style={styles.galleryTitle}>{photo.title}</Text>
                <Text style={styles.galleryAuthor}>fot. {photo.author}</Text>
              </View>
            </Button>
          );
        })}
      </View>

      {/* Lightbox / Pełny ekran zdjęcia */}
      {selected !== null && (
        <Modal visible={true} transparent animationType="fade">
          <Pressable style={styles.lightbox} onPress={() => setSelected(null)}>
            
            {/* Przycisk zamknięcia */}
            <Button style={styles.lightboxClose} onPress={() => setSelected(null)}>
              <Icon name="close" color="#ffffff" size={20} />
            </Button>

            {/* Przycisk w lewo */}
            <Button
              style={[styles.lightboxNav, styles.lightboxPrev]}
              onPress={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
            >
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                <Icon name="chevron" color="#ffffff" size={20} />
              </View>
            </Button>

            {/* Wyświetlane zdjęcie w podglądzie */}
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Image
                source={{ uri: photos[selected].url }}
                style={styles.lightboxImage}
                resizeMode="contain"
              />
            </Pressable>

            {/* Przycisk w prawo */}
            <Button
              style={[styles.lightboxNav, styles.lightboxNext]}
              onPress={(e) => {
                e.stopPropagation();
                showNext();
              }}
            >
              <Icon name="chevron" color="#ffffff" size={20} />
            </Button>

            {/* Podpis pod zdjęciem */}
            <View style={styles.lightboxFooter} pointerEvents="none">
              <Text style={styles.lightboxFooterTitle}>{photos[selected].title}</Text>
              <Text style={styles.lightboxFooterSub}>fot. {photos[selected].author} · Unsplash</Text>
            </View>

          </Pressable>
        </Modal>
      )}

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
  pageTitle: {
    paddingHorizontal: 2,
    marginBottom: -4,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  galleryItem: {
    width: "48.5%",
    height: 180,
    borderRadius: 17,
    overflow: "hidden",
    position: "relative",
  },
  featuredItem: {
    width: "100%",
    height: 230,
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
  galleryOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(6,14,35,0.45)",
  },
  galleryCopy: {
    position: "absolute",
    bottom: 13,
    left: 13,
    right: 13,
    zIndex: 1,
    gap: 3,
  },
  galleryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
  },
  galleryAuthor: {
    fontSize: 7,
    color: "rgba(255,255,255,0.8)",
  },
  lightbox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: "rgba(4,9,22,0.96)", // Lightbox zawsze ma ciemne tło
    justifyContent: "center",
    alignItems: "center",
  },
  lightboxClose: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  lightboxNav: {
    position: "absolute",
    top: "50%",
    width: 44,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  lightboxPrev: {
    left: 12,
  },
  lightboxNext: {
    right: 12,
  },
  lightboxImage: {
    width: 320,
    height: 320,
    borderRadius: 12,
  },
  lightboxFooter: {
    position: "absolute",
    bottom: 30,
    left: 22,
    right: 22,
    gap: 4,
  },
  lightboxFooterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  lightboxFooterSub: {
    fontSize: 9,
    color: "rgba(255,255,255,0.7)",
  },
});