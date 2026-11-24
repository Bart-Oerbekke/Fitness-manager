# Fitness Manager — productbrief

Status: keuzes uit gebruikersintake verwerkt; ter bevestiging. 24 november 2026.

## Doel en gebruikers
Persoonlijke fitnessapp voor één sporter die nu BridgeAthletic gebruikt en zelfstandig trainingen wil maken. Snelle mobiele registratie van reps, kg en voltooide sets is de primaire gebruikersstroom. Installeerbare iPhone-webapp (PWA), Nederlandstalige interface met Engelse oefeningnamen. Eigen visuele stijl, donker met oranje accenten.

## Scope eerste bruikbare versie
- Kalender, programma's met trainingsperiodes en workouts, plus losse herbruikbare workouts; dupliceren van workouts en schema's.
- Oefeningenbibliotheek met Engelse namen en eigen oefeningen. Alleen rechtmatig beschikbare content; geen kopie van BridgeAthletic-media.
- Workout builder: volgorde, sets, repbereik, optioneel gewicht, afzonderlijke links/rechts-registratie, supersets en circuits.
- Preview, actieve training, setregistratie, vorige gewichten vooraf invullen (per oefening en corresponderende set), vinkjes, automatische instelbare rusttimer, hervatten en afronden.
- Apply to all: kopieer reps en kg van een gekozen set naar overige nog niet voltooide sets van dezelfde oefening in de actieve sessie. Bij eenzijdige oefeningen per zijde kopiëren. Niet automatisch afvinken, geen andere oefeningen, geen wijziging van template of historie. Reeds afgevinkte sets beschermen. Overschrijven van andere onvoltooide invoer duidelijk aankondigen.
- Historie, persoonlijke records en progressiegrafieken per oefening.
- Privé account, online synchronisatie en offline trainen; lokaal bewaren van wijzigingen, zichtbare syncstatus, herstel na onderbreking en bescherming tegen dubbele registratie. Geen echte persoonsgegevens in openbare repository.

## Gewenste uitbreidingen en afhankelijkheden
- Import van BridgeAthletic-schema's en trainingshistorie indien beschikbaar: eerst representatieve CSV/PDF van gebruiker of trainer inspecteren. Geen aanname van directe API-toegang. Importpreview, veldmapping, deduplicatie en validatie vóór opslaan.
- Apple Health: directe HealthKit-toegang vereist een native iOS-appcomponent met toestemming; niet rechtstreeks beschikbaar in een pure PWA. Onderzoek later native wrapper of optionele Opdrachten/Shortcuts-route voor ondersteunde gegevens. Geen automatische HealthKit-synchronisatie beloven voor PWA.
- Voeding, coachrollen, chat, RPE/RIR buiten eerste scope tenzij later gevraagd.

## Acceptatiecriteria (concept)
| ID | Gegeven / wanneer / dan | Prioriteit | Verificatie |
| --- | --- | --- | --- |
| P-01 | Maak en wijzig programma's, periodes en losse workouts; duplicaten zijn zelfstandig bewerkbaar. | vereist | functionele test |
| P-02 | Selecteer bibliotheek- of eigen oefeningen en configureer volgorde, sets, repbereiken, kg, zijden en groepen; preview klopt met template. | vereist | functionele test |
| P-03 | Voer geldige werkelijke reps en kg in, vink sets af, corrigeer en zie voortgang; invalid input wordt geweigerd. | vereist | functionele test |
| P-04 | Apply to all kopieert gekozen waarden alleen naar andere onvoltooide sets van diezelfde oefening, per zijde indien relevant; voltooide sets, andere oefeningen en historie blijven intact; geen automatische vinkjes. | vereist | functionele en regressietest |
| P-05 | Start volgende workout: vorige gewichten staan vooraf ingevuld waar beschikbaar, zonder dat sets als uitgevoerd tellen. | vereist | functionele test |
| P-06 | Na afvinken start configureerbare rusttimer; timer kan worden overgeslagen en volgt verstreken tijd na terugkeer uit achtergrond. | vereist | functionele test |
| P-07 | Supersets/circuits tonen gekozen groepsvolgorde en rondes; elke set is apart registreerbaar. | vereist | functionele test |
| P-08 | Offline geopende app kan vooraf beschikbare workouts uitvoeren, bewaren, heropenen en afronden; bij herverbinding worden wijzigingen idempotent gesynchroniseerd. | vereist | offline en sync-test |
| P-09 | Afgeronde trainingen verschijnen in historie, records en progressiegrafieken; berekeningen gebruiken voltooide sets en correcte eenheden. | vereist | functionele test |
| P-10 | Kalender toont geplande en afgeronde workouts. | vereist | functionele test |
| P-11 | iPhone-interface blijft leesbaar, numerieke invoer en afvinkknoppen bruikbaar, ook als toetsenbord open is. | vereist | handmatige iPhone-test |
| P-12 | Persoonlijke trainingsdata zijn alleen voor bevoegde gebruiker; uitloggen en accountgrenzen voorkomen ongeautoriseerde toegang. | vereist | autorisatietest |
| P-13 | Indien exportdata beschikbaar zijn, import toont fouten en doublures vóór bevestiging; import verandert bestaande records niet stilzwijgend. | uitbreiding | importtest |

## Open details en aannames
- Apply to all beschermt afgeronde sets en kopieert alleen invoer, niet status; voorgesteld gedrag ter beoordeling.
- Rustduur per oefening configureerbaar, voorstel 90 seconden standaard; supersets/circuits kunnen afwijkende rustmomenten hebben.
- Vorige gewichten per set; reps blijven doel/suggestie tot werkelijk ingevoerd of gekopieerd. Details van actieve flow toetsen aan aanvullende screenshots.
- Technische stack, hosting, syncconflicten, Apple Health-route en importmapping worden na akkoord uitgewerkt in TECH.md.
- Voor Apple Health eerst bepalen welke gegevens worden geschreven of gelezen; gebruiker kiest expliciet.
- Bron voor import: https://intercom.help/bridgeathletic/en/articles/2029275-how-to-export-exercise-history-from-the-team-page en https://intercom.help/bridgeathletic/en/articles/4346671-athlete-web-experience
- HealthKit: https://developer.apple.com/documentation/Xcode/configuring-healthkit-access

## Fase
De intakekeuzes zijn verwerkt. Productbrief ter bevestiging; daarna beoordeelbare schets volgens AGENTS.md, gevolgd door implementatie op featurebranch. Eerdere ongeteste verkenningsschets blijft op exploration/initial-prototype. Geen release of hosting goedgekeurd.
