# Fitness Manager — ontwerpafspraken

Status: oefenkaart goedgekeurd; builder goedgekeurd met Each-optie, 24 november 2026.

## Referentie en richting
De aangeleverde BridgeAthletic-screenshots (met name oefenpreview Strength Lowerbody en Core - Rotational) bepalen de visuele hiërarchie en spacing. De eerdere compacte tabelweergave en permanente kopieerknop zijn afgewezen. Behoud een rustige, ruime, verticaal scrollende oefenkaart; geen kopie van merk, broncode of beschermde video's. Voorbeelden met fictieve waarden.

## Oefenkaart
Afgeleide ontwerpwaarden op circa 390 CSS-px schermbreedte (te controleren op iPhone):
- Zwarte achtergrond #000; horizontale schermmarge circa 9–10 px; verticale tussenruimte tussen kaarten circa 18 px.
- Kaart met kleine radius 4–6 px, blauwgrijze header #3a4350, donker verloop #232c37 naar #151a20.
- Header circa 36–38 px hoog met 14 px horizontale padding; oefeningnummer wit, aantal sets gedempt #9da1af. Condensed semibold typografie als visuele richting; geen onrechtmatig fontgebruik.
- Oefenintro: circa 14 px padding, grote semibold oefeningnaam over volle kaartbreedte; geen thumbnail, video, afbeelding of lege media-placeholder. Behoud royale verticale ruimte.
- Setrij circa 55–60 px, dunne donkere scheiding, 14 px horizontale padding, voldoende verticale ruimte. Omlijnde compacte invoervelden voor reps en kg met eenheidslabel; afvinkknop rechts met ruim aanraakgebied (minimaal 44 px). Geen zichtbare kolomkoppen nodig als velden eenheden tonen. Gedempte halftransparante placeholders met repdoel (bijv. 6–10) en richtgewicht (bijv. 80); echte invoer in helder wit. Richtwaarden zijn geen ingevulde logwaarden. Bij afvinken groene feedback zonder de hele kaart fel te kleuren.
- Oranje #ff8900 voor focus, primaire acties en kleine contextacties; geen permanente grote oranje kopieerknop.

## Eenvoudige workout builder
- Trainingnaam en oefenkaarten met naam (bibliotheek zoeken of zelf toevoegen), aantal sets, repdoel of repbereik, optioneel richtgewicht in kg. Onder de velden een klein vinkvakje met label “Each (ea)”, standaard uit. Geen media-invoer.
- Hergebruik dezelfde kaartmarges, kleuren en typografische hiërarchie als de actieve training. Toevoegen, verwijderen en ordenen van oefeningen; één duidelijke opslaanknop.
- Richtwaarden gelden standaard voor iedere set; preview toont deze als gedempte placeholders, werkelijke registratie blijft onafhankelijk. Geen automatische vinkjes of wijziging van template tijdens training.

- Each ingeschakeld: toon bijvoorbeeld “6–8 reps ea” als gedempte richtwaarde en “7 reps ea” als helder ingevulde waarde. Een enkel repsveld, geen aparte arm/been-selectie. Gebruik dezelfde eenheidsaanduiding bij preview, actieve training en historie. Laat de bestaande spacing intact en geef het repsveld voldoende breedte.

## Contextuele toetsenbordactie
- Focus op numeriek veld toont app-eigen smalle balk direct boven zichtbaar iOS-toetsenbord met subtiele tekstactie “Apply to all” (rechts), zonder dropdown of setselector.
- Actieve cel is bron; kopieer alleen het actieve veld (reps of kg, eventueel links/rechts) naar andere onvoltooide sets van dezelfde oefening. Bron kan elke set zijn. Voltooide sets blijven ongemoeid. Geen automatisch afvinken.
- Balk verdwijnt bij sluiten toetsenbord of verlaten numerieke invoer. Geen extra permanente ruimte in de kaart.
- PWA: native toetsenbordaccessoire kan niet rechtstreeks worden aangepast; app-eigen balk aan zichtbare viewport verankeren met VisualViewport en focusbeheer, met fallback bij afwijkend browsergedrag. Test op fysieke iPhone in Safari en geïnstalleerde PWA; behoud focus tijdens Apply to all, herstel scroll bij dismiss, laat toetsenbord invoer en vinkjes niet bedekken.
- Toegankelijke veldnamen, zichtbare focus, numerieke toetsenborden, decimalen voor kg, feedback zonder uitsluitend kleur.

