# GitHub-controles per app activeren

Dit is een inrichtingshandleiding. Kopiëren activeert geen CI, branchregels of deployments. Richt dit in voor een concrete repository binnen de verleende opdracht; wijzig geen account- of repositoryinstellingen zonder autorisatie. Controleer beschikbare mogelijkheden in die repository.

## 1. Bestaande inrichting onderzoeken
Lees bestaande AGENTS.md, scripts, lockfiles, workflows en deploymenttriggers. Vul TECH.md met echte installatie- en controlecommando's. Voeg het PR-template samen met een bestaand template. Kies welke tests, lint, typecontrole en build voor deze app vereist zijn; voeg risicogerichte controles toe waar nodig.

## 2. Echte CI implementeren
Maak of wijzig een appgerichte workflow voor pull requests en de relevante branches. Voer daadwerkelijke controles uit; tekst afdrukken of fouten onderdrukken telt niet. Zorg voor reproduceerbare installatie, passende time-outs en herkenbare, stabiele checknamen. Gebruik minimale rechten, pin actions volgens repositorybeleid en geef onbetrouwbare PR-code geen toegang tot geheimen. Voer zulke code niet uit in een bevoegde context. Beperk productiebevoegdheden tot het releasepad.

Er is bewust geen generiek uitvoerbaar workflowbestand: zonder stack zouden installatie en controlecommando's fictief zijn.

## 3. Werking aantonen
Test in een toegestane branch/PR dat geldige code slaagt en een bewust geïntroduceerde controlefout de juiste job laat mislukken. Herstel de fout vóór oplevering. Controleer dat de juiste events de workflow starten en dat overgeslagen jobs geen schijnzekerheid geven. Noteer PR/run, commit, checknamen en resultaten. Als push/PR niet is toegestaan, bereid de bestanden lokaal voor en meld dat live verificatie ontbreekt.

## 4. Mergevoorwaarden instellen en verifiëren
Stel binnen de opdracht de daadwerkelijk bestaande checks verplicht voor de doelbranch; kies eventuele reviewvereisten per app. Controleer het gedrag bij een falende check en leg uitzonderingen en bypassrechten vast. Noem de regels pas geverifieerd na inspectie en passend bewijs van de blokkade. Beschikbare regels, rechten of abonnementsbeperkingen kunnen de inrichting beperken; meld dat expliciet.

## 5. Preview en release scheiden
Leg vast of een push, PR of merge een externe preview of productie uitrolt. Geen externe deployment zonder toestemming voor die stap. Gebruik anders een lokale preview. Previewomgevingen gebruiken veilige data en passende toegang. Richt productie zo in dat een automatische trigger het vereiste gebruikersakkoord niet kan omzeilen. Documenteer het concrete vrijgavemechanisme per app.

Publicatieakkoord hoort bij de beoordeelde commit of het artifact en de doelomgeving. Laat vóór publicatie vereiste checks voor die versie slagen en controleer herstelvoorbereiding. Verifieer na publicatie de live kernstroom.

## Gereedmelding
Leg in TECH.md inrichting en beperkingen vast, en in CHANGE.md bewijs van de actuele uitvoering:
- Workflowpaden, exacte checknamen en relevante events.
- Geslaagde run en aangetoonde foutdetectie.
- Werkelijk ingestelde branchregels en bewijs van mergeblokkade, of ontbrekende bevoegdheden.
- Preview- en productietriggers, goedkeuringsmechanisme en herstelprocedure.

Status: [niet ingericht/gedeeltelijk/geverifieerd]. Claim geen actieve bescherming op basis van alleen documentatie.
