# MyMerito - Aplikacja Mobilna 🎓

Mobilna aplikacja uczelniana stworzona w **React Native** (przy użyciu środowiska **Expo**).

Aplikacja posiada rozbudowaną nawigację (Drawer + Bottom Navigation) oraz w pełni spójny, dynamiczny **tryb jasny i ciemny** (Dark Mode).

## 🚀 Wymagania wstępne

Aby uruchomić ten projekt lokalnie na swoim komputerze, potrzebujesz:
* Zainstalowanego środowiska [Node.js](https://nodejs.org/) (zalecana wersja LTS).
* Zainstalowanego systemu kontroli wersji [Git](https://git-scm.com/).
* Aplikacji **Expo Go** zainstalowanej na Twoim smartfonie (dostępna w App Store i Google Play) lub skonfigurowanego emulatora Android/iOS na komputerze. Aplikację można również uruchomić w przeglądarce.

## 🛠️ Instalacja i uruchomienie

Postępuj zgodnie z poniższymi krokami, aby uruchomić aplikację:

**1. Sklonuj repozytorium**
Otwórz terminal i wpisz:
\`\`\`bash
git clone https://github.com/GxbrielZ/mymerito-app.git
\`\`\`

**2. Przejdź do folderu projektu**
\`\`\`bash
cd mymerito-app
\`\`\`

**3. Zainstaluj zależności**
Pobierz wszystkie wymagane pakiety za pomocą menedżera npm:
\`\`\`bash
npm install
\`\`\`

**4. Uruchom serwer deweloperski Expo**
\`\`\`bash
npx expo start
\`\`\`

## 📱 Jak testować aplikację?

Po uruchomieniu komendy `npx expo start`, w terminalu (oraz w oknie przeglądarki) pojawi się kod QR.

* **Android:** Otwórz aplikację Expo Go na swoim telefonie i zeskanuj kod QR.
* **iOS (iPhone):** Otwórz domyślną aplikację Aparat, nakieruj na kod QR i kliknij powiadomienie, aby otworzyć projekt w Expo Go.
* **Emulator:** Jeśli masz włączony emulator Android Studio lub symulator iOS, wciśnij w terminalu odpowiednio klawisz `a` (Android) lub `i` (iOS).

## 📂 Struktura projektu

Główny kod źródłowy znajduje się w folderze `src/`:
* `/components` - reużywalne elementy interfejsu (Card, Button, Header, BottomNav).
* `/screens` - główne widoki aplikacji (Pulpit, Kalendarz, Oceny, Płatności itp.).
* `/theme` - mechanizm zarządzania motywami (ThemeContext.tsx) oraz definicje kolorów.