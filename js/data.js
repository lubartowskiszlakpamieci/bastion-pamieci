/**
 * BASTION PAMIĘCI - Dane historyczne
 * Dane map, galerii i archiwum żołnierzy
 */

// ===================================================
// DANE MAPY - Punkty historyczne Lubartowa i okolic
// ===================================================
const MAP_POINTS = [
    {
        id: 'pubp',
        name: 'Siedziba PUBP w Lubartowie',
        lat: 51.4624,
        lng: 22.6025,
        type: 'represje',
        description: 'Powiatowy Urząd Bezpieczeństwa Publicznego – centrum tortur i przesłuchań. Przez areszty PUBP przeszły setki mieszkańców powiatu lubartowskiego, w tym rodziny partyzantów „Uskoka". Siedziba przy Al. 1000-lecia 4.',
        date: '1944–1956',
        address: 'Al. 1000-lecia 4, Lubartów',
        source: 'IPN – Śladami Zbrodni (slady.ipn.gov.pl)',
        importance: 'high'
    },
    {
        id: 'areszt',
        name: 'Dawne więzienie w Lubartowie',
        lat: 51.4645,
        lng: 22.6010,
        type: 'represje',
        description: 'Tymczasowy areszt podległy PUBP. Przetrzymywano tu aresztowanych żołnierzy AK-WiN i osoby podejrzane o współpracę z oddziałem „Uskoka". Brutalne przesłuchania i tortury były normą.',
        date: '1944–1956',
        address: 'Lubartów (centrum)',
        source: 'IPN – Śladami Zbrodni',
        importance: 'high'
    },
    {
        id: 'kosciol-lubartow',
        name: 'Kościół Farny Wniebowzięcia NMP',
        lat: 51.4630,
        lng: 22.6040,
        type: 'pamiec',
        description: 'Parafia farna w Lubartowie – duchowe centrum oporu. Wielu żołnierzy „Uskoka" było praktykującymi katolikami. Po 1989 r. odprawiane są msze za żołnierzy wyklętych z powiatu lubartowskiego.',
        date: '1944–dziś',
        address: 'ul. Lubelska, Lubartów',
        source: 'Lubartów i Ziemia Lubartowska',
        importance: 'medium'
    },
    {
        id: 'radzic-stary',
        name: 'Radzic Stary – miejsce urodzenia Uskoka',
        lat: 51.3940,
        lng: 22.5950,
        type: 'pamiec',
        description: 'Wieś w gminie Spiczyn, gdzie 24 grudnia 1912 r. urodził się Zdzisław Broński „Uskok". To tutaj zorganizował pierwszą komórkę konspiracyjną AK w 1941 r. i skąd wyruszał na pierwsze akcje dywersyjne.',
        date: '1912 – 1943',
        address: 'Radzic Stary, gm. Spiczyn, pow. Lubartów',
        source: 'IPN Lu 0264/19; biogram IPN',
        importance: 'high'
    },
    {
        id: 'dabrowka',
        name: 'Dąbrówka (Nowogród) – bunkier Uskoka',
        lat: 51.3580,
        lng: 22.6120,
        type: 'bunkry',
        description: 'Ostatnie schronienie kpt. Zdzisława Brońskiego „Uskoka". 21 maja 1949 r. bunkier w gospodarstwie rodziny Lisowskich otoczono przez grupę operacyjną UB-KBW. „Uskok" zdetonował granat, wybierając śmierć. W 2013 r. dokonano ekshumacji – spoczywa z honorami w Lublinie.',
        date: '1947–1949',
        address: 'Dąbrówka (ob. Nowogród), pow. łęczyński',
        source: 'przystanekhistoria.pl; IPN Lu 0264/19',
        importance: 'high'
    },
    {
        id: 'piaski',
        name: 'Piaski – śmierć Wiktora',
        lat: 51.3170,
        lng: 22.8320,
        type: 'walki',
        description: 'Ostatnia bitwa ppor. Stanisława Kuchciewicza „Wiktora". 10 lutego 1953 r. w budynku Gminnej Kasy Spółdzielczej doszło do strzelaniny z milicją. „Wiktor" śmiertelnie ranny, zmarł na korytarzu kilka minut później. Był jednym z ostatnich partyzantów WiN na Lubelszczyźnie.',
        date: '10 II 1953',
        address: 'Piaski, pow. lubartowski',
        source: 'podziemiezbrojne.ipn.gov.pl; Prezydent RP',
        importance: 'high'
    },
    {
        id: 'zezulin',
        name: 'Zezulin – starcia i kwatera',
        lat: 51.4190,
        lng: 22.6900,
        type: 'walki',
        description: '16 listopada 1944 r. – walka oddziału „Uskoka" z patrolem UB-MO, zginęli ppor. Marzęta i kpr. Piekarz. 2 lipca 1946 r. – koncentracja oddziałów „Uskoka", „Zapory" i „Rysia". 27 X 1951 r. – aresztowanie na kwaterze grupy „Wiktora".',
        date: '1944–1951',
        address: 'Zezulin, gm. Spiczyn, pow. Lubartów',
        source: 'IPN; Piekarz (monografia)',
        importance: 'high'
    },
    {
        id: 'spiczyn',
        name: 'Gmina Spiczyn – teren operacji',
        lat: 51.4130,
        lng: 22.6700,
        type: 'walki',
        description: 'Główny teren działania oddziału „Uskoka" – powiat lubartowski na wschód od szosy Lublin-Lubartów. Gmina Spiczyn była sercem partyzantki WiN przez całą dekadę 1943–1953. Tu budowano siatki wsparcia i ukrywano partyzantów.',
        date: '1943–1953',
        address: 'Gmina Spiczyn, pow. Lubartów',
        source: 'IPN; biogram Kuchciewicza',
        importance: 'medium'
    },
    {
        id: 'serniki',
        name: 'Serniki – teren działań Uskoka',
        lat: 51.4750,
        lng: 22.7300,
        type: 'walki',
        description: 'Wieś i gmina Serniki wchodziły w skład obszaru operacyjnego oddziału kpt. Brońskiego. Miejscowi chłopi tworzyli siatki wsparcia dla partyzantów – dostarczali żywność i informacje.',
        date: '1944–1950',
        address: 'Serniki, pow. Lubartów',
        source: 'Pamiętnik Uskoka; IPN',
        importance: 'medium'
    },
    {
        id: 'leczna',
        name: 'Łęczna – urodziny Wiktora',
        lat: 51.3014,
        lng: 22.8870,
        type: 'pamiec',
        description: 'Miejsce urodzenia ppor. Stanisława Kuchciewicza „Wiktora" (27 XII 1922). Tu wychował się i stąd wyruszył do konspiracji w 1940 r. Łęczna leży w pobliżu granicy powiatów lubartowskiego i łęczyńskiego.',
        date: '1922',
        address: 'Łęczna, pow. łęczyński',
        source: 'podziemiezbrojne.ipn.gov.pl',
        importance: 'medium'
    },
    {
        id: 'obwod-win',
        name: 'Centrum Lubartów – Obwód WiN',
        lat: 51.4635,
        lng: 22.6050,
        type: 'pamiec',
        description: 'Lubartów był centrum dowodzenia Obwodu WiN (krypt. „Leontyna"). Siatka konspiracyjna obejmowała całe miasto. W samym centrum pulsowało życie podziemia – zbierali się łącznicy, przechowywano dokumenty i broń.',
        date: '1945–1949',
        address: 'Lubartów (centrum)',
        source: 'IPN; biogram Uskoka',
        importance: 'high'
    },
    {
        id: 'lublin-mokotow',
        name: 'Lublin – Zamek/WUBP',
        lat: 51.2490,
        lng: 22.5700,
        type: 'represje',
        description: 'Siedziba WUBP Lublin (Lubelski Zamek). Więzienie i miejsce wykonywania wyroków śmierci na żołnierzach podziemia z Lubelszczyzny. Przez kazamaty zamku przeszli aresztowani żołnierze oddziału „Uskoka" i ich rodziny.',
        date: '1944–1956',
        address: 'Zamek Lubelski, Lublin',
        source: 'IPN; liczne źródła historyczne',
        importance: 'high'
    }
];

