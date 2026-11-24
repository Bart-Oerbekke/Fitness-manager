# Fitness Manager — technische architectuur

Status: lokale ontwikkelversie; geen cloud, Apple-login of productiehosting. 24 november 2026.

## Architectuur
- PWA met standaard HTML, CSS, ES modules, Web App Manifest en service worker. Node 22 voor tests, Python 3 voor lokale HTTP-preview. Geen npm-afhankelijkheden, geen bundler, geen tracking. Een statische hostingbuild kopieert alleen expliciete appassets naar dist. Voor deze persoonlijke app is een framework nog niet noodzakelijk; domeinfuncties blijven los van DOM en opslag.
- src/core.mjs: pure trainingsregels (setvalidatie, kopiëren, richtwaarden, weekplanning, historie, sporttijd). src/app.mjs: schermen en tijdelijke localStorage-adapter. src/library.mjs: 118 handmatig samengestelde namen met spiergroep/apparatuur; geen externe media. src/style.css: goedgekeurde donkere kaartstijl.
- Datamodel: bibliotheekoefening (stabiele ID), workouttemplate met geordende oefenconfiguraties, programma met herhaalregels en week-overrides, geplande activiteit met eigen UUID, actieve sessie met snapshot van richtwaarden, afgeronde sessie met werkelijke sets/duur. Historie onafhankelijk van template. Bodyweight en Each expliciet. Dumbbellkg per stuk.
- Lokale versie bewaart fictieve data in localStorage (één versieerbaar document); service worker cachet alleen app-shell. Geen accountbeveiliging in deze versie. Geen echte trainingsdata gebruiken in lokale testversie. Lokale opslag kan gewist worden; JSON-export is mogelijk, import/herstel nog niet. Meerdere tabs kunnen elkaar overschrijven.
- Toekomstige productie: IndexedDB voor lokale records en outbox, versieerbare server-API met PostgreSQL. Per gebruiker eigenaar-ID en autorisatie op alle tabellen, geen publiek leesbare trainingsdata. UUID's en unieke mutation-ID voor idempotente synchronisatie; serverrevision/optimistische concurrency; conflicten expliciet afhandelen en afgeronde sessies niet stilzwijgend overschrijven. Offline afmelden en accountwisseling wissen/isoleren lokale gegevens; authenticatie verversen zodra online. Dit contract is ontwerp, nog niet geïmplementeerd.
- Sign in with Apple vereist externe configuratie (App ID, Services ID, domein, callback en servergeheim). Login op server, sessie met veilige HttpOnly/Secure/SameSite-cookie indien gekozen backend dit ondersteunt. Geen private keys in repo of browser. Database/hostingprovider en kosten vooraf afstemmen. Geen infrastructuur ingericht.
- AI/HealthKit/Bridge-import zijn vervolgwerk. AI krijgt alleen geautoriseerde relevante records, expliciete bevestiging van bewerkbaar schema, geen directe schrijfrechten.

## Lokaal uitvoeren
Node 22 en Python 3. Vanuit checkout: npm run check; npm test; npm start. Open http://localhost:8000. Geen installatie nodig. Gebruik fictieve data. HTTPS of localhost vereist voor service worker; fysieke iPhone heeft een afzonderlijk goedgekeurd bereikbaar HTTPS-previewadres nodig.

## Controles
| Controle | Commando/methode | Status |
| --- | --- | --- |
| Syntax | npm run check | CI ingericht; syntax ook via JS-parser in connectoromgeving gecontroleerd |
| Domein | npm test | 9 scenario's; testbestand ook met eenvoudige JS-testadapter uitgevoerd, alle geslaagd |
| Browser | Safari/iPhone: 375/390/430 px; keyboard, focus, offline, opslag, navigatie | open |
| Toegankelijkheid | focus, semantiek, contrast, zoom en labels handmatig en geautomatiseerd | open |
| Beveiliging | Apple-login, autorisatie, sync/replay/accountisolatie | niet gebouwd; blokkeert productie |

## GitHub
Branch feature/local-first-mvp; main alleen na mergeakkoord. Workflow .github/workflows/checks.yml, check Syntax and domain tests, PR en push op main/featurebranches, contents: read, geen deployment. Branchbescherming en vereiste checks nog niet geverifieerd of gewijzigd. Geen bestaande workflows op main aangetroffen. CI-foutdetectie nog niet aangetoond met een bewust falende run.

## Preview en release
Lokale preview via bovenstaande startstappen. Vercel Hobby-preview voorbereid met vercel.json en scripts/build.mjs; geen publiek bereikbaar previewadres, geen productieomgeving of automatische deployment ingesteld. Zie PREVIEW.md. De gebruiker heeft al een Apple Developer- en Expo-account; Expo is voor de huidige PWA niet vereist. Externe preview/hosting, Apple Developer en database pas na afzonderlijk akkoord over kosten en doelomgeving. Publicatie pas na iPhone-test, auth/sync-test, review en versiegebonden akkoord. Herstel: vorige goedgekeurde appversie en afzonderlijk gevalideerde databasemigratie/back-up (nog te ontwerpen).
