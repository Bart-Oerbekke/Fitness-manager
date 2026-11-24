# Fitness Manager — productbrief

Status: productrichting, oefenkaart en vereenvoudigde builder goedgekeurd; laatste intakekeuzes en centrale sportkalender goedgekeurd. 24 november 2026.

## Doel en gebruikers
Persoonlijke fitnessapp voor één sporter die nu BridgeAthletic gebruikt en zelfstandig trainingen wil maken. Snelle mobiele registratie van reps, kg en voltooide sets is de primaire gebruikersstroom. Installeerbare iPhone-webapp (PWA), Nederlandstalige interface met Engelse oefeningnamen. Eigen visuele stijl, donker met oranje accenten.

## Scope eerste bruikbare versie
- Kalender, programma's met trainingsperiodes en workouts, plus losse herbruikbare workouts; dupliceren van workouts en schema's. Een workout met bijvoorbeeld twee oefeningen kan eenmaal worden samengesteld en voor zes weken op vaste weekdagen ingepland; losse datumplanning ook mogelijk. Meerdere programma's kunnen tegelijk actief zijn. Richtreps en richtgewicht zijn per programmaweek aanpasbaar; losse toekomstige sessies kunnen ook afwijken. Afgeronde historie blijft onafhankelijk.
- Uitgebreide oefeningenbibliotheek met Engelse namen en eigen oefeningen; zoeken en filteren op spiergroep, apparatuur en eventueel eigen oefeningen. Metadata voor filters, geen video's, afbeeldingen of uitgebreide beschrijvingen.
- Eenvoudige workout builder: oefeningnaam, aantal sets, vast repdoel of repbereik, optioneel richtgewicht in kg (gewicht per dumbbell), keuze om gewichtveld weg te laten voor bodyweight, rustduur per oefening (standaard 90 seconden), een vinkvakje Each (ea) per oefening (standaard uit) en volgorde. Each betekent dat de reps per arm of been gelden; geen afzonderlijke keuze voor lichaamsdeel en geen dubbele invoervelden in de eerste versie. Richtwaarden gelden standaard voor alle sets. Links/rechts, supersets en circuits blijven op de roadmap, niet nodig in de eerste builder.
- Preview, actieve training, setregistratie, repdoelen en richtgewicht als gedempte placeholders; werkelijk uitgevoerde waarden afzonderlijk registreren, vinkjes, automatische instelbare rusttimer, hervatten en afronden.
- Apply to all: subtiele tekstactie in een app-eigen balk direct boven het numerieke toetsenbord, uitsluitend tijdens invoer. De actieve invoercel bepaalt automatisch oefening, set, veld (reps of kg) en eventueel zijde. Kopieer alleen dat veld naar overige onvoltooide sets van dezelfde oefening. Geen setselector of permanente kopieerknop; geen automatische vinkjes, geen andere oefeningen, geen wijziging van template of historie. Reeds afgevinkte sets beschermen.
- Historie, persoonlijke records en progressiegrafieken per oefening. Tijdens actieve training staat direct onder iedere oefening standaard een compacte tabel met de laatste eerdere sessie waarin dezelfde oefening is uitgevoerd: datum, feitelijke reps en kg per voltooide set (ea en kg per dumbbell waar relevant). Een subtiel historie-icoon opent oudere sessies. Match op stabiel oefening-ID, niet alleen naam of programma; ook over programma's heen. Geen automatische overname in actuele registratie. Bij afwezigheid van historie kleine lege toestand.
- Privé account met Sign in with Apple, online synchronisatie en offline trainen; lokaal bewaren van wijzigingen, zichtbare syncstatus, herstel na onderbreking en bescherming tegen dubbele registratie. Geen echte persoonsgegevens in openbare repository.

- Centrale sportkalender: naast fitnessworkouts ook voetbaltraining, voetbalwedstrijd en overige sportactiviteiten plannen, eenmalig of wekelijks herhalend. Naam, datum, optioneel tijdstip en verwachte duur; afzonderlijk afronden en werkelijke duur registreren. Alle activiteiten in een maand- en weekoverzicht en historie; totale daadwerkelijk geregistreerde sporttijd per week, uitgesplitst per type. Geen sets/reps voor overige sportactiviteiten. De vaste voetbaltrainingen op dinsdag en donderdag en wisselende weekendwedstrijden zijn gebruiksscenario's, geen hardcoded afspraken of automatisch aangemaakte persoonlijke gegevens.

