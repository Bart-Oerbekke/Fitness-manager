# Technische keuzes en uitvoering

Status: in te vullen per app. Kies technologie op basis van producteisen en bestaande omgeving. Noteer geen geheimen.

## Architectuur en besluiten
- Stack, runtime en versies: [invullen]
- Componentgrenzen, gegevensopslag en gegevensstromen: [invullen]
- Authenticatie, autorisatie en validatie: [invullen]
- Externe diensten en afhankelijkheden, met reden: [invullen]
- Migraties, compatibiliteit en relevante beveiligingsrisico's: [invullen]
- Besluiten en afwegingen: [invullen of verwijzing]

## Reproduceerbare lokale uitvoering
- Vereisten en installatiecommando: [invullen]
- Startcommando en lokaal previewadres: [invullen]
- Omgevingsvariabelen: [alleen namen, doel en veilige configuratiewijze]
- Testdata en veilige testaccounts: [werkwijze zonder productiegegevens/geheimen]

## Controles
| Controle | Exact commando/methode | Toepassingsgebied en slaagcriterium | Verplicht wanneer |
| --- | --- | --- | --- |
| Tests | [invullen] | [kernstromen en regressies] | [invullen] |
| Lint/typecontrole/build | [splits waar nodig] | [invullen] | [invullen] |
| Toegankelijkheid/visueel | [tool en handmatige methode] | [DESIGN-criteria] | [invullen] |
| Beveiliging/migratie | [risicogerichte methode] | [invullen] | [invullen] |

Verwijder geen relevante controles om een groene status te krijgen. Markeer niet-toepasselijk met reden. Resultaten van een concrete uitvoering horen in CHANGE.md.

## GitHub per repository
- Repository, doelbranch en branch/PR-afspraken: [invullen]
- Workflowbestanden en exacte checknamen: [invullen]
- Verplichte checks en eventueel verplichte reviewers: [werkelijk ingestelde regels]
- Rechten, secrets en omgang met onbetrouwbare PR-code: [invullen]
- Activeringsbewijs: [PR/run en controle van falende check en mergeblokkade]
- Status: [niet ingericht/gedeeltelijk/geverifieerd], beperkingen: [invullen]

## Omgevingen, preview en publiceren
| Omgeving | Doel en URL | Trigger/commando | Toegang en gegevens |
| --- | --- | --- | --- |
| Lokaal | [invullen] | [invullen] | [invullen] |
| Preview indien gebruikt | [invullen] | [expliciet toegestane deployment] | [afgeschermd waar nodig] |
| Productie | [invullen] | [inclusief automatische merge/push-trigger] | [invullen] |

- Publicatieverantwoordelijke en vereiste rechten: [invullen]
- Releaseprocedure voor exact beoordeelde versie/artifact: [stappen]
- Configuratie, migratievolgorde en back-up indien nodig: [stappen]
- Herstelprocedure, vorige versie en beperkingen van dataherstel: [invullen]
- Smokecheck na deployment: [kernstroom, signalen en slaagcriteria]
- Foutafhandeling en monitoring: [stoppen, herstel of escalatie binnen verleende bevoegdheid]

Automatische productiedeployment mag het gebruikersakkoord niet omzeilen. Leg vast hoe uitvoering pas na akkoord plaatsvindt. Een teruggedraaide appversie herstelt niet vanzelf gewijzigde data.
