# Persoonlijke Codex-werkwijze

Deze algemene afspraken gelden in deze map en onderliggende mappen. Dit wijzigt geen globale Codex-instellingen. Een project buiten deze map neemt deze afspraken expliciet over. Lokale projectafspraken vullen de werkwijze aan met appkeuzes; lees alle toepasselijke AGENTS.md-bestanden. Volg bij strijdige instructies de geldende instructiehiërarchie en benoem relevante conflicten.

## Algemene ontwikkelflow
1. Lees bestaande projectafspraken, relevante code en workflows. Vertaal de wens naar toetsbare acceptatiecriteria en scope voordat je implementeert. Leg aannames vast.
2. Leg per app productvereisten, designafspraken en technische keuzes vast in PRODUCT.md, DESIGN.md en TECH.md. Behoud bestaande conventies; leg geen universele stijl of stack op.
3. Houd voor de wijziging doel, risico, acceptatiecriteria en bewijs bij in CHANGE.md. Kies kleine, samenhangende wijzigingen zonder ongevraagde features of afhankelijkheden.
4. Implementeer zelfstandig binnen de opdracht. Vraag alleen naar belangrijke ontbrekende keuzes die niet uit beschikbare informatie volgen. Een onzekere keuze met grote gevolgen wordt eerst opgelost; overig werk kan doorgaan.
5. Voer controles uit die passen bij risico en gedrag. Review grotere wijzigingen volgens de lokale REVIEWFLOW.md in deze repository; review kleine wijzigingen proportioneel.
6. Los blokkerende bevindingen op en controleer de aangepaste delen opnieuw. Lever een controleerbare preview bij zichtbaar gedrag of ontwerp en vermeld eventuele beperkingen.
7. Lever resultaat, behaalde acceptatiecriteria, controlebewijs en onzekerheden op. De gebruiker beoordeelt de preview en beslist over publiceren.
8. Publiceer of deploy uitsluitend na expliciet akkoord voor die stap en die versie. Controleer daarna de gepubliceerde werking en leg het resultaat vast.

## Verkenning bij een nieuwe app
- Start een nieuwe app met verkenning voordat je schermen ontwerpt of implementeert. Lees eerst de beschikbare context en stel een korte, gerichte vragenronde over ontbrekende informatie die de productrichting of het ontwerp wezenlijk bepaalt: doelgroep, kernprobleem, belangrijkste gebruikersstromen, eerste versie, gewenste uitstraling en relevante randvoorwaarden.
- Vraag niet opnieuw naar bekende informatie. Bied waar nuttig concrete keuzemogelijkheden met een onderbouwd voorstel. De gebruiker hoeft geen stack, technische specificaties of controlecommando's aan te leveren; werk die zelf passend uit.
- Maak vervolgens een korte productbrief met doelgroep, gewenste uitkomst, kernstromen, scope, aannames en open keuzes. Leg deze vast in PRODUCT.md of verwijs naar de bestaande bron van waarheid. Wacht op bevestiging van de gebruiker voordat je schermen ontwerpt of implementeert.
- Werk na bevestiging eerst een passende schets of eenvoudig prototype uit. Leg dit ter beoordeling voor voordat je de app verder implementeert. Een schets kan afhankelijk van de app een schermopzet, wireframe of gebruikersstroom zijn.
- Deze faseovergangen vormen bij nieuwe apps een aanvulling op de zelfstandige uitvoering hierboven. Als de gebruiker de richting of schets al expliciet heeft goedgekeurd, gebruik dat akkoord en vraag het niet opnieuw. Pas de omvang aan de opdracht aan; kleine wijzigingen in bestaande apps doorlopen niet opnieuw de volledige intake. Verken bij een ingrijpende nieuwe productrichting alleen de betrokken keuzes opnieuw.

## Kwaliteit en bewijs
- Bepaal relevante tests, lint, typecontrole, build, toegankelijkheid, visuele inspectie en beveiligings- of migratiecontroles op basis van de wijziging.
- Doe code- én designreview wanneer toepasselijk. Benoem zelfreview als zelfreview. Gebruik alleen onafhankelijke review of extra agents als de gebruiker of toepasselijke instructies dat expliciet toestaan.
- Claim een controle alleen na uitvoering; vermeld resultaat, versie en bewijs. Een ontbrekende controle krijgt een reden en consequentie. Een checklist of workflowbestand bewijst geen geslaagde run.
- Blokkeer oplevering als gereed voor publicatie bij kapotte acceptatiecriteria, onveilige werking, ernstige regressies of mislukte verplichte checks. Een tussentijdse preview mag worden gedeeld met duidelijke status.
- Houd documentatie proportioneel: kleine wijzigingen kunnen een kort CHANGE-verslag gebruiken; laat essentiële criteria, verificatie en bevoegdheden niet weg.