## Gewenste uitbreidingen en afhankelijkheden
- AI-trainingsvoorstellen: later een nieuw meerweeks schema voorstellen op basis van doelen, beschikbare apparatuur, trainingsfrequentie, historie, voetbaltrainingen, wedstrijden, andere geplande sportactiviteiten en feedback; gebruiker kan voorstel bewerken en expliciet accepteren. Geen automatische overschrijving of verzending van persoonlijke data zonder passende toestemming. Datamodel in MVP houdt oefeningen, templates, geplande sessies en feitelijke prestaties gescheiden. AI-provider, kosten en privacy nog te bepalen.
- Sign in with Apple op web vereist Apple Developer-configuratie, primary App ID, Services ID, geregistreerd domein/return URL en private key. Beschikbaarheid van account en kosten voor productie nog afstemmen. Geen sleutels in GitHub. Bron: https://developer.apple.com/help/account/capabilities/configure-sign-in-with-apple-for-the-web
- Import van BridgeAthletic-schema's en trainingshistorie indien beschikbaar: eerst representatieve CSV/PDF van gebruiker of trainer inspecteren. Geen aanname van directe API-toegang. Importpreview, veldmapping, deduplicatie en validatie vóór opslaan.
- Apple Health: directe HealthKit-toegang vereist een native iOS-appcomponent met toestemming; niet rechtstreeks beschikbaar in een pure PWA. Onderzoek later native wrapper of optionele Opdrachten/Shortcuts-route voor ondersteunde gegevens. Geen automatische HealthKit-synchronisatie beloven voor PWA.
- Voeding, coachrollen, chat, RPE/RIR buiten eerste scope tenzij later gevraagd.

