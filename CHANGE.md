# Actuele wijziging — lokale MVP-basis

Status: eerste implementatie ter beoordeling; niet gereed voor productie.

## Scope en risico
Gebruiker gaf 24 november 2026 opdracht tot technische uitwerking en implementatie volgens goedgekeurde ontwerp; kosten vooraf afstemmen. Branch feature/local-first-mvp vanaf discovery/product-brief, doel main. Geen merge/publicatieakkoord. Eerste afgebakende stap: lokale PWA met programma's, kalender, builder, setregistratie, inline historie en progressie. Geen cloud of Apple-auth, geen externe diensten. Tijdelijke localStorage is geen productieopslag; verlies en multi-tab conflicten mogelijk.

## Criteria en bewijs
| ID | Status | Bewijs |
| --- | --- | --- |
| P-02–06, P-14, P-16–18, P-23 | gedeeltelijk | domeintests en markup-smoke; echte interactie/iPhone nog niet getest |
| P-01, P-09–10, P-15, P-19, P-21–22, P-24–25 | gedeeltelijk | implementatie en deels domeintests; volledige end-to-end verificatie open |
| P-08 | gedeeltelijk | app-shell cache en lokale opslag; echte offline run en cloudsync ontbreken |
| P-11 | open | fysieke iPhone en keyboardbalk niet getest |
| P-12/P-20 | open, blokkerend | account/auth/sync niet aangesloten |
| P-07/P-13 | vervolg | buiten deze implementatie |

## Controlebewijs
- Code-snapshot 189492c3f4d10eca4975f89e7d9def62b90c77e2: uit GitHub gelezen. Eerdere snapshot had syntaxconflict tussen datumhelper en Vandaag-view; opgelost en parsercontrole herhaald. Programmaduplicatie nu eigen templates; kalenderdatumcorrectie verwerkt.
- Uit test/core.test.mjs: 9 testfuncties uitgevoerd met eenvoudige JavaScript-test/assert-adapter in connectoromgeving, 9 geslaagd. Dit is niet hetzelfde als een Node CI-run. Syntax core/app/library/sw gecontroleerd met Function-parser na verwijderen module-import/export-declaraties.
- Mock-DOM-smoketest van 12 schermrenderfuncties met fictieve data op code-snapshot 189492c3f4d10eca4975f89e7d9def62b90c77e2: alle renderden markup met verwachte tekst. Geen echte browserinteractie of visuele inspectie.
- CI-workflow toegevoegd; daadwerkelijke run, opzettelijk falende run en branchblokkade nog niet bevestigd. Geen onafhankelijke review.
- Zelfreview: input escaping en numerieke validatie, gescheiden snapshots, afgevinkte sets beschermen, stabiele oefening-ID, geplande vs werkelijke duur, geen externe netwerkcalls behalve eigen shell. Geen complete securityreview; echte persoonlijke data niet invoeren.

## Preview
Checkout branch feature/local-first-mvp, npm start, http://localhost:8000. Fictieve scenario's: eigen workout met drie sets en Each, zesweeks programma, weekrichtwaarden, log reps/kg en Apply to all, bevestiging bij lege set, afronden, herhalen voor inline historie, plan voetbaltraining op twee dagen en losse wedstrijd, rond af en bekijk sporttijd.
Geen bereikbare iPhone-preview omdat externe hosting nog niet is goedgekeurd. Browser- en iPhone-tests, toegankelijkheidsreview, offline gedrag, sync/auth, volledige planningwijzigingen, definitieve grafieklabels en terugzetten van export zijn open. De huidige UI is een eerste werkende codeversie, geen bewezen volledige v1.

## Oplevering
Geen merge/publicatie; gebruiker beoordeelt preview. Geen betaalde diensten aangevraagd of ingericht. Externe kosten vooraf per dienst afstemmen.

## Aanvulling: voorbereiding testhosting
Gebruiker vraagt gratis testomgeving voor iPhone en heeft Apple Developer/Expo. Vercel Hobby geselecteerd als voorstel, accountverbinding nog nodig. Buildscript met allowlist en vercel.json toegevoegd; PREVIEW.md legt exacte instellingen, tests en publicatiegrenzen vast. Geen deployment, externe kosten, Apple-configuratie of wijziging van main uitgevoerd. De providerbuild en live smokecheck zijn nog niet uitgevoerd.

## Eerste externe testdeployment — 24 november 2026
- Gebruiker gaf opdracht de testomgeving voor te bereiden en koppelde Vercel. Afzonderlijk project fitness-manager-preview, zonder Git-integratie of automatische deployments. Geen betaalde add-ons, upgrade of domein aangeschaft; bestaand teamabonnement niet zichtbaar via team-API, werkelijke facturatie niet geverifieerd.
- Handmatig gedeployed vanaf exact GitHub-snapshot d14314f682ea9f2673de887a5d758a1b98240d7a, 12 bronbestanden, build allowlist 8 publieke appbestanden. Deployment dpl_GXss6Pbd2LpUDzNPWbfY2Sv8GLxe, READY. URL https://fitness-manager-preview.vercel.app. Vercel retourneerde target production bij eerste deployment ondanks weggelaten target; dit is uitsluitend het afzonderlijke testproject, niet een vrijgave van main of productieapp. Geen merge, promotie of automatische Git-koppeling.
- Buildlogs bevestigen npm run check, npm test (9 geslaagd, 0 mislukt), npm run build. Geauthenticeerde HTTP-controle van /, /manifest.webmanifest, /src/app.mjs en /sw.js: 200. Geen echte Safari/iPhone-interactie of offline test uitgevoerd. Vercel Authentication behouden; gebruiker kan mogelijk moeten inloggen. Alleen fictieve data, geen Apple-login/cloudsync.

## UX-revisie 2 — kalender en compactere interface
Opdracht: maand/week zoals agenda en algemene UI compacter. Scope P-26/D-09; bestaande opslagkey, templates en geschiedenis blijven ongewijzigd. Geen nieuwe dependencies of accountdiensten. Zelfreview: UTC-datumfuncties en werkelijke datum, geen dubbele activiteit, geescapete namen, geselecteerde datum voor planning. Drie extra domeintests. Syntaxcontrole via JS-parser uitgevoerd; Vercel build en echte browser/iPhone-review nog open. Geen main-merge of productiepublicatie; bestaande testproject-update alleen als afzonderlijke previewbeoordeling toegestaan.

- Controlebewijs op codecommit 1004d21f3a92a738cad666a30ffc2dcca4a42d1c: 12 domeintestfuncties geslaagd via JavaScript-assertadapter (9 regressies + maandgrenzen/schrikkeljaar, volledige maandrijen, verplaatste afgeronde activiteit); 13 mock-DOM-schermrenderchecks geslaagd (maand, week en 11 overige schermen). Geen echte browserlayout of fysieke iPhone-interactie getest. Node CI-run nog niet geverifieerd. Service worker cache versie v2, opslagkey behouden. Zelfreview betreft code en markup; fysieke designreview wacht op testdeployment. Testdeployment van deze versie en main-merge nog niet uitgevoerd, afzonderlijk akkoord voor testversie gevraagd.