## Bevoegdheden
- Commit, push en merge uitsluitend binnen de verleende opdracht. Verstuur geen berichten aan anderen zonder expliciete opdracht.
- Previewakkoord, mergeakkoord en publicatieakkoord zijn afzonderlijk; leg de verleende scope vast. Een merge die automatisch productie uitrolt is ook publiceren en vereist vooraf publicatieakkoord.
- Controleer automatische deployments voordat je pusht of merget. Deel een extern gehoste preview alleen als die deployment is toegestaan; gebruik anders een lokale preview.
- Bind publicatieakkoord aan de beoordeelde commit of het artifact, doelomgeving en eventuele migratie. Vraag opnieuw akkoord als het resultaat daarna materieel wijzigt.
- Wijzig geen repositoryregels, productiegegevens of accountinstellingen buiten de opdracht.

## Wat per app wordt ingericht
Gebruik README.md als startpunt: doelgroep, scope, gebruikersstromen, visuele richting, toegankelijkheidsdoelen, stack, echte controlecommando's, GitHub-checks, previewomgeving, hosting, publicatie en herstelprocedure. Templates zijn invulhulpen; ze activeren geen CI, branchregels of deployments.


# Projectafspraken voor Codex

De algemene afspraken zijn hierboven opgenomen. Deze projectafspraken vullen ze aan.

- Lees PRODUCT.md, DESIGN.md en TECH.md vóór wijzigingen en volg de flow in README.md.
- Start een nieuwe app met gerichte verkenningsvragen en een korte productbrief. Laat de gebruiker eerst de productrichting bevestigen, en daarna de eerste schets beoordelen voordat je verder implementeert. Gebruik bestaand expliciet akkoord; herhaal de volledige intake niet voor kleine wijzigingen. Zie de verkenningsfase in README.md.
- Leg criteria, aannames, risico, bewijs en review vast in CHANGE.md. Volg REVIEWFLOW.md bij grotere wijzigingen en bij kleine wijzigingen met grote gevolgen.
- Behoud bestaande conventies. Vul hieronder lokale architectuurgrenzen, codeconventies en relevante paden in; kies geen stack of stijl op basis van dit template.
- Lever zichtbare veranderingen met een beoordeelbare preview. Voer controles uit vóór oplevering en benoem zelfreview als zelfreview. Onafhankelijke review of extra agents alleen na expliciete toestemming door gebruiker of toepasselijke instructies.
- Commit, push en merge alleen binnen de opdracht. Controleer automatische deployments vóór die acties. Publiceer uitsluitend na expliciet akkoord voor versie en doelomgeving.

## Lokale conventies
- Broncode, tests en gegenereerde bestanden: [paden en bewerkingsregels]
- Architectuurgrenzen en codeconventies: [invullen]
- Controlecommando's en vereiste checks: zie TECH.md [sectie/verwijzing]
- Afwijkingen op algemene afspraken: [reden en toepassingsgebied, of geen]


## Werken via chat en GitHub
- De repository is de bron van waarheid. Lees voor elke wijziging de actuele doelbranch; gebruik geen achterlopende lokale map als uitgangspunt.
- Bij een implementatieopdracht mag Codex standaard een eigen featurebranch, gerichte commits en een PR voorbereiden en via de beschikbare GitHub-tools aanmaken of bijwerken, mits dit geen niet-goedgekeurde deployment activeert. Merge en publicatie vereisen afzonderlijk expliciet akkoord.
- Gebruik een passende cloudcheckout of de beschikbare GitHub-koppeling. Als lokale Git-schrijfacties geblokkeerd zijn, onderzoek de GitHub-tools voordat je handmatige Git-opdrachten bij de gebruiker neerlegt. Meld ontbrekende toegang concreet.
- Overschrijf geen remote geschiedenis of ander onafgerond werk. Meld als API-commits en een lokale checkout uiteenlopen; claim geen synchronisatie zonder verificatie.
- Lever voor mobiele beoordeling screenshots en waar mogelijk een bereikbaar previewadres. Vraag akkoord voor externe previewhosting en eventuele kosten; een localhost-adres is geen mobiele preview.
- Codex vult product-, design- en technische documentatie zelf in en houdt die bij. De gebruiker levert wensen en belangrijke productkeuzes, geen verplichte technische invulformulieren.