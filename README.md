# Bastion Pamięci: Szlakiem Uskoka i Wiktora w Lubartowie

## Opis projektu

Interaktywna strona projektu typu Sparkpage poświęcona żołnierzom podziemia niepodległościowego działającym w powiecie lubartowskim w latach 1944–1953. Projekt edukuje mieszkańców Lubartowa o „wstydliwej karcie" miasta i oddaje hołd 119 żołnierzom oddziału kpt. Zdzisława Brońskiego „Uskoka".

---

## ✅ Zrealizowane funkcje

### 1. Hero Section – Sekcja wejściowa
- Klimatyczny nagłówek z efektem konspiracyjnym (stempel „ŚCIŚLE TAJNE")
- Podtytuł: „Cyfrowe archiwum 119 żołnierzy oddziału kpt. Zdzisława Brońskiego"
- Animowane liczniki (119 żołnierzy, 9 lat oporu, 12 miejsc pamięci)
- Cytaty z pamiętnika Uskoka
- Efekt glitch na tytule, parallax scroll

### 2. Sekcja „Uskok" – Kpt. Zdzisław Broński
- Pełny biogram oparty na archiwach IPN (IPN Lu 0264/19)
- Karta operacyjna z sygnatury i pseudonimy
- Chronologiczna oś czasu walk 1941–1949
- Opis ostatniego bunkra w Dąbrówce (Nowogród)

### 3. Sekcja „Wiktor" – Ppor. Stanisław Kuchciewicz
- Biogram ostatniego dowódcy oporu (1949–1953) w powiecie lubartowskim
- Chronologia po śmierci Uskoka
- Karta operacyjna z sygnaturami IPN i Prezydenta RP
- „Raport PUBP" jako element narracyjny

### 4. Interaktywna Mapa „Czarnej Historii"
- Leaflet.js z ciemną warstwą CartoDB
- 12 punktów historycznych powiatu lubartowskiego
- Kategorie: Represje (czerwony), Walki (pomarańczowy), Bunkry (zielony), Pamięć (niebieski)
- Filtry kategorii z legendą
- Popup z pełnym opisem, datą, adresem i źródłem
- Lista kart punktów pod mapą z klikalnymi odnośnikami do mapy
- Sepia-filter na warstwie mapowej

### 5. Galeria Chwały
- 12 kart żołnierzy (z 119 archiwizowanych)
- Filtry: Wszyscy / Dowódcy / Partyzanci / Polegli
- Karty z rankingiem, pseudonimem, rolą i sygnaturą z programu Mateusz/Stitch
- Modal ze szczegółami po kliknięciu
- Animacje wejścia z opóźnieniem

### 6. Sekcja Badawcza „Ciągłość Oporu"
- Porównanie okupacji hitlerowskiej (1939–1944) z komunistyczną (1944–1953)
- Fakty historyczne z bibliografii „Lubartów i Ziemia Lubartowska"
- Panel bibliograficzny z sygnaturami IPN
- Linki do zewnętrznych zasobów cyfrowych (IPN, przystanekhistoria.pl)

### 7. Elementy techniczne
- Responsywna nawigacja z mobile menu
- Progress bar czytania (góra strony)
- Scroll-to-top button
- Animacje fade-in przez Intersection Observer
- Animowane liczniki hero stats
- Efekt glitch na tytule
- Parallax scroll w hero

---

## 🗂️ Struktura plików

```
index.html          – Główna strona projektu
css/
  style.css         – Wszystkie style (archiwalne, sepialny motyw)
js/
  data.js           – Dane historyczne (mapa, żołnierze, bibliografia)
  map.js            – Logika interaktywnej mapy Leaflet.js
  gallery.js        – Galeria kart i modal żołnierzy
  main.js           – Nawigacja, animacje, efekty
README.md           – Dokumentacja projektu
```

---

## 🗺️ Punkty na mapie (12 lokalizacji)

| Typ | Miejscowość | Opis |
|-----|-------------|------|
| Represje | PUBP Lubartów | Siedziba UB, Al. 1000-lecia 4 |
| Represje | Więzienie Lubartów | Areszt podległy PUBP |
| Represje | Zamek Lublin (WUBP) | Centrum represji |
| Walki | Piaski | Śmierć „Wiktora" 10.02.1953 |
| Walki | Zezulin | Starcia 1944-1951 |
| Walki | Gmina Spiczyn | Teren operacji oddziału |
| Walki | Serniki | Obszar działania |
| Bunkry | Dąbrówka (Nowogród) | Ostatni bunkier Uskoka |
| Pamięć | Radzic Stary | Miejsce urodzenia Uskoka |
| Pamięć | Kościół farny Lubartów | Centrum pamięci |
| Pamięć | Lubartów centrum | Siedziba Obwodu WiN |
| Pamięć | Łęczna | Miejsce urodzenia Wiktora |

---

## 📚 Główne źródła historyczne

- IPN Lu 0264/19 – Akta operacyjne Zdzisława Brońskiego „Uskoka"
- podziemiezbrojne.ipn.gov.pl – biogramy żołnierzy wyklętych
- slady.ipn.gov.pl – Śladami Zbrodni (miejsca represji 1944-56)
- Broński Z.: *Pamiętnik (wrzesień 1939 – maj 1949)*, IPN Lublin
- Wiejak J.: *Wrzesień i okupacja* // Lubartów i Ziemia Lubartowska, T.8, 1980
- Sławecki L.: *Wspomnienia lubartowianina...* // LiZL, T.10, 1986

---

## 🎨 Styl wizualny

- **Kolory**: sepia (#f5e6c8), czerń (#0d0d0d), głęboka czerwień (#8b0000), złoto (#c9a227)
- **Czcionki**: Special Elite (maszyna do pisania nagłówki), Libre Baskerville (body), Courier Prime (mono/archiwalne)
- **Motyw**: archiwum konspiracyjne, stempel, stare dokumenty, szum filmowy

---

## 🔧 Nie zaimplementowane (do rozwinięcia)

- [ ] Backend CMS do zarządzania żołnierzami (wymaga serwera)
- [ ] Zdjęcia archiwalne z programu Stitch (wymagają licencji/upload)
- [ ] Pełna baza 119 żołnierzy (aktualnie 12 przykładowych kart)
- [ ] Integracja z bazą danych Mateusz (wymaga API)
- [ ] Wersja PDF/druk raportu historycznego
- [ ] Audio nagrania wspomnień świadków

---

## 📌 Rekomendowane kolejne kroki

1. **Wgranie zdjęć** – Dodanie rzeczywistych fotografii archiwalnych z IPN/Stitch do kart żołnierzy
2. **Rozbudowa bazy** – Uzupełnienie danych wszystkich 119 żołnierzy oddziału
3. **Nawiązanie współpracy** – Kontakt z IPN Lublin i Lubartowskim Towarzystwem Regionalnym
4. **Integracja z Google Maps** – Prawa do szczegółowszej mapy z oznaczeniami
5. **SEO lokalne** – Optymalizacja dla wyszukiwań lubartowskich i regionalnych

---

## 📞 Kontakt i archiwum

- IPN Oddział w Lublinie: ul. Szewska 2, 20-086 Lublin
- podziemiezbrojne.ipn.gov.pl
- slady.ipn.gov.pl

---



*Projekt dedykowany mieszkańcom Lubartowa i pamięci niezłomnych żołnierzy podziemia niepodległościowego.*

**Cześć i Chwała Bohaterom** ✝
