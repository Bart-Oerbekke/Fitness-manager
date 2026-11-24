# Ontwikkelbasis voor nieuwe apps

Dit is een zelfstandige, stackonafhankelijke startbasis. Er is nog geen app, actieve CI, hosting of cloudomgeving ingericht.

## Start een nieuwe app
1. Gebruik op GitHub Use this template > Create a new repository. Kies een eigen repository per app.
2. Koppel de nieuwe repository aan een Codex-cloudomgeving en laat dependencies, controles en veilige testdata passend inrichten. Publiceer de ontwikkelomgeving na controle; dit is geen publicatie van de app.
3. Beschrijf je idee in de chat. Codex leest AGENTS.md, stelt gerichte verkenningsvragen en schrijft PRODUCT.md. Bevestig de productbrief voordat ontwerp begint; beoordeel daarna de eerste schets voordat verdere implementatie begint.
4. Codex vult DESIGN.md en TECH.md in, bouwt een afgebakende versie en richt echte CI in volgens GITHUB-INRICHTING.md.
5. Per wijziging: eigen branch, gerichte commits, PR, relevante controles, zelfreview en preview. De gebruiker beslist over merge en afzonderlijk over publicatie.

## Algemeen en per app
- Algemeen: de werkwijze, bevoegdheden, verkenning en kwaliteitseisen staan in AGENTS.md en REVIEWFLOW.md.
- Per app: Codex werkt doelgroep, scope en criteria uit in PRODUCT.md; visuele en interactieafspraken in DESIGN.md; stack, echte commando's, cloudinrichting, preview en release in TECH.md.
- Per wijziging: criteria, bewijs, review en akkoord in CHANGE.md. Bewaar afgeronde verslagen voordat dit bestand wordt hergebruikt.

## Mobiel werken
De afspraken staan in deze repository; er is geen lokale Windows-map nodig. Een cloudomgeving moet apart worden ingericht en beschikbaar zijn op je account. Een GitHub-koppeling alleen is geen draaiende cloudomgeving. Voor een interactieve preview op je telefoon is een bereikbaar previewadres nodig; hosting, toegang en kosten worden per app afgesproken.

## Template onderhouden
Wijzigingen aan deze template worden niet automatisch doorgevoerd in eerder aangemaakte apps. Neem verbeteringen daar bewust en passend over. Repositoryregels, secrets, cloudomgevingen en hosting worden apart ingericht en gecontroleerd. Er zijn bewust geen fictieve CI-jobs of automatische deployments toegevoegd.