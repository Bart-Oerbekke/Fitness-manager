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