## Testdeployment UX-revisie 2 — 24 november 2026
- Expliciet gebruikersakkoord: bestaande Vercel-testomgeving, codecommit 1004d21f3a92a738cad666a30ffc2dcca4a42d1c, geen main-merge of extra kosten.
- Handmatige deployment dpl_GSaNc91NMXCfbWDJdUuPWX9sND64, READY, https://fitness-manager-preview.vercel.app. Target production uitsluitend binnen afzonderlijk testproject voor behoud bestaande URL en origin/opslag. Geen wijziging aan accountplan, add-ons, domeinen of automatische Git-deployments; facturatie niet onafhankelijk geverifieerd.
- GitHub CI voor codecommit succesvol; Vercel build: syntaxcheck, 12/12 Node-domeintests geslaagd, statische build 8 bestanden. Geauthenticeerde HTTP-check: index.html, src/app.mjs, src/style.css, sw.js allemaal 200 en inhoud exact gelijk aan goedgekeurde GitHub-versie. Main vóór en na deployment onveranderd fc42838a7bd73fc28e28b4ae197253f4dda20440.
- Fysieke iPhone-review, werkelijke browserlayout, offline gebruik en opslagbehoud in bestaande geïnstalleerde PWA nog door gebruiker te testen. Geen productieapp of merge vrijgegeven. Vorige testdeployment dpl_GXss6Pbd2LpUDzNPWbfY2Sv8GLxe beschikbaar als terugvalversie.

## UX-revisie 3 en cloudvoorbereiding
Gebruiker vraagt kalender, actieve training, builder, database en Apple-login. UX-code op 390ab54ff1dfa3383bbbd43d7ee2c201d214800c. P-27–29. Zelfreview: weekstatistieken aansluiting gecontroleerd, actieve events beschermd, kopie bevestiging; lokale opslagkey behouden. Geautomatiseerde adapterchecks 18/18 domein en 13/13 mock-DOM renders; geen echte browser of iPhone-test, drag/swipe/keyboard/scroll nog te beoordelen. Geen long press; optiemenu. Geen nieuwe dependencies. SQL-draft en cloudplan voorbereid, niet gevalideerd tegen database. Auth/sync niet geïmplementeerd of aangesloten; blokkerend voor echte data. Geen nieuwe externe dienst of kosten geactiveerd. Geen merge of deployment van deze revisie zonder versiegebonden toestemming.

## Testdatabase ingericht — 24 november 2026
- Gebruiker autoriseerde uitsluitend €0 extra, organisatie Wim-11, Frankfurt. Supabase bevestigde Free en offerte 0 per maand. Project fitness-manager aangemaakt, ACTIVE_HEALTHY, eu-central-1, PostgreSQL 17. Geen betaalde upgrade of domein.
- Migratie initial_fitness_state, provider-versie 20261124131542, vastgelegd onder supabase/migrations. Afgedwongen RLS en eigenaarspolicies op public.fitness_state; anon heeft geen SELECT, authenticated geen DELETE of wijziging eigenaar. Trigger controleert revisies en laatste mutation-ID. Payload heeft basisstructuur- en groottevalidatie; diepe domeinvalidatie en applicatie-autorisatie blijven open.
- SQL-test met twee synthetische auth.users, role authenticated en gesimuleerde JWT-claims, één rollback-transactie: eigen insert/read/update, cross-account insert/read/update geweigerd, stale CAS 0 rows, revision jump/laatste mutatie replay geweigerd, ongeldige payload geweigerd, DELETE en anon SELECT geweigerd. Na rollback 0 gebruikers, 0 records. Security Advisor: geen lints. Geen echte JWT-login/API-integratietest.
- Apple-provider niet ingeschakeld: Apple Developer Services ID en signing key/client secret moeten door gebruiker in eigen accounts worden geconfigureerd. Exact Supabase-domain/callback in persoonlijk dashboard; geen sleutels of accountgegevens in publieke repo. App Site URL en redirect allowlist: bestaande stabiele Vercel-test-URL. Zie Apple en Supabase officiële docs. Geen clientauth/sync aangesloten. Geen gebruikersdata importeren tot end-to-end getest. Geen Vercel-deployment of main-merge.

## UX-testdeployment 0.3
Expliciet akkoord voor 390ab54ff1dfa3383bbbd43d7ee2c201d214800c. Vercel deployment dpl_H6AahvJfo5yFsFQQ374qmfQFW7BN READY op https://fitness-manager-preview.vercel.app. Target production alleen binnen apart testproject om bestaande URL te houden. Build 18/18 Node-tests; HTML/app/CSS/SW via HTTP 200 exact gelijk aan de goedgekeurde commit. Geen merge, geen abonnementwijzigingen; facturatie niet onafhankelijk verifieerbaar.

