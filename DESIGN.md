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

## Inline oefeninghistorie tijdens training
- Direct onder de laatste set van iedere oefenkaart: compacte gedempte tabel met datum van laatste eerdere sessie en werkelijke reps en kg per voltooide set, in setvolgorde. Geen grafiek, grote kop of permanente extra knop. Gebruik subtiel contrast met donkere achtergrond, kleine tekst (ca. 12–13 CSS-px) met leesbaar contrast, 14 px horizontale padding, compacte rijen (ca. 24–28 px). Setnummers links en waarden uitgelijnd; ea tonen waar van toepassing; kg per dumbbell expliciet indien relevant. Bodyweight laat gewichtkolom weg.
- Klein historie-icoon rechts naast datum opent oudere sessies van dezelfde oefening (ook andere programma's); terugkeer bewaart actieve invoer en scroll. Geen historische waarden als werkelijke invoer overnemen. Bij geen historie een korte gedempte melding. Laatste eerdere sessie als voorgestelde standaard; geen huidige sessie in tabel.

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

| D-07 | Actieve oefenkaart met historie | Compacte tabel direct onder setrijen, datum en werkelijke reps/kg in setvolgorde, subtiel historie-icoon; geen extra navigatie nodig voor laatste sessie. | screenshot en interactietest |

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

- Programmaoverzicht ondersteunt meerdere gelijktijdige actieve programma's. Weekselector met weekgebonden richtreps en kg; wijziging raakt alleen gekozen toekomstige scope, niet afgesloten sessies. Appnaam en icoon voorlopig werknaam zonder definitief merkontwerp.

## Centrale sportkalender (goedgekeurd)
- Vandaag/weekoverzicht toont fitness (oranje), voetbaltraining (blauw #4b99e9), wedstrijd (groen #95d65a) en overige sportactiviteiten met tekstlabels en iconen; kleur is niet het enige onderscheid. Dezelfde donkere kaartstijl en spacing. Meerdere activiteiten op dezelfde datum mogelijk.
- Nieuwe activiteit: type, naam, datum, optioneel tijdstip, verwachte duur, wekelijks herhalen met dagselectie. Wedstrijd op een losse datum of individueel verplaatsen. Herhaalregels en wijzigingen voor toekomstige gebeurtenissen scheiden van afgeronde historie.
- Activiteit afronden: werkelijk uitgevoerde duur invoeren/bevestigen en afvinken; geen oefenvelden. Historie bevat alle sporttypen; progressie toont totale werkelijke sporttijd per week en per type, los van krachttrainingsrecords. Geplande duur telt niet als gerealiseerde duur.
- D-08: weekoverzicht met meerdere activiteitstypen, herkenbare labels, meerdere activiteiten per dag, herhalende voetbaltraining en losse wedstrijd; bevestiging en duurregistratie getest.
- Later: RPE, herstelanalyse, wearabledata, wedstrijdimport en AI-planning rond sportactiviteiten. Geen betaalde diensten of externe deployment zonder expliciet akkoord.

## UX-revisie 2 — compacte kalender en algemene dichtheid
Gebruiker vindt eerste werkende preview te groot en onprettig. Maand- en weekweergave zoals een agenda, standaard maand; onthoud voorkeur. Zeven kolommen maandag-zondag, aangrenzende maanddagen gedempt, vandaag gemarkeerd, geselecteerde dag met agenda eronder, maximaal twee compacte activiteitlabels per cel plus aantal overige. Weekweergave toont alle zeven dagen met compact gestapelde activiteiten; geen grote lege kaarten. Vorige/volgende periode, Vandaag en één toevoegactie; datumselectie bepaalt planning. Geplande en voltooide activiteiten onderscheiden; afgeronde op werkelijke datum. Activiteitstypen behouden kleuren en labels. Compacte globale schaal: 14px basis, 16–17px oefeningstitels, 10px kaartpadding, 10px tussen kaarten, 50px setrij. 16px invoertekst tegen Safari focuszoom en 44px primaire bediening. Maandcellen compacter, leesbaarheids- en touchtest open. Geen exacte Outlook-kopie. D-09: beide kalenderweergaven, maandgrenzen, geselecteerde dag, meerdere activiteiten, actuele datum, beperkte breedte, behoud historische data; fysieke iPhone-test vereist.

## UX-revisie 3
Compacte weekstatistieken bij geselecteerde week, onbekende geplande duur expliciet. Horizontale swipe alleen in kalender; verticale scroll intact. Optiemenu bewerkt één activiteit. Rustdock tijdens rust, verborgen bij numerieke invoer, +15 sec/overslaan; volgende veld via contextbalk of Enter (native iOS toetsenbordgedrag nog testen). Extra set met + naast nummer; alleen sessiesnapshot. Favorietster en favorietenfilter, recente selectie boven gewone lijst; drag-handle en bestaande pijlen. Kopieer naar volgende week met bevestiging. Trilfeedback uitsluitend indien browser ondersteunt. Geen long-press menu in deze iteratie.

## Lokale opslagstatus
Subtiele statusregel alleen tijdens laden, opslaan of offline; duidelijke herstelmelding bij fout, export- en herlaadactie. Geen wijzigingen aan de goedgekeurde kalender/kaartverhoudingen. Instellingen toont IndexedDB-status, JSON-export en optionele aanvraag blijvende browseropslag. Geen nep-login of cloudstatus.

## Feedback iPhone — training
Verwijder de dubbele Volgende-knop (native iOS pijlen bestaan); één kleine zwevende Apply to all-chip met kopie-icoon, neutrale tekst, rechts boven toetsenbord. Native toetsenbord niet aanpasbaar vanuit PWA. Voeg naast + Set toevoegen een gedempte − Set verwijderen actie toe: selecteer onafgeronde set en bevestig. Laat ingevulde waarden in keuze zien. Minimaal één set per oefening; vink een afgeronde set eerst uit als bewust verwijderen nodig is. Kalender toont actieve sessie en voltooid vinkje, ook een verwijzing op geplande datum bij afwijkende werkelijke datum. Na afronding naar werkelijke datum in kalender. Geen dubbeltelling. Fysieke iPhone-layout te beoordelen.

## UX-revisie 4 — compacte formulieren
38px buitenhoogte, 16px invoertekst tegen iOS-zoom, 11px labels en eenheden, 4px labelafstand, 8–9px tussenruimte. Datum/tijd en programmastart/duur naast elkaar, 7 weekdagchips Ma–Zo, verborgen voor eenmalige activiteit. Donkere dialog met 13px padding, horizontale acties, sluitknop. D-10: 320/375/390/430px geen horizontale clipping; fysieke iPhone-test open.

## Updatebediening
Instellingen > Applicatie: versienummer, subtiele status, Controleer op updates en alleen bij wachtende update knop Bijwerken. Bij actieve training disabled met uitleg. Geen automatische reload; geen storende melding tijdens training.

## Upgrade 0.7 — ontwerp
Actieve kaart: subtiele optiemenu's, warm-up label, supersetrondes met gekoppelde A/B-markering, actieve setbediening; sessieaanpassingen nooit templates. Progressie: compacte KPI-tegels, periodechips, grafiek met eenheden en lijst historische prestaties; bodyweight en externe belasting niet mengen. Sportbelasting: dagelijkse minuten per sport en RPE-dekking, herstelcheck-in in eigen kaart. Geen pseudo-medische readinessscore. Donkere compacte stijl, 16px inputs en 44px primaire targets. Fysieke iPhone-review blijft vereist.

## UX 0.8
Kalender blijft centraal. Bovenaan compact Vandaag-overzicht met actuele sporttijd, programmavoortgang, eerstvolgende activiteit en herstel; historische kalenderselectie wijzigt het actuele overzicht niet. Builder: details uitklapbaar, individuele settargets, unitlabels, duidelijke modus en koppeling. PR-melding tijdelijk, niet modaal; geen alarm of medisch advies. Back-up: bestand selecteren, samenvatting, expliciet bevestigen, vorige lokale staat exporteerbaar. Spiergroepbalken met aantallen/volume en periodevergelijking; geen absolute norm of afgeleide spierbelasting. Fysieke Safari-review blijft open.

### Focus tijdens training
0.7-setkaart is de referentie: geavanceerde builder blijft buiten de actieve kaart. Geen extra rijen, lange bloknamen of instructieparagrafen. Richtwaarden en instructies op verzoek in dialoog via ⋯; info-icoon in preview alleen waar relevant. Tijd/AMRAP blijven binnen dezelfde invoerrij, D naast setnummer, klein bloklabel. Spiergroepen: sets met vorige-weekbalken, geen kilo's. PR-melding tijdelijk zoals eerder.

## UX 0.9
Goedgekeurde indeling: Vandaag zonder maandkalender; Agenda zonder dashboard. Volgende activiteit bovenaan, andere activiteiten vandaag, weektijd met sportkleuren, programma's en herstel. Geen dubbele volgende activiteit. Bibliotheekkaart onder Schema's; geselecteerde nav-tab oranje met tekst en lijnicoon, overige grijs. Inline SVG zonder icon-font of netwerk, 22px, vijf gelijkwaardige knoppen. Compacte 320/375/390/430px layout. Trainingskaart ongewijzigd.

## UX 0.10
Schema's met Programma's/Workouts/Archief, compacte voortgangskaarten en optiemenu's, bibliotheek altijd bereikbaar. Afzonderlijke historie-editor met bestaande setvelden, eenvoudige knoppen en expliciete opslaan/annuleren. Geen extra rijen in actieve training. Destructieve acties met bevestiging en concrete gevolgen. Historische data nooit door templatebewerking wijzigen.

## UX 0.11
Donkere stijl behouden. Gemeenschappelijke periodebalk met 44px pijltjes, 24px SVG, midden week/maand en datums, duidelijke focus. Hoofdtitels links, subtitels met terugknop; 4/8/12px ritme, kaarten 9–10px radius, gewone tekst 14–15px, metadata 12px waar ruimte, kalender compacte uitzondering. Menuopties met lijniconen en rode destructieve rij onderaan. Programmadetail één week, compacte rijen en duidelijk voortgang. Historie-editor behoudt 16px input, 44px actiegebieden. Actieve training behoudt setgeometrie. Formulieren 38px compact zoals gebruiker eerder goedkeurde; primaire knoppen 44px. Toetsenbord- en zichtbare focuscontrole, fysieke iPhone/VoiceOver afzonderlijk.

## UX 0.12
Zelfstandige bibliotheek: compacte rijen, naam opent detail; ster blijft apart. Detail toont twee posekaarten of één voor hold, Nederlandse instructies, techniekfouten, spieren, materiaal, alternatieven en bron. Externe video via herkenbare knop, internet nodig; geen iframe/autoplay. Onbeschikbare uitleg/afbeelding/video eerlijk melden. Terug naar gefilterde lijst en scrollpositie; bestaande progressieactie bereikbaar. Geen wijziging aan training/pickers.

## UX 0.16
Behoud donker/oranje identiteit en 44px primaire doelen. Oefeningnaam en setvoortgang in één compacte kop, afgeronde sets met rustige groene achtergrond en leesbare waarden. Sticky trainingsstatus met tijd en sets. Builderkaart is een native details-element met samenvatting; invoer blijft in DOM en validatie opent verborgen velden. Vandaag prioriteert eerstvolgende activiteit, dan snelle start en ondersteunende informatie; weekstatistieken onder de agenda. Grafiek gebruikt datumproportionele x-as, raster, gelabelde eenheid en toegankelijke datapunttitels. Respecteer reduced motion. Geen wijziging aan domein- of opslagmodel.
