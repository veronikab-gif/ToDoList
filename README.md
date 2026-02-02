# Úkolníček (ToDoList)

Aplikace vznikla jako semestrální projekt pro předmět Vývoj webových aplikací v rámci studia na Univerzitě Karlově. 
Slouží jako webová aplikace pro správu úkolů se dvěma typy přístupů a pokročilejšími funkcemi pro týmovou spolupráci.

## Funkce

### Správa úkolů
- **Vytváření úkolů** s názvem, popisem a prioritou (Vysoká, Střední, Nízká)
- **Tagy** - přednastavené (Úklid, Nákupy, Opravy) + vlastní tagy s výběrem barvy
- **Stavy úkolů**: Nový → Revize → Schváleno/Zamítnuto
- **Časové značky** - automatické sledování vytvoření a aktualizace úkolů
- **Lokální úložiště** - všechna data se ukládají v localStorage

### Typy přístupů
Aplikace podporuje dva typy uživatelů: Zadavatel a Schvalovatel, jejichž možnosti se v některých případech liší:

#### Zadavatel
- Vytváření nových úkolů
- Odeslání úkolů k revizi
- Prohlížení všech úkolů

#### Schvalovatel
- Schvalování/zamítání úkolů
- Přidávání komentářů s časovými značkami
- Mazání úkolů
- Historie všech komentářů

### Dashboard
- **Výsečové grafy** zobrazující:
  - Rozdělení úkolů podle priority
  - Rozdělení úkolů podle stavu
- Vizualizace pomocí Chart.js

### Seznam úkolů
- Přehledná **tabulka** s následujícími sloupci:
  - Název, Popis, Priorita
  - Datum vytvoření a poslední aktualizace
  - Tagy, Status
  - Komentáře schvalovatele s historií
  - Akce (tlačítka podle role)
- **Barevné odlišení priorit**
- **Historie komentářů** - všechny komentáře schvalovatele s časovými značkami

## Technologie

- **HTML5** - struktura aplikace
- **CSS3/SCSS** - styling s proměnnými a modulárním přístupem
- **JavaScript (ES6+)** - objektově orientovaný přístup
  - ES6 moduly
  - Třídy a dědičnost
  - localStorage API
- **Bootstrap 5.3.2** - responsivní grid a komponenty
- **Chart.js 4.4.1** - interaktivní grafy

## Struktura projektu

```
ToDoList/
├── index.html              # Hlavní stránka s dashboardem
├── pages/
│   ├── new.html           # Formulář pro vytváření úkolů
│   └── list.html          # Seznam všech úkolů
├── components/
│   ├── dashboard.js       # Logika dashboardu a grafů
│   ├── roleSelect.js      # Přepínání rolí
│   ├── taskForm.js        # Zpracování formuláře nového úkolu
│   └── taskList.js        # Vykreslování seznamu úkolů
├── js/
│   ├── app.js            # TaskManager - hlavní logika aplikace
│   ├── task.js           # Třída Task - model úkolu
│   ├── storage.js        # Třída Storage - práce s localStorage
│   ├── roles.js          # Konstanty pro role
│   ├── session.js        # Správa aktuální role uživatele
│   └── tag.js            # Správa tagů
└── style/
    ├── stylesheet.scss   # SCSS zdrojové soubory
    └── stylesheet.css    # Kompilovaný CSS
```


## Použití

### Vytvoření úkolu (Zadavatel)
1. Přejděte na **Nový úkol**
2. Vyplňte název a popis
3. Vyberte prioritu
4. Přidejte tagy (standardní nebo vlastní s barvou)
5. Klikněte na **Vytvořit úkol**

### Schválení/zamítnutí úkolu (Schvalovatel)
1. Přejděte na **Seznam úkolů**
2. Přepněte roli na **Schvalovatel**
3. U vybraného úkolu klikněte na **Schválit** nebo **Zamítnout**
4. Případně přidejte komentář

### Vlastní tagy
- Zadejte název tagu
- Vyberte barvu pomocí color pickeru
- Klikněte na **Přidat tag**
- Tagy se automaticky ukládají a jsou dostupné i po obnovení stránky

## Ukládání dat

Aplikace využívá **localStorage** prohlížeče pro ukládání:
- Seznam všech úkolů
- Vlastní tagy s barvami
- Aktuální role uživatele

**Poznámka:** Data jsou uložena lokálně v prohlížeči a nejsou synchronizována mezi zařízeními.




## Licence

Aplikace vznikla jako semestrální projekt pro předmět Vývoj webových aplikací v rámci studia na Univerzitě Karlově. 
Tento projekt je dostupný pro osobní a vzdělávací účely.

---

**Autor:** Veronika Balogová, 2026