## IndexedDB en offline opslag — fase na UX 0.3
- Gebruiker stelt Apple-login en cloudsynchronisatie uit. Supabase niet gewijzigd; geen koppeling, geen account of netwerkverkeer naar de database. Lokale testdata blijven op dit apparaat. Geen extra diensten of kosten.
- Nieuwe module src/storage.mjs: lokale IndexedDB database fitness-manager-local, objectstore state, record preview. Bestaande localStorage key fm-local-preview-v1 wordt bij eerste start binnen één transactie gekopieerd. Originele sleutel blijft ongewijzigd als terugvalkopie. Bij nieuwe writes via een oudere appversie wordt divergentie gedetecteerd bij het openen; geen automatische samenvoeging. Export vóór rollback vereist; oudere app ziet nieuwe IndexedDB-mutaties niet.
- Versie 1 van payload blijft compatibel, optionele favorieten/recent genormaliseerd; basisvorm gecontroleerd. Save queue kopieert ieder snapshot vóór async schrijven, revisie-CAS in dezelfde transactie, succes pas bij oncomplete. Bij conflict of opslagfout stopt de queue en worden invoer en navigatie geblokkeerd; herstelbestand bevat huidige gegevens, legacy snapshot en waar beschikbaar de conflicterende opgeslagen versie. JSON-export is handmatig, automatische restore/import nog niet geïmplementeerd. Geen stilzwijgende reset of automatische overschrijving. Bij abrupt afsluiten tijdens een nog lopende transactie kunnen de laatste wijzigingen verloren gaan. Browseropslag is geen gegarandeerde permanente back-up; persist-aanvraag is optioneel en browserafhankelijk.
- Service worker v4 cachet uitsluitend de statische app-shell inclusief opslagmodule, versiegebonden cache, cache-first navigatie voor startpagina; update wacht op sluiten oude clients. Geen private gegevens in cache. Eerste online bezoek nodig. iPhone/Safari vliegtuigmodus, geïnstalleerde PWA, update/rollback, keyboard en opslagquota blijven fysieke testpunten. Geen productieclaim.

### Verificatie IndexedDB
Codecommit a060a86dcf6465f270be0ffa9244484f64ff318a: GitHub run 45402583737, syntax, 23/23 Node-tests en build geslaagd, browserstap mislukt doordat --dump-dom RUNNING teruggaf voor asynchrone IndexedDB-test klaar was. Correctie 10fbead455120bc93ad32018d3d8b3f2c6d3dca9 gebruikt CDP en expliciete wachttijden plus offline appflow. Nieuwe CI-resultaat nog te verifiëren. Lokale Chromium HTTP-test in de container geblokkeerd door browserbeheer; geen geslaagde lokale browsertest claimen. Geen onafhankelijke review. Geen deployment van IndexedDB zonder versiegebonden akkoord.

## iPhone-feedback — kalender, toetsenbord, sets
Gebruiker bevestigt logging offline in live UX 0.3, meldt verdwenen kalenderitem, dubbele toetsenbordactie en ontbrekende verwijderoptie. Oorzaak niet reproduceerbaar op gebruikersdata; code verwijderde geplande item bij afwijkende werkelijke datum, en losse actieve sessie verscheen niet in daglijst. Nieuwe kalenderpresentatie bewaart geplande verwijzing, actuele sessie en resultaat; afronding selecteert werkelijke datum. Geen dubbele statistieken. Eén compacte Apply to all-chip, native iOS navigatie; setverwijderdialog met bescherming. Testresultaat eerdere IndexedDB-correctie d0b3f832a3158dccbb0b0a56cf590523d9484189: GitHub run 45403302881 geslaagd. Nieuwe gecombineerde versie nog niet gepubliceerd; geen main merge, kosten of cloudwijzigingen. Fysieke iPhone-review open.

