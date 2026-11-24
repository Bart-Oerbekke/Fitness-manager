# Fitness Manager — productbrief

Status: concept, niet goedgekeurd. 24 november 2026.

## Probleem, doelgroep en resultaat
De gebruiker gebruikt BridgeAthletic en wil zelfstandig trainingen samenstellen in plaats van afhankelijk te zijn van een trainer. Behoud het snelle mobiele loggen van herhalingen, kilogrammen en voltooide sets. Eerste doelgroep: persoonlijk gebruik, nog te bevestigen. De screenshots zijn functionele en visuele referenties, geen broncode of licentie voor media.

## Kernstromen
1. Maak een programma, trainingsblok of workout aan; voeg oefeningen met sets, repdoelen en optioneel gewicht toe en orden ze.
2. Open een workout vanuit een kalender of programma; bekijk oefeningen en doelwaarden.
3. Start, voer werkelijk uitgevoerde reps en kg in, vink sets af en corrigeer invoer indien nodig.
4. Hervat een onderbroken sessie, rond af en raadpleeg eerdere prestaties.
5. Hergebruik trainingen en oefeningen zonder opnieuw alle gegevens in te voeren.

## Scope
Voorgestelde MVP: kalender, workout builder, herbruikbare oefeningen, repbereiken, gewicht optioneel, per-zijde reps, setregistratie, historie, laatste waarden, basisprogressie. Rusttimer is een wens. Eigen stijl met donker thema en oranje accenten. Mogelijke latere scope: voedingslog, chat, coachrollen, uitgebreide analytics, automatische imports, externe integraties en oefenvideo's. Geen echte persoonlijke trainingsdata of geheimen in de openbare repository.

## Acceptatiecriteria (concept)
| ID | Gegeven / wanneer / dan | Prioriteit | Verificatie |
| --- | --- | --- | --- |
| P-01 | Een gebruiker maakt een workout aan met meerdere oefeningen en repbereiken; na opslaan kan deze opnieuw worden geopend en aangepast. | vereist | functionele test |
| P-02 | De gebruiker start een workout en ziet de oefeningen in de gekozen volgorde met voorgeschreven sets en repdoelen. | vereist | functionele test |
| P-03 | Een gebruiker voert geldige reps en optioneel kg in; een set is afvinkbaar en de voortgang wordt bijgewerkt; foutieve invoer wordt geweigerd. | vereist | functionele test |
| P-04 | Een afgevinkte set kan worden gecorrigeerd; eerder gelogde gegevens blijven intact bij navigatie of herstart. | vereist | functionele test |
| P-05 | Na afronden verschijnt de sessie in historie; een volgende sessie toont vorige waarden zonder deze als uitgevoerde sets te tellen. | vereist | functionele test |
| P-06 | De mobiele interface blijft leesbaar en bedienbaar op een iPhone, inclusief numerieke invoer en grote afvinkknoppen. | vereist | handmatige mobiele test |
| P-07 | Een training kan worden gepland en teruggevonden op de kalender. | wens | functionele test |

## Open keuzes
- Platform: installeerbare mobiele webapp (PWA) of native iOS/Android; voorkeur PWA tenzij platformvereisten anders vragen.
- Alleen persoonlijk gebruik of meerdere gebruikers/coaches?
- Cloudsync, accounts en offline werking; voorkeur offline loggen met veilige synchronisatie indien gewenst.
- Programmastructuur: periodes, herhalende weken, flexibele workouts versus vaste kalender.
- Setlog: vorige waarden als voorstel of vooraf ingevuld; gewenste rusttimer, RPE/RIR en aparte links/rechts-invoer.
- Oefeningenbibliotheek: zelf toevoegen, initiële bibliotheek, instructies/media en rechten daarop.
- Bestaande BridgeAthletic-trainingen en historie overnemen indien gebruiker deze kan exporteren.
- Nederlandse of Engelse UI; taal van oefeningnamen.

## Fase en bewijs
Productrichting nog niet bevestigd. Een voortijdige, ongeteste verkenningsschets is apart bewaard op exploration/initial-prototype; de appcode is uit main teruggenomen. Geen implementatie- of releaseakkoord. Eerst de open keuzes bespreken en productbrief bevestigen, daarna de schets beoordelen volgens AGENTS.md. Geen hosting of deployment aangevraagd of uitgevoerd via de gebruikte GitHub-acties.
