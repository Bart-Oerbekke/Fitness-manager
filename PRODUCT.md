# Fitness Manager — productbrief

Status: productrichting en oefenkaart goedgekeurd; vereenvoudigde builder goedgekeurd met aanvullende Each-optie. 24 november 2026.

## Doel en gebruikers
Persoonlijke fitnessapp voor één sporter die nu BridgeAthletic gebruikt en zelfstandig trainingen wil maken. Snelle mobiele registratie van reps, kg en voltooide sets is de primaire gebruikersstroom. Installeerbare iPhone-webapp (PWA), Nederlandstalige interface met Engelse oefeningnamen. Eigen visuele stijl, donker met oranje accenten.

## Scope eerste bruikbare versie
- Kalender, programma's met trainingsperiodes en workouts, plus losse herbruikbare workouts; dupliceren van workouts en schema's. Een workout met bijvoorbeeld twee oefeningen kan eenmaal worden samengesteld en voor zes weken op vaste weekdagen ingepland; losse datumplanning ook mogelijk. Voorgesteld: toekomstige afzonderlijke sessies kunnen afwijken, afgeronde historie blijft onafhankelijk.
- Uitgebreide oefeningenbibliotheek met Engelse namen en eigen oefeningen; zoeken en filteren op spiergroep, apparatuur en eventueel eigen oefeningen. Metadata voor filters, geen video's, afbeeldingen of uitgebreide beschrijvingen.
- Eenvoudige workout builder: oefeningnaam, aantal sets, vast repdoel of repbereik, optioneel richtgewicht in kg (gewicht per dumbbell), keuze om gewichtveld weg te laten voor bodyweight, rustduur per oefening (standaard 90 seconden), een vinkvakje Each (ea) per oefening (standaard uit) en volgorde. Each betekent dat de reps per arm of been gelden; geen afzonderlijke keuze voor lichaamsdeel en geen dubbele invoervelden in de eerste versie. Richtwaarden gelden standaard voor alle sets. Links/rechts, supersets en circuits blijven op de roadmap, niet nodig in de eerste builder.
- Preview, actieve training, setregistratie, repdoelen en richtgewicht als gedempte placeholders; werkelijk uitgevoerde waarden afzonderlijk registreren, vinkjes, automatische instelbare rusttimer, hervatten en afronden.
- Apply to all: subtiele tekstactie in een app-eigen balk direct boven het numerieke toetsenbord, uitsluitend tijdens invoer. De actieve invoercel bepaalt automatisch oefening, set, veld (reps of kg) en eventueel zijde. Kopieer alleen dat veld naar overige onvoltooide sets van dezelfde oefening. Geen setselector of permanente kopieerknop; geen automatische vinkjes, geen andere oefeningen, geen wijziging van template of historie. Reeds afgevinkte sets beschermen.
- Historie, persoonlijke records en progressiegrafieken per oefening.
- Privé account met Sign in with Apple, online synchronisatie en offline trainen; lokaal bewaren van wijzigingen, zichtbare syncstatus, herstel na onderbreking en bescherming tegen dubbele registratie. Geen echte persoonsgegevens in openbare repository.

## Gewenste uitbreidingen en afhankelijkheden
- AI-trainingsvoorstellen: later een nieuw meerweeks schema voorstellen op basis van doelen, beschikbare apparatuur, trainingsfrequentie, historie en feedback; gebruiker kan voorstel bewerken en expliciet accepteren. Geen automatische overschrijving of verzending van persoonlijke data zonder passende toestemming. Datamodel in MVP houdt oefeningen, templates, geplande sessies en feitelijke prestaties gescheiden. AI-provider, kosten en privacy nog te bepalen.
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

## Open details en aannames
- Apply to all zonder bronselector is gevraagd. Per actief veld kopiëren is de voorgestelde invulling; afgeronde sets blijven beschermd. Toetsenbordbalk testen in geïnstalleerde iPhone-PWA; de app kan de native iOS-toetsenbordbalk niet rechtstreeks aanpassen.
- Rustduur per oefening configureerbaar, 90 seconden standaard (besloten); supersets/circuits kunnen afwijkende rustmomenten hebben.
- Richtwaarden uit de builder hebben voorrang als placeholders; vorige gewichten eventueel later als afzonderlijke suggestie, nooit als gelogde prestatie. Links/rechts en circuits later als geavanceerde builderopties. Details van actieve flow toetsen aan aanvullende screenshots.
- Technische stack, hosting, syncconflicten, Apple Health-route en importmapping worden na akkoord uitgewerkt in TECH.md.
- Voor Apple Health eerst bepalen welke gegevens worden geschreven of gelezen; gebruiker kiest expliciet.
- Bron voor import: https://intercom.help/bridgeathletic/en/articles/2029275-how-to-export-exercise-history-from-the-team-page en https://intercom.help/bridgeathletic/en/articles/4346671-athlete-web-experience
- HealthKit: https://developer.apple.com/documentation/Xcode/configuring-healthkit-access

## Fase
De gebruiker heeft de visuele richting en oefenkaart goedgekeurd en de builder vereenvoudigd. De vereenvoudigde builder is goedgekeurd met als aanvulling een Each-vinkvakje. Aanvullende gebruikerskeuzes verwerkt; aangepaste planning en bibliotheekfilters ter beoordeling. Vervolgens implementatie op featurebranch volgens AGENTS.md. Eerdere ongeteste verkenningsschets blijft op exploration/initial-prototype. Geen release of hosting goedgekeurd.