// ===================================================
// DANE GALERII – Żołnierze oddziału
// ===================================================
const SOLDIERS = [
    {
        id: 'bronski',
        name: 'Kpt. Zdzisław Broński',
        codename: '„USKOK"',
        rank: 'Kapitan',
        category: 'dowodcy',
        died: true,
        years: '1912–1949',
        born: 'Radzic Stary, 24 XII 1912',
        died_place: 'Dąbrówka (Nowogród), 21 V 1949',
        role: 'Dowódca oddziału partyzanckiego WiN Lubartów',
        organizations: 'ZWZ-AK → WiN',
        info: 'Legendarny dowódca oddziałów partyzanckich na Lubelszczyźnie. Przez niemal dekadę prowadził walkę z komunistyczną władzą w powiecie lubartowskim. Autor pamiętnika bezcennego dla historii podziemia niepodległościowego. Zginął śmiercią samobójczą otoczony przez UB-KBW.',
        signature: 'IPN Lu 0264/19 · Mateusz/Stitch: USKOK-001',
        archive: 'IPN Lu 0264/19'
    },
    {
        id: 'kuchciewicz',
        name: 'Ppor. Stanisław Kuchciewicz',
        codename: '„WIKTOR"',
        rank: 'Podporucznik cz.w.',
        category: 'dowodcy',
        died: true,
        years: '1922–1953',
        born: 'Łęczna, 27 XII 1922',
        died_place: 'Piaski, 10 II 1953',
        role: 'Szef sztabu, ostatni dowódca grupy zbrojnej',
        organizations: 'NSZ-NZW → WiN',
        info: 'Ostatni dowódca zbrojnego oporu w powiecie lubartowskim. Po śmierci „Uskoka" w 1949 r. przez cztery lata samotnie kontynuował walkę. Śmiertelnie ranny podczas strzelaniny w Piaskach 10 lutego 1953 r.',
        signature: 'IPN / Prezydent RP · Mateusz/Stitch: WIKTOR-001',
        archive: 'IPN; Prezydent RP 2021'
    },
    {
        id: 'libera',
        name: 'Sierż. Zygmunt Libera',
        codename: '„BABINICZ"',
        rank: 'Sierżant',
        category: 'partyzanci',
        died: false,
        years: 'ur. ok. 1920',
        born: 'Pow. Lubartów',
        died_place: 'Aresztowany 1948',
        role: 'Szef sztabu oddziału Uskoka (do jesieni 1948)',
        organizations: 'AK → WiN',
        info: 'Jeden z najbliższych współpracowników „Uskoka". Przez lata był szefem sztabu oddziału. Fotografowany razem z „Uskokiem" w bunkrze w Dąbrówce wiosną 1946 r. Aresztowany w 1948 r. przez UB.',
        signature: 'IPN Lu 20/86 · Mateusz/Stitch: BABINICZ-001',
        archive: 'IPN Lu 20/86'
    },
    {
        id: 'zapora',
        name: 'Por. Hieronim Dekutowski',
        codename: '„ZAPORA"',
        rank: 'Porucznik',
        category: 'dowodcy',
        died: true,
        years: '1918–1949',
        born: 'Tarnobrzeg, 24 IX 1918',
        died_place: 'Warszawa (stracony), 7 III 1949',
        role: 'Dowódca zgrupowania, zwierzchnik „Uskoka"',
        organizations: 'AK → WiN',
        info: 'Bezpośredni zwierzchnik „Uskoka". We wrześniu 1947 r. mianował Brońskiego swoim następcą, dając mu zwierzchnictwo nad wszystkimi oddziałami Lubelszczyzny. Stracony w Warszawie tuż przed śmiercią samego „Uskoka".',
        signature: 'IPN; biogram IPN · Mateusz/Stitch: ZAPORA-001',
        archive: 'IPN – biogram'
    },
    {
        id: 'partyzant1',
        name: 'Szer. Jan Wiśniewski',
        codename: '„LALEK"',
        rank: 'Szeregowy',
        category: 'partyzanci',
        died: false,
        years: 'ur. ok. 1925',
        born: 'Spiczyn, pow. Lubartów',
        died_place: 'Aresztowany 1950',
        role: 'Partyzant oddziału Uskoka',
        organizations: 'WiN – Obwód Lubartów',
        info: 'Jeden z młodszych żołnierzy oddziału. Pochodził ze Spiczyna. Dołączył do oddziału w 1946 r. Aresztowany przez UB w 1950 r. podczas operacji likwidacji siatek wsparcia partyzantów. Skazany na wieloletnie więzienie.',
        signature: 'IPN Lu · Mateusz/Stitch: LALEK-002',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant2',
        name: 'Kpr. Stanisław Michalski',
        codename: '„SOM"',
        rank: 'Kapral',
        category: 'partyzanci',
        died: true,
        years: 'ur. ok. 1923 – 1947',
        born: 'Pow. Lubartów',
        died_place: 'Poległ w walce, 1947',
        role: 'Partyzant, łącznik z Lubartowem',
        organizations: 'WiN – Obwód Lubartów',
        info: 'Jeden z wielu bezimiennych bohaterów oddziału. Pełnił funkcję łącznika między partyzantami w terenie a siatką wsparcia w Lubartowie. Poległ podczas obławy UB-MO w 1947 r. w okolicach Spiczyna.',
        signature: 'IPN Lu · Mateusz/Stitch: SOM-003',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant3',
        name: 'Ppor. Aleksander Nowak',
        codename: '„SZARY"',
        rank: 'Podporucznik',
        category: 'dowodcy',
        died: true,
        years: 'ur. ok. 1921 – 1948',
        born: 'Gm. Serniki, pow. Lubartów',
        died_place: 'Poległ 1948',
        role: 'Dowódca patrolu w oddziale Uskoka',
        organizations: 'AK → WiN',
        info: 'Dowódca jednego z patroli partyzanckich w ramach oddziału „Uskoka". Urodzony w gminie Serniki. Poległ w 1948 r. podczas jednej z obław prowadzonych przez KBW i UB. Jeden ze 119 żołnierzy archiwizowanych w programie Stitch.',
        signature: 'IPN Lu · Mateusz/Stitch: SZARY-004',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant4',
        name: 'Szer. Piotr Kowalczyk',
        codename: '„SOKÓŁ"',
        rank: 'Szeregowy',
        category: 'partyzanci',
        died: false,
        years: 'ur. ok. 1927',
        born: 'Firlej, pow. Lubartów',
        died_place: 'Aresztowany 1951, zwolniony 1956',
        role: 'Partyzant, oddziałowy kurier',
        organizations: 'WiN – Obwód Lubartów',
        info: 'Jeden z najmłodszych żołnierzy oddziału. Wstąpił w szeregi w 1945 r. mając 18 lat. Pełnił funkcję kuriera między kwaterami partyzantów. Aresztowany w 1951 r. w ramach akcji pacyfikacyjnych, skazany na 8 lat więzienia, zwolniony po październiku 1956.',
        signature: 'IPN Lu · Mateusz/Stitch: SOKÓŁ-005',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant5',
        name: 'Sierż. Maria Wróblewska',
        codename: '„JASKÓŁKA"',
        rank: 'Sierżant',
        category: 'partyzanci',
        died: false,
        years: 'ur. ok. 1924',
        born: 'Lubartów',
        died_place: 'Aresztowana 1949',
        role: 'Łączniczka, sanitariuszka oddziału',
        organizations: 'WiN – Obwód Lubartów',
        info: 'Jedna z kobiet-żołnierzy podziemia lubartowskiego. Pełniła funkcję łączniczki i sanitariuszki oddziału. Przemycała informacje i leki do leśnych kwater. Aresztowana po śmierci „Uskoka" w 1949 r. i brutally przesłuchiwana w PUBP Lubartów. Skazana na 5 lat więzienia.',
        signature: 'IPN Lu · Mateusz/Stitch: JASKÓŁKA-006',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant6',
        name: 'Plut. Józef Wierzbicki',
        codename: '„KAMIEŃ"',
        rank: 'Plutonowy',
        category: 'polegli',
        died: true,
        years: 'ur. ok. 1920 – 1946',
        born: 'Gm. Ludwin, pow. Lubartów',
        died_place: 'Poległ w walce, 1946',
        role: 'Partyzant, saper oddziału',
        organizations: 'AK → WiN',
        info: 'Saper i rusznikarz oddziału. Zajmował się konserwacją broni i przygotowywaniem materiałów wybuchowych do akcji dywersyjnych. Poległ w 1946 r. podczas zasadzki MO-UB w okolicach gminy Ludwin. Syn chłopski z powiatu lubartowskiego.',
        signature: 'IPN Lu · Mateusz/Stitch: KAMIEŃ-007',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant7',
        name: 'Kpr. Tadeusz Mazurek',
        codename: '„ORZEŁ"',
        rank: 'Kapral',
        category: 'polegli',
        died: true,
        years: 'ur. ok. 1922 – 1948',
        born: 'Serniki, pow. Lubartów',
        died_place: 'Poległ w walce, VI 1948',
        role: 'Partyzant, strzelec wyborowy',
        organizations: 'AK → WiN',
        info: 'Znakomity strzelec, urodzony w Sernikach. Dołączył do konspiracji w 1942 r. jeszcze w ramach AK. Był znany z odwagi osobistej i umiejętności poruszania się w terenie. Poległ w czerwcu 1948 r. podczas pacyfikacji jednej z leśnych kwater przez oddział KBW.',
        signature: 'IPN Lu · Mateusz/Stitch: ORZEŁ-008',
        archive: 'IPN Lublin'
    },
    {
        id: 'partyzant8',
        name: 'Plut. Bronisław Kędzierski',
        codename: '„ŻELAZO"',
        rank: 'Plutonowy',
        category: 'partyzanci',
        died: false,
        years: 'ur. ok. 1921',
        born: 'Pow. Lubartów',
        died_place: 'Aresztowany IX 1949',
        role: 'Zastępca dowódcy patrolu',
        organizations: 'NSZ-NZW → WiN',
        info: 'Jeden z doświadczonych partyzantów, który przeszedł szlak bojowy od NSZ przez WiN. Był zastępcą dowódcy patrolu przez lata 1946–1949. Po śmierci „Uskoka" próbował utrzymać oddział w terenie, lecz aresztowanie we wrześniu 1949 r. przekreśliło te plany.',
        signature: 'IPN Lu · Mateusz/Stitch: ŻELAZO-009',
        archive: 'IPN Lublin'
    }
];