## Visuele acceptatiecriteria
| ID | Toestand | Verwachting | Controle |
| --- | --- | --- | --- |
| D-01 | Oefenkaart op 390 CSS-px | Verhoudingen, hiërarchie en spacing dicht bij aangeleverde referentie; grote oefeningnaam zonder media, ruime setrijen en dunne lijnen. | screenshotvergelijking |
| D-02 | Geen numerieke focus | Geen Apply to all, geen bronselector, geen extra balk. | handmatig |
| D-03 | Reps/kg focus met toetsenbord open | Subtiele Apply to all actie net boven toetsenbord, focusveld zichtbaar; geen overlap. | fysieke iPhone Safari en PWA |
| D-04 | Afvinken / kopiëren | Duidelijke feedback; geen onbedoelde status- of veldwijzigingen. | interactietest |
| D-05 | Lange naam / smallere breedte | Naam kan afbreken, velden blijven leesbaar en bediening bereikbaar. | 375/390/430 CSS-px |
| D-06 | Each aan/uit | Vinkvakje in builder; repslabel wisselt tussen reps en reps ea in preview en actieve training zonder extra invoervelden of overlap. | handmatig |

## Reviewstatus
Concept op basis van screenshots en gebruikersfeedback; geen browser- of iPhone-test uitgevoerd, oefenkaart goedgekeurd door gebruiker, builder goedgekeurd met aanvullende Each-optie; geen publicatie. Verdere schermen en technische details volgen na beoordeling.

## Volledige schermroute (voorstel ter beoordeling)
1. Inloggen — Sign in with Apple, persoonlijk account, sessie onthouden; na eerste login direct naar Vandaag.
2. Vandaag — weekkalender, geplande training, hervatten, snelle toegang tot losse workouts.
3. Schema's — actieve programma's en losse workouts; nieuw, dupliceren.
4. Programma — trainingsperiode, weken, herhaalbare workouts op vaste weekdagen en losse datumplanning.
5. Workout builder — naam, oefenkaarten, sets, repdoel, richtgewicht en Each; toevoegen en ordenen.
6. Oefening kiezen — zoekbare Engelse namen, combineerbare filters spiergroep/apparatuur, eigen oefening toevoegen; ook rechtstreeks via tab Oefeningen.
7. Workout preview — oefenkaarten met gedempte richtwaarden, start en bewerkactie.
8. Actieve training — identieke kaartopbouw met werkelijke invoer, vinkjes, voortgang en rusttimer.
9. Actieve training met numeriek toetsenbord — smalle contextbalk met Apply to all, geen setselector.
10. Afronden — bevestig voltooide sets, eventueel onvoltooide sets; sessie opslaan.
11. Trainingshistorie — datum en sessies, toegankelijk vanuit Progressie.
12. Sessiedetail — feitelijk geregistreerde sets, reps/ea, kg, onvoltooide sets.
13. Progressie — overzicht oefeningen, records en navigatie naar historiek.
14. Oefeningprogressie — gewicht over tijd, recente sets, records; gewichtseenheid expliciet.
15. Instellingen — account, syncstatus, rusttimer, data-export en import/integratie-status.
Vaste navigatie op hoofdpagina's: Vandaag, Schema's, Oefeningen, Progressie, Instellingen. Tijdens actieve training en builder is de tabbar verborgen. Geen media of lege beeldruimte. Voorbeelddata zijn fictief.
Besloten: vaste weekdagen en losse datums; bij afvinken zonder invoer bevestiging vragen, repbereik vereist concreet aantal; 90 seconden rust standaard per oefening aanpasbaar; kg per dumbbell; afgeronde sessies inclusief datum bewerkbaar; bodyweight zonder kg-veld; Sign in with Apple. BridgeAthletic-import en Apple Health blijven afhankelijk van export/technische haalbaarheid.

## Aanvullende schermvarianten
- Bibliotheek: zoekbalk met subtiele filteractie, compacte filterchips voor actieve keuzes; filterpaneel met spiergroep en apparatuur en reset. Oefeningenlijst blijft naamgericht zonder media. Eigen oefening kan metadata krijgen voor filtering. Voorstel: categorie Eigen oefeningen, primaire spiergroep en apparatuur.
- Programma aanmaken/plannen: naam, startdatum, aantal weken, bestaande of nieuwe workout, keuze vaste weekdagen of losse datums; toon overzicht van gegenereerde datums voor opslaan. Bijvoorbeeld twee oefeningen één keer instellen en dezelfde workout zes weken iedere dinsdag herhalen. Voorstel: wijzigen vanaf geselecteerde week of alleen een individuele toekomstige sessie, nooit historie stilzwijgend herschrijven.
- Builder: bodyweight-optie verbergt kg-veld; subtiel rusttijdveld standaard 90 sec. Dumbbell gewicht per stuk.
- Afvinken zonder feitelijke waarden: compact bevestigingspaneel met eenduidige richtwaarden en expliciet keuzeveld voor reps als richtlijn een bereik is. Behoud reeds ingevoerde waarden. Annuleren vinkt niet af.
- Sessiedetail: bewerkactie, wijzig datum/reps/kg, opslaan of annuleren; herbereken records. Inloggen: officiële Apple-knop volgens merkrichtlijnen, externe configuratie vereist.
- AI-voorstellen later vanuit Schema's: knop Nieuw voorstel, doel/duur/frequentie/equipment en historie, bewerkbare preview en bevestiging. Niet actief in MVP.
