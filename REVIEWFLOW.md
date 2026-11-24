# Code- en designreviewflow

## Omvang en voorbereiding
Een grotere wijziging verandert bijvoorbeeld een gebruikersstroom, meerdere componenten, architectuur, gegevensschema, afhankelijkheid, autorisatie of publicatiegedrag. Gebruik deze flow ook voor een kleine wijziging met grote gevolgen. Voor een kleine wijziging volstaat een beknopt verslag met relevante controles en zelfreview.

Lees PRODUCT.md, DESIGN.md, TECH.md en de actuele diff. Leg in CHANGE.md vast: criteria, scope, risico, beoordeelde versie en reviewtype. Onafhankelijke review of extra agents alleen als gebruiker of toepasselijke instructies dit expliciet toestaan; benoem zelfreview eerlijk.

## 1. Verificatie
Voer de relevante appcontroles uit. Controleer de echte gebruikersstroom en risico's buiten het gelukkige pad. Koppel resultaten aan acceptatiecriteria. Noteer commando/methode, uitkomst en versie. Leg ontbrekende controledekking vast. Maak voor zichtbare wijzigingen een reproduceerbare preview.

## 2. Codereview
Beoordeel de uiteindelijke wijziging en aangrenzende contracten op:
- Correctheid: productcriteria, randgevallen, fouten en asynchrone toestanden.
- Regressies: bestaande stromen, API's, compatibiliteit en gegevensintegriteit.
- Veiligheid waar relevant: rechten, invoervalidatie, gegevensblootstelling en geheimen.
- Onderhoudbaarheid: projectconventies, verantwoordelijkheden, onnodige complexiteit en afhankelijkheden.
- Testkwaliteit: bewijs van relevant gedrag en regressies; voeg geen tests toe die alleen de implementatie herhalen.
- Operationele gevolgen: configuratie, migraties, deploymenttriggers en herstelbaarheid.

## 3. Designreview bij zichtbaar gedrag
Vergelijk de werkende preview met PRODUCT.md en DESIGN.md. Controleer relevante schermformaten, kernstromen en toestanden. Beoordeel hiërarchie, leesbaarheid, spacing, componentconsistentie, content, responsive gedrag en interactiefeedback. Controleer toetsenbordbediening, focus, semantiek en toepasselijke toegankelijkheidsdoelen. Benoem wat alleen via screenshots is bekeken en welke interacties echt zijn uitgevoerd.

## 4. Bevindingen en herstel
Leg per bevinding vast: locatie, reproduceerbaar probleem, effect, prioriteit, oplossing en status.

| Prioriteit | Betekenis | Gevolg |
| --- | --- | --- |
| Blokkerend | Vereist criterium kapot, onveilige werking, ernstige regressie of verplichte check mislukt | Oplossen en opnieuw controleren vóór gereedmelding voor publicatie |
| Overig | Beperkte afwijking of verbetering | Expliciete afweging, eigenaar en vervolgactie indien open |

Review de oplossing en herhaal de controles die door de correctie worden geraakt. Een mislukte verplichte check mag niet als geslaagd of niet van toepassing worden hernoemd. Controleer dat er geen open blokkerende bevindingen zijn.

## 5. Preview en gebruikersbeoordeling
Lever previewadres of exacte startstappen, versie, testscenario's, behaalde criteria, controlebewijs en resterende punten. Als preview niet mogelijk is, vermeld reden en wat daardoor niet beoordeeld is; claim geen visuele goedkeuring. Verwerk feedback, controleer wijzigingen opnieuw en vernieuw de preview.

## 6. Publicatie en nazorg
Leg expliciet gebruikersakkoord vast voor versie/artifact, doelomgeving en relevante migratie. Een PR, geslaagde CI, previewakkoord of mergeakkoord is op zichzelf geen publicatieakkoord. Controleer vlak vóór publicatie of versie, checks en akkoord nog bij elkaar horen. Bij materiële wijzigingen opnieuw voorleggen.

Voer de vastgelegde releaseprocedure alleen binnen dit akkoord uit. Controleer daarna de live kernstroom en registreer versie, URL en uitkomst. Volg bij problemen de geautoriseerde herstelprocedure; meld wat mislukt en onzeker blijft. Een review sluit niet alle fouten uit.