## Acceptatiecriteria (concept)
| ID | Gegeven / wanneer / dan | Prioriteit | Verificatie |
| --- | --- | --- | --- |
| P-01 | Maak en wijzig programma's, periodes en losse workouts; duplicaten zijn zelfstandig bewerkbaar. | vereist | functionele test |
| P-02 | Selecteer bibliotheek- of eigen oefeningnamen en configureer volgorde, aantal sets, vast repdoel of repbereik en optioneel richtgewicht en Each; preview klopt met template. Geen media vereist. | vereist | functionele test |
| P-03 | Voer geldige werkelijke reps en kg in, vink sets af, corrigeer en zie voortgang; invalid input wordt geweigerd. | vereist | functionele test |
| P-04 | Tijdens numerieke invoer verschijnt Apply to all subtiel boven het toetsenbord. De actieve cel bepaalt bron en veld; kopieert alleen naar overige onvoltooide sets van dezelfde oefening en zijde. Zonder focus geen actie; geen setselector. Voltooide sets, andere velden, andere oefeningen en historie blijven intact; geen automatische vinkjes. | vereist | functionele en regressietest |
| P-05 | Start workout: repdoel en richtgewicht verschijnen halftransparant als placeholders in elke set. Werkelijke waarden zijn aanvankelijk leeg; invoer verschijnt helder en verandert de richtwaarden niet. Geen placeholder telt als uitgevoerde set zonder expliciete bevestiging; bij leeg veld vraagt afvinken om richtwaarden over te nemen. Bij repbereik moet een concreet werkelijk aantal worden gekozen; geen automatische keuze. | vereist | functionele test |
| P-06 | Na afvinken start configureerbare rusttimer; timer kan worden overgeslagen en volgt verstreken tijd na terugkeer uit achtergrond. | vereist | functionele test |
| P-07 | Supersets/circuits tonen gekozen groepsvolgorde en rondes; elke set is apart registreerbaar. | vervolg | functionele test |
| P-08 | Offline geopende app kan vooraf beschikbare workouts uitvoeren, bewaren, heropenen en afronden; bij herverbinding worden wijzigingen idempotent gesynchroniseerd. | vereist | offline en sync-test |
| P-09 | Afgeronde trainingen verschijnen in historie, records en progressiegrafieken; berekeningen gebruiken voltooide sets en correcte eenheden. | vereist | functionele test |
| P-10 | Kalender toont geplande en afgeronde workouts. | vereist | functionele test |
| P-11 | iPhone-interface blijft leesbaar, numerieke invoer en afvinkknoppen bruikbaar, ook als toetsenbord open is. | vereist | handmatige iPhone-test |
| P-12 | Persoonlijke trainingsdata zijn alleen voor bevoegde gebruiker; uitloggen en accountgrenzen voorkomen ongeautoriseerde toegang. | vereist | autorisatietest |
| P-13 | Indien exportdata beschikbaar zijn, import toont fouten en doublures vóór bevestiging; import verandert bestaande records niet stilzwijgend. | uitbreiding | importtest |
| P-14 | Als Each bij een oefening is aangevinkt, verschijnt het repdoel als bijvoorbeeld 6–8 reps ea en de werkelijke waarde als bijvoorbeeld 7 reps ea. Uitgeschakeld toont het veld alleen reps. Eén invoerveld en vinkje per set; Each blijft behouden bij dupliceren en in sessiehistorie. | vereist | functionele test |
| P-15 | Maak een workout eenmaal, plan deze op vaste weekdagen voor een gekozen aantal weken of op een losse datum; geplande sessies kunnen afzonderlijk worden uitgevoerd zonder de historie te overschrijven. | vereist | functionele test |
| P-16 | Filter oefeningen op spiergroep en apparatuur, combineer met zoeken, wis filters; eigen oefeningen kunnen worden toegevoegd. | vereist | functionele test |
| P-17 | Bij bodyweight is geen kg-veld vereist of zichtbaar; bij dumbbells is kg per dumbbell en wordt die eenheid in historie behouden. | vereist | functionele test |
| P-18 | Bij afvinken met ontbrekende werkelijke waarden vraagt app om bevestiging; een bereik vereist concreet werkelijk aantal reps; annuleren bewaart invoer zonder vinkje. | vereist | functionele test |
| P-19 | Bewerk afgeronde sessie inclusief reps, kg en datum; historie en records/grafieken worden opnieuw berekend zonder duplicaat. | vereist | functionele test |
| P-20 | Sign in with Apple werkt na externe configuratie; alleen de bevoegde persoonlijke gebruiker kan data openen. | vereist | integratie- en autorisatietest |
| P-21 | Meerdere programma's zijn tegelijk actief en alle geplande sessies zijn in de kalender zichtbaar; geen programma overschrijft een ander. | vereist | functionele test |
| P-22 | Stel per week afwijkende richtreps en kg in; de juiste weekwaarden worden gebruikt als placeholders, zonder eerdere sessies te wijzigen. | vereist | functionele test |
| P-23 | Tijdens trainen is direct onder elke oefening de meest recente eerdere sessie zichtbaar met datum en werkelijke waarden per voltooide set in oorspronkelijke volgorde. Historie-icoon geeft toegang tot oudere sessies; dezelfde oefening is over programma's heen herkenbaar; geen huidige of niet-afgevinkte sets in de tabel. | vereist | functionele en regressietest |

| P-24 | Plan een voetbaltraining of andere sportactiviteit eenmalig of op vaste weekdagen; verplaats een individuele wedstrijd naar zaterdag of zondag zonder andere afspraken te wijzigen; alle activiteiten verschijnen naast fitnessworkouts. | vereist | functionele test |
| P-25 | Rond een sportactiviteit af en registreer de werkelijke duur; deze verschijnt in historie en de wekelijkse sporttijd telt alleen werkelijk geregistreerde duur, uitgesplitst per type, zonder dubbele telling. | vereist | functionele test |

| P-26 | Wissel tussen maand- en weekkalender; navigeer perioden en Vandaag; selecteer een datum en zie alle activiteiten inclusief afgeronde op werkelijke datum; nieuwe activiteit krijgt geselecteerde datum. | vereist | domein- en interactietest |

| P-27 | Swipe wisselt kalenderperiode; weekstatistieken scheiden geplande en werkelijke duur; bewerk één geplande activiteit zonder andere of historie te wijzigen. | vereist | functionele en iPhone-test |
| P-28 | Actieve training toont setnummers, volgende invoer, rusttimer met +15 sec en extra sets die alleen in de sessie bestaan. | vereist | functionele en iPhone-test |
| P-29 | Builder ondersteunt verslepen en toetsen/pijlen, favorieten en recente oefeningen, weekrichtwaarden kopiëren na bevestiging. | vereist | functionele en iPhone-test |

