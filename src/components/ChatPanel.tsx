// src/components/ChatPanel.tsx
import React, { useState } from "react";
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Icon from "./Icon";
import Button from "./Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ChatPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function ChatPanel({ open, onClose }: ChatPanelProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [messages, setMessages] = useState(["Dzień dobry, w czym możemy Ci pomóc?"]);
  const [value, setValue] = useState("");

  const send = () => {
    if (!value.trim()) return;
    setMessages([...messages, value.trim()]);
    setValue("");
  };

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        
        {/* Tło przyciemniające pozwalające zamknąć czat po kliknięciu poza nim */}
        <Button style={styles.scrim} onPress={onClose} activeOpacity={1}>
            <View />
        </Button>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={[styles.panel, { backgroundColor: colors.surface, paddingBottom: Math.max(insets.bottom, 12) }]}
        >
          {/* Nagłówek czatu */}
          <View style={[styles.header, { backgroundColor: colors.blue }]}>
            <View style={styles.onlineDot} />
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Czat z BOS</Text>
              <Text style={styles.headerSub}>Jesteśmy online</Text>
            </View>
            <Button style={styles.closeBtn} onPress={onClose}>
              <Icon name="close" color="#ffffff" size={20} />
            </Button>
          </View>

          {/* Lista wiadomości */}
          <ScrollView 
            style={[styles.messagesArea, { backgroundColor: colors.bg }]} 
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((m, i) => {
              const isBot = i === 0;
              return (
                <View 
                  key={`${m}-${i}`} 
                  style={[
                    styles.messageBubble,
                    isBot ? [styles.botBubble, { backgroundColor: colors.surface }] : [styles.meBubble, { backgroundColor: colors.blue }]
                  ]}
                >
                  <Text style={[styles.messageText, { color: isBot ? colors.text : "#ffffff" }]}>
                    {m}
                  </Text>
                  <Text style={[styles.messageTime, { color: isBot ? colors.muted : "rgba(255,255,255,0.7)" }]}>
                    {isBot ? "BOS · teraz" : "Ty · teraz"}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Pole wprowadzania */}
          <View style={[styles.inputArea, { borderTopColor: colors.line }]}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.bg, color: colors.text }]}
              value={value}
              onChangeText={setValue}
              placeholder="Napisz wiadomość..."
              placeholderTextColor={colors.muted}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <Button style={[styles.sendBtn, { backgroundColor: colors.blue }]} onPress={send}>
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                <Icon name="chevron" color="#ffffff" size={18} />
              </View>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(8, 15, 31, 0.5)",
  },
  panel: {
    height: "85%", // Czat zajmie 85% ekranu po wysunięciu
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#62dc9d",
    borderWidth: 2,
    borderColor: "rgba(98,220,157,0.2)",
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  messagesArea: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    gap: 14,
  },
  messageBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 14,
    gap: 6,
  },
  botBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  meBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 12,
    lineHeight: 18,
  },
  messageTime: {
    fontSize: 9,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 12,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});