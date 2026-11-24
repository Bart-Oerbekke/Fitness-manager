# Fitness Manager

Persoonlijke mobiele trainingsapp met fitness, voetbal en andere sportactiviteiten in één kalender. Dit is de eerste lokale ontwikkelversie, niet gereed voor productie.

## Start lokaal
Node 22 en Python 3. Open een checkout van deze branch en voer uit:
```sh
npm run check
npm test
npm start
```
Open http://localhost:8000. Gebruik uitsluitend fictieve gegevens. Geen npm-installatie nodig. Apple-login en synchronisatie zijn nog niet aangesloten. Geen publieke preview/deployment ingesteld.

## Projectafspraken
AGENTS.md, REVIEWFLOW.md en GITHUB-INRICHTING.md blijven leidend. PRODUCT.md en DESIGN.md bevatten de goedgekeurde productrichting en schermen. TECH.md beschrijft architectuur, controles en releasegrenzen. CHANGE.md bevat de actuele wijziging en bewijs.

## Ontwikkelflow
Eigen featurebranch, gerichte commits, PR, echte checks, zelfreview en preview. Merge en publicatie uitsluitend na afzonderlijk akkoord. Geen externe kosten zonder akkoord. Geen echte trainingsdata of sleutels in GitHub.

## Testhosting
Zie PREVIEW.md voor de gratis Vercel-preview. `npm run build` maakt een afzonderlijke dist-map met uitsluitend appbestanden. Nog geen deployment.