| P-30 | Bestaande lokale trainingsgegevens migreren naar IndexedDB; offline opslaan en herladen zonder verlies van bevestigde transacties; conflicterende vensters of opslagfout leiden tot waarschuwing en exportmogelijkheid zonder stille overschrijving. | vereist | unit- en browsertest, fysieke iPhone-review |

| P-31 | Actieve en afgeronde trainingen blijven vindbaar in de kalender; bij afwijkende datum blijft een verwijzing op geplande datum zonder dubbeltelling. Sets tijdens actieve training individueel verwijderen; afgevinkte sets en minimaal één set beschermd. | vereist | domein- en iPhone-test |

## Open details en aannames
- Appnaam en icoon later bepalen; Fitness Manager is werknaam. Kosten voor hosting, Apple-configuratie en AI afzonderlijk vooraf afstemmen; geen betaalde dienst activeren zonder akkoord.
- Voorgestelde historische standaard: laatste eerdere sessie direct zichtbaar; oudere sessies via historie-icoon. Bodyweight toont alleen reps; geen automatische suggestie die richtwaarden overschrijft.
- Apply to all zonder bronselector is gevraagd. Per actief veld kopiëren is de voorgestelde invulling; afgeronde sets blijven beschermd. Toetsenbordbalk testen in geïnstalleerde iPhone-PWA; de app kan de native iOS-toetsenbordbalk niet rechtstreeks aanpassen.
- Rustduur per oefening configureerbaar, 90 seconden standaard (besloten); supersets/circuits kunnen afwijkende rustmomenten hebben.
- Richtwaarden uit de builder hebben voorrang als placeholders; vorige gewichten eventueel later als afzonderlijke suggestie, nooit als gelogde prestatie. Links/rechts en circuits later als geavanceerde builderopties. Details van actieve flow toetsen aan aanvullende screenshots.
- Technische stack, hosting, syncconflicten, Apple Health-route en importmapping worden na akkoord uitgewerkt in TECH.md.
- Voor Apple Health eerst bepalen welke gegevens worden geschreven of gelezen; gebruiker kiest expliciet.
- Bron voor import: https://intercom.help/bridgeathletic/en/articles/2029275-how-to-export-exercise-history-from-the-team-page en https://intercom.help/bridgeathletic/en/articles/4346671-athlete-web-experience
- HealthKit: https://developer.apple.com/documentation/Xcode/configuring-healthkit-access

## Fase
De gebruiker heeft de visuele richting en oefenkaart goedgekeurd en de builder vereenvoudigd. De vereenvoudigde builder is goedgekeurd met als aanvulling een Each-vinkvakje. Laatste gebruikerskeuzes verwerkt, inclusief inline oefeninghistorie, meerdere actieve programma's en weekvarianten. Centrale sportkalender is expliciet goedgekeurd; het inline historie-ontwerp en overige eerder besproken schermen blijven de basis voor implementatie op featurebranch volgens AGENTS.md. Eerdere ongeteste verkenningsschets blijft op exploration/initial-prototype. Geen release of hosting goedgekeurd.

## Fasebesluit
Apple-login en cloudsynchronisatie voorlopig uitgesteld op verzoek gebruiker. De lokale ontwikkelversie blijft uitsluitend voor fictieve gegevens totdat beveiligde opslag en auth als volledige gebruikersstroom zijn gevalideerd.

## Formulierfeedback iPhone
P-32: compacte formulieren met zichtbare eenheden voor duur, weken, rusttijd en gewicht; datum/tijd passen binnen container; weekdagen alleen bij herhalen. Geen wijziging aan opslagcontract.

## Appupdates
P-33: zichtbaar geïnstalleerd versienummer, handmatige en automatische updatecontrole, melding bij beschikbare update, expliciet bijwerken zonder lokale data te wissen. Geen geforceerde update tijdens actieve training; bij opslagfout of meerdere vensters blokkeren.

