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
