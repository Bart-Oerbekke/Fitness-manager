# Testomgeving — Vercel Hobby

Status: afzonderlijk testproject gedeployed en HTTP-gecontroleerd; fysieke iPhone-test open. Alleen fictieve data gebruiken.

## Hosting
Voorkeur Vercel Hobby, persoonlijke toepassing binnen gratis limieten. Geen domeinaankoop. Gebruik het toegewezen vercel.app HTTPS-adres. Een project of domein is pas bevestigd als Vercel dit daadwerkelijk heeft aangemaakt. GitHub Pages is een alternatief, maar niet geactiveerd. Geen database, Apple-login of Expo nodig voor deze preview.

## Build en scope
- GitHub repository Bart-Oerbekke/Fitness-manager, branch feature/local-first-mvp, PR #1.
- Framework: Other / statische site; Node 22; build: npm run check && npm test && npm run build; output: dist.
- Build kopieert alleen acht expliciet genoemde appbestanden. Geen repositorydocumentatie, tests of geheimen in dist. Geen environment variables.
- Maak een afzonderlijk previewproject of een handmatige previewdeployment van een beoordeelde commit. Schakel automatische deployments uit waar mogelijk; verbind niet automatisch main als productiebranch zonder expliciet besluit. Controleer de daadwerkelijke providerinstellingen en de gekozen commit.
- Voor een toegankelijke iPhone-preview moet eventuele Vercel-authenticatie bewust worden afgehandeld. Publiek bereikbare testbuild bevat geen gebruikersrecords. X-Robots-Tag voorkomt indexering bij ondersteunende zoekmachines, maar is geen toegangsbeveiliging.
- Gebruik het gratis Hobby-plan; geen betaalde add-ons, upgrades of domeinaankopen. Kosten per dienst vooraf afstemmen.

## iPhone-test
Open geverifieerde HTTPS-URL in Safari. Deel > Zet op beginscherm; open via beginscherm. Test eerst online en daarna vliegtuigmodus. Controleer layout en toetsenbordbalk met Apply to all, afronden, eerdere historie, voetbalplanning, herladen en offline opslag. Gebruik fictieve gegevens; geen accountbeveiliging of online synchronisatie. Verwijder testdata via browserinstellingen als gewenst.

## Apple / Expo
Gebruiker heeft een Apple Developer-account en Expo-account. Voor web-login is later een Services ID met primaire App ID en exact domein/callback nodig; geen private sleutels in chat/repo. Een eigen betaald domein is niet vereist voor de lokale preview. Verifieer gekozen stabiele host en auth-provider voordat Apple-instellingen worden gewijzigd. Expo Go is voor React Native, niet deze bestaande HTML/CSS/JS-PWA; native uitbreiding blijft optioneel.

## Nog open
Vercel-verbinding, gratis plan, previewdeployment van concrete commit, live smokecheck, fysieke iPhone-test, CI-verificatie. Geen toestemming voor productiepublicatie of merge.

## Eerste externe testdeployment — 24 november 2026
- Gebruiker gaf opdracht de testomgeving voor te bereiden en koppelde Vercel. Afzonderlijk project fitness-manager-preview, zonder Git-integratie of automatische deployments. Geen betaalde add-ons, upgrade of domein aangeschaft; bestaand teamabonnement niet zichtbaar via team-API, werkelijke facturatie niet geverifieerd.
- Handmatig gedeployed vanaf exact GitHub-snapshot d14314f682ea9f2673de887a5d758a1b98240d7a, 12 bronbestanden, build allowlist 8 publieke appbestanden. Deployment dpl_GXss6Pbd2LpUDzNPWbfY2Sv8GLxe, READY. URL https://fitness-manager-preview.vercel.app. Vercel retourneerde target production bij eerste deployment ondanks weggelaten target; dit is uitsluitend het afzonderlijke testproject, niet een vrijgave van main of productieapp. Geen merge, promotie of automatische Git-koppeling.
- Buildlogs bevestigen npm run check, npm test (9 geslaagd, 0 mislukt), npm run build. Geauthenticeerde HTTP-controle van /, /manifest.webmanifest, /src/app.mjs en /sw.js: 200. Geen echte Safari/iPhone-interactie of offline test uitgevoerd. Vercel Authentication behouden; gebruiker kan mogelijk moeten inloggen. Alleen fictieve data, geen Apple-login/cloudsync.
