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
