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

## Eerste externe testdeployment — 24 november 2026
- Gebruiker gaf opdracht de testomgeving voor te bereiden en koppelde Vercel. Afzonderlijk project fitness-manager-preview, zonder Git-integratie of automatische deployments. Geen betaalde add-ons, upgrade of domein aangeschaft; bestaand teamabonnement niet zichtbaar via team-API, werkelijke facturatie niet geverifieerd.
- Handmatig gedeployed vanaf exact GitHub-snapshot d14314f682ea9f2673de887a5d758a1b98240d7a, 12 bronbestanden, build allowlist 8 publieke appbestanden. Deployment dpl_GXss6Pbd2LpUDzNPWbfY2Sv8GLxe, READY. URL https://fitness-manager-preview.vercel.app. Vercel retourneerde target production bij eerste deployment ondanks weggelaten target; dit is uitsluitend het afzonderlijke testproject, niet een vrijgave van main of productieapp. Geen merge, promotie of automatische Git-koppeling.
- Buildlogs bevestigen npm run check, npm test (9 geslaagd, 0 mislukt), npm run build. Geauthenticeerde HTTP-controle van /, /manifest.webmanifest, /src/app.mjs en /sw.js: 200. Geen echte Safari/iPhone-interactie of offline test uitgevoerd. Vercel Authentication behouden; gebruiker kan mogelijk moeten inloggen. Alleen fictieve data, geen Apple-login/cloudsync.

## UX-revisie 3 en cloudvoorbereiding
Zie CLOUD.md en database/fitness_state.draft.sql voor voorgestelde Supabase Free + Apple OAuth/PKCE. SQL is alleen ontwerp, niet uitgevoerd. Bestaande localStorage-key blijft; favorieten en recente oefeningen zijn optionele arrays, bestaande data behouden. Geen cloudproject, account of paid upgrade ingericht. Service worker shell v3.

## Testdatabase ingericht — 24 november 2026
- Gebruiker autoriseerde uitsluitend €0 extra, organisatie Wim-11, Frankfurt. Supabase bevestigde Free en offerte 0 per maand. Project fitness-manager aangemaakt, ACTIVE_HEALTHY, eu-central-1, PostgreSQL 17. Geen betaalde upgrade of domein.
- Migratie initial_fitness_state, provider-versie 20261124131542, vastgelegd onder supabase/migrations. Afgedwongen RLS en eigenaarspolicies op public.fitness_state; anon heeft geen SELECT, authenticated geen DELETE of wijziging eigenaar. Trigger controleert revisies en laatste mutation-ID. Payload heeft basisstructuur- en groottevalidatie; diepe domeinvalidatie en applicatie-autorisatie blijven open.
- SQL-test met twee synthetische auth.users, role authenticated en gesimuleerde JWT-claims, één rollback-transactie: eigen insert/read/update, cross-account insert/read/update geweigerd, stale CAS 0 rows, revision jump/laatste mutatie replay geweigerd, ongeldige payload geweigerd, DELETE en anon SELECT geweigerd. Na rollback 0 gebruikers, 0 records. Security Advisor: geen lints. Geen echte JWT-login/API-integratietest.
- Apple-provider niet ingeschakeld: Apple Developer Services ID en signing key/client secret moeten door gebruiker in eigen accounts worden geconfigureerd. Exact Supabase-domain/callback in persoonlijk dashboard; geen sleutels of accountgegevens in publieke repo. App Site URL en redirect allowlist: bestaande stabiele Vercel-test-URL. Zie Apple en Supabase officiële docs. Geen clientauth/sync aangesloten. Geen gebruikersdata importeren tot end-to-end getest. Geen Vercel-deployment of main-merge.

## IndexedDB en offline opslag — fase na UX 0.3
- Gebruiker stelt Apple-login en cloudsynchronisatie uit. Supabase niet gewijzigd; geen koppeling, geen account of netwerkverkeer naar de database. Lokale testdata blijven op dit apparaat. Geen extra diensten of kosten.
- Nieuwe module src/storage.mjs: lokale IndexedDB database fitness-manager-local, objectstore state, record preview. Bestaande localStorage key fm-local-preview-v1 wordt bij eerste start binnen één transactie gekopieerd. Originele sleutel blijft ongewijzigd als terugvalkopie. Bij nieuwe writes via een oudere appversie wordt divergentie gedetecteerd bij het openen; geen automatische samenvoeging. Export vóór rollback vereist; oudere app ziet nieuwe IndexedDB-mutaties niet.
- Versie 1 van payload blijft compatibel, optionele favorieten/recent genormaliseerd; basisvorm gecontroleerd. Save queue kopieert ieder snapshot vóór async schrijven, revisie-CAS in dezelfde transactie, succes pas bij oncomplete. Bij conflict of opslagfout stopt de queue en worden invoer en navigatie geblokkeerd; herstelbestand bevat huidige gegevens, legacy snapshot en waar beschikbaar de conflicterende opgeslagen versie. JSON-export is handmatig, automatische restore/import nog niet geïmplementeerd. Geen stilzwijgende reset of automatische overschrijving. Bij abrupt afsluiten tijdens een nog lopende transactie kunnen de laatste wijzigingen verloren gaan. Browseropslag is geen gegarandeerde permanente back-up; persist-aanvraag is optioneel en browserafhankelijk.
- Service worker v4 cachet uitsluitend de statische app-shell inclusief opslagmodule, versiegebonden cache, cache-first navigatie voor startpagina; update wacht op sluiten oude clients. Geen private gegevens in cache. Eerste online bezoek nodig. iPhone/Safari vliegtuigmodus, geïnstalleerde PWA, update/rollback, keyboard en opslagquota blijven fysieke testpunten. Geen productieclaim.