## Trainingsupgrade 0.7 — criteria
P-34 Actieve sessie: toevoegen uit bibliotheek, vervangen/overslaan alleen zonder afgeronde sets, verplaatsen zonder template te wijzigen; wijzigingen blijven offline behouden. P-35 Warming-upsets optioneel, aparte targets, apart herkenbaar, niet meegeteld in werksetrecords. Superset: twee opeenvolgende oefeningen, gelijke werksetaantallen bij builder-koppeling, rust na beide sets per ronde; warming-up afzonderlijk, extra sets zelfstandig. P-36 Progressie: per oefening record kg/reps, geschatte 1RM (Epley 1–10 reps, 1 rep = gemeten gewicht), werkvolume kg×reps met expliciete ea- en dumbbellconventie; historische records herberekenen; periodes 1/3/6/12 maanden/alles. P-37 Sportbelasting: werkelijke minuten en optionele sessie-RPE 0–10, belasting min×RPE in arbitraire eenheden; ontbrekende RPE niet als nul, dekking tonen. Dagelijkse subjectieve slaap, energie, spierpijn 1–5, geen medische diagnose of trainingsadvies. P-38 compactere kaarten en consistente statushiërarchie. Geen login/sync, AI, circuits, herstelimport of nieuwe kosten.

## Upgrade 0.8 — criteria
P-39 Builder: standaardwaarden behouden, optionele werksetrichtwaarden per set (reps/gewicht/RIR/RPE), instructies, oefening dupliceren, aangrenzend trainingsblok dupliceren. AMRAP vereist werkelijk aantal reps; tijdsets registreren seconden, niet als reps of kg-records. Dropset is een gemarkeerde vervolgset zonder rust vooraf; geen dropsets in gekoppeld circuit. Superset/triset/circuit: 2–6 aangrenzende oefeningen met gelijke werksetaantallen, rust pas na ronde. Handmatige uitvoering, geen automatische timers voor tijdsets. Weekoverride verandert de basiswaarden, expliciete per-setwaarden blijven leidend. P-40 Vandaag: behoud kalender, actuele weektijd, alle actieve programma's en eerstvolgende activiteit, herstelstatus en hervatten. P-41 Spiergroepanalyse: 7-daagse week en vergelijking vorige week, voltooide werksets per primaire groep, historische bibliotheekfallback Overig, externe kg-volume conform bestaande conventie; tijdsets apart, geen schatting secundaire spieren. P-42 Back-up: bestaande JSON-export lokaal importeren, strikte validatie en samenvatting, expliciet vervangen (niet samenvoegen), actieve huidige training blokkeren, actieve sessie in geldige back-up behouden, revisie-CAS en vorige snapshot atomair bewaren, vorige snapshot exporteerbaar; geen netwerkupload. P-43 Live PR: uitsluitend nieuw strikt hoger record na voltooide werkset, vergelijken met eerdere vergelijkbare historische/actieve sets, geen melding op eerste meting of gelijke waarde, geen warming-up/tijdsets. P-44 consistent donker compact dashboard, formulieren en kaarten. Geen cloud of nieuwe kosten.

### Feedback vóór publicatie 0.8
P-39/P-44: actieve trainingskaart behoudt vertrouwde setindeling, reps/gewicht, vinkje, historie en rusttimer; geen extra RIR/RPE-rijen of instructieblokken. Instructies, RIR/RPE en blokleden alleen op verzoek via bestaand oefenmenu; preview via info-icoon. Minimale aanduiding voor dropset, tijd/AMRAP en gekoppeld blok blijft. P-41: spiergroepweekoverzicht toont alleen aantallen werksets en vergelijking vorige week (tijdsets apart), geen kg-volume of uitleg daarover. Individuele oefeningprogressie blijft ongewijzigd.

## Upgrade 0.9 — navigatie
P-45: Vandaag is zelfstandig dagdashboard (actuele datum, volgende activiteit of actieve training, andere activiteiten vandaag, weektijd, programma's en herstel). Agenda zelfstandig tabblad met bestaande maand/week, planning, swipe, historie en kleurcodering. Vijf tabs Vandaag, Agenda, Schema's, Progressie, Instellingen. Bibliotheek onder Schema's, bestaande picker via builder en sessie behouden. Vanuit Vandaag ook directe Agenda-knop. Geen wijziging trainingslogica, gegevens of hosting. P-46 lijniconen lokaal, labels en actieve status.