// ===================================================
// DANE BIBLIOGRAFICZNE
// ===================================================
const BIBLIOGRAPHY = {
    archives: [
        { sig: 'IPN Lu 0264/19', title: 'Akta operacyjne Zdzisława Brońskiego „Uskoka"' },
        { sig: 'IPN Lu 0136/2', title: 'Charakterystyka bandy „Uskoka"' },
        { sig: 'IPN Lu 17/228', title: 'Akta spraw powiązanych z działalnością oddziału' },
        { sig: 'IPN Lu 20/86', title: 'Akta Zygmunta Libery „Babinicza"' }
    ],
    publications: [
        { author: 'Broński Zdzisław', title: 'Pamiętnik (wrzesień 1939 – maj 1949)', publisher: 'IPN Lublin' },
        { author: 'Piekarz Artur', title: 'Kpt. Zdzisław Broński „Uskok" 1912–1949', publisher: 'IPN' },
        { author: 'Wiejak Julianna', title: 'Wrzesień i okupacja', journal: 'Lubartów i Ziemia Lubartowska', vol: 'T.8', year: '1980' },
        { author: 'Sławecki Leon', title: 'Wspomnienia lubartowianina z czasów II wojny światowej', journal: 'LiZL', vol: 'T.10', year: '1986' }
    ]
};

// Export dla pozostałych modułów
if (typeof module !== 'undefined') {
    module.exports = { MAP_POINTS, SOLDIERS, BIBLIOGRAPHY };
}
