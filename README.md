# CyberLearn

CyberLearn je vzdelávacia aplikácia navrhnutá na zvýšenie povedomia o kybernetickej bezpečnosti. Projekt kombinuje moderné technológie na implementáciu robustného backendu, interaktívneho frontendového rozhrania a štruktúrovanej databázy. Táto aplikácia je ideálna pre jednotlivcov alebo organizácie, ktoré sa chcú zamerať na vzdelávanie svojich zamestnancov v oblasti kybernetickej bezpečnosti.

## Obsah projektu

### Backend
- **Technológia:** ASP.NET Core
- **Funkcie:**
  - Správa používateľov (registrácia, prihlásenie, autentifikácia)
  - Načítanie a správa vzdelávacích modulov
  - Správa kvízov a používateľských výsledkov
- **Súbory:**
  - `Controllers/` – Obsahuje kontroléry pre HTTP požiadavky
  - `Models/` – Definícia dátových modelov
  - `Services/` – Logika pre hashovanie hesiel a prácu s databázou
  - `Repositories/` – Komunikácia s databázou pomocou uložených procedúr

### CyberSecLearn (Databáza)
- **Technológia:** Microsoft SQL Server
- **Funkcie:**
  - SQL tabuľky reprezentujúce štruktúru aplikácie (používatelia, moduly, otázky)
  - Uložené procedúry na efektívnu manipuláciu s dátami
- **Súbory:**
  - `storedprocedures/` – Obsahuje SQL procedúry pre správu aplikácie
  - `tables/` – Definície databázových tabuľiek

### Frontend
- **Technológia:** React, TypeScript
- **Funkcie:**
  - Užívateľsky prívetivé rozhranie
  - Modulárne komponenty (napr. karty modulov, spätná väzba, navigácia)
  - Dynamické stránky pre interaktívne vzdelávanie
- **Súbory:**
  - `src/components/` – Znovupoužiteľné komponenty
  - `src/pages/` – Jednotlivé stránky aplikácie
  - `src/assets/` – Statické súbory (ikony, obrázky)

## Požiadavky

Na spustenie aplikácie budete potrebovať:
- **Backend:**
  - .NET SDK (ASP.NET Core)
  - SQL Server
- **Frontend:**
  - Node.js a npm/yarn
  - React.js
- **Databáza:**
  - SQL Server Management Studio alebo ekvivalent

## Návod na spustenie

### Backend
1. Prejdite do priečinka `backend`.
2. Otvorte projekt v IDE (napr. Visual Studio).
3. Nastavte správne pripojenie k databáze v súbore `appsettings.json`.
4. Spustite aplikáciu.

### Frontend
1. Prejdite do priečinka `frontend`.
2. Spustite príkaz `npm install` na inštaláciu závislostí.
3. Spustite príkaz `npm run dev` na spustenie aplikácie.

### Databáza
1. Prejdite do priečinka `CyberSecLearn`.
2. Naimportujte tabuľky zo súborov v priečinku `tables/`.
3. Spustite uložené procedúry zo súborov v priečinku `storedprocedures/`.

## Funkcie aplikácie

- Interaktívne vzdelávacie moduly s detailným obsahom.
- Kvízy s okamžitou spätnou väzbou a uchovávanie výsledkov.
- Správa používateľov, vrátane autentifikácie pomocou JWT.

## Prispievanie

Máte nápady na vylepšenia alebo ste našli chybu? Pošlite pull request alebo otvorte issue. Radi sa na to pozrieme!

## Licencia

Projekt je licencovaný pod MIT licenciou. Pre viac informácií si prečítajte [LICENSE](./LICENSE).

---

Ďakujeme, že používate CyberLearn a pomáhate zvyšovať povedomie o kybernetickej bezpečnosti! 🌐