## Testdeployment 0.4 — IndexedDB en iPhone-feedback
Expliciet gebruikersakkoord voor codecommit 20b126f6b57de14d5097332b7c891a6a056415fb, uitsluitend na geslaagde vereiste controles, geen extra kosten en geen main-merge. GitHub Actions run 45406399014, job 138488185408: syntax, 26/26 Node-tests, build en Chromium-integratie geslaagd; log bevat PASS_STORAGE_BROWSER en PASS_OFFLINE_APP. Vercel deployment dpl_GJfw5hfbANmiG1Ny7yqx6XkJ9V4Z READY, https://fitness-manager-preview.vercel.app. Vercel target production uitsluitend in apart testproject voor behoud bestaande URL en lokale origin; geen productieapp-release. Vercel build 26/26 tests, 9 appbestanden. Alle negen live bestanden HTTP 200 en exacte inhoud gelijk aan goedgekeurde commit. Main vóór en na deployment fc42838a7bd73fc28e28b4ae197253f4dda20440. Geen nieuwe diensten, abonnementwijzigingen of cloudkoppeling; facturatie niet onafhankelijk geverifieerd. Fysieke iPhone-test van migratie, kalender, setverwijdering, toetsenbordchip en offline herladen blijft open. Originele localStorage-snapshot blijft behouden; export vóór eventuele rollback, oudere versie leest nieuwe IndexedDB-data niet. Geen automatische herstelimport. Gebruik fictieve testgegevens.

## UX-revisie 4 — formulierfeedback
P-32/D-10: compacte modal, eenheden min/weken/sec/kg, datum/tijd begrensd, weekdagchips, builder meegenomen. 16px invoertekst bewust behouden. Zelfreview: bestaande FormData-namen en validatie, eenmalige keuze uitgeschakeld, opslagcontract ongewijzigd. Syntax gecontroleerd; CI en fysieke iPhone-review open. Geen publicatie of merge zonder versiegebonden akkoord. Geen nieuwe diensten of kosten.

## Testdeployment 0.5 — compacte formulieren
Expliciet gebruikersakkoord voor codecommit 2182c4da9c92447153965748eb78133a7bd2c6fd, uitsluitend bij geslaagde CI, geen extra kosten of main-merge. GitHub Actions run 45411358780, job 138505706060: syntax, 26/26 Node-tests, build en browserintegratie geslaagd; PASS_STORAGE_BROWSER, PASS_COMPACT_FORMS (320/375/390/430 px, geometrie, units, inputmode en herhaalkeuze) en PASS_OFFLINE_APP. Vercel deployment dpl_5J8AEsYc87Xak9DwrBvjNFQbE3zB READY op https://fitness-manager-preview.vercel.app. Target production alleen binnen apart testproject voor behoud URL/origin; geen productieapp-release. Vercel build 26/26 tests en negen appbestanden. Alle negen live bestanden HTTP 200 en exacte inhoud gelijk aan goedgekeurde commit. Main vóór en na ongewijzigd fc42838a7bd73fc28e28b4ae197253f4dda20440. Geen nieuwe diensten of betaalde upgrades; facturatie niet onafhankelijk geverifieerd. Fysieke Safari/iPhone-review en native date/time rendering nog open. Geen wijziging IndexedDB-contract, geen Supabase-koppeling, geen data-import. SW v6; sluit oude clients om update te activeren. Gebruik fictieve testgegevens.

## Appupdate UX
P-33: versie zichtbaar, updatecontrole en expliciet toepassen. Scope lokale PWA, geen cloud of opslagmigratie. Zelfreview: actieve sessie, opslagfout en meerdere vensters blokkeren expliciete activatie; UI bevriezen vóór flush, geen cache wissen buiten normale shell lifecycle. Eerste upgrade van oudere versie nog afhankelijk van sluiten clients. CI uitgebreid; fysieke iPhone-review open. Geen publicatie zonder versiegebonden akkoord. Geen extra kosten.
