# Cloudopslag en Apple-login — ontwerp ter goedkeuring

Status: voorbereid, niet aangesloten. Geen project of betaalde dienst aangemaakt. Geen credentials in GitHub.

## Dienstkeuze
Supabase Free: PostgreSQL + Auth, EU-regio indien beschikbaar, 500 MB per project. Gratis projecten kunnen na ongeveer 7 dagen lage activiteit pauzeren; geen downloadbare automatische back-ups op Free. Controleer plan en resterende gratis projectquota vóór aanmaak. Geen upgrade zonder expliciet akkoord. Bestaande Vercel-testproject blijft ongewijzigd.

## Datacontract en beveiliging
database/fitness_state.draft.sql is een reviewbaar SQL-ontwerp, geen toegepaste of door CLI gegenereerde migratie. Eerste sync-stap gebruikt één versieerbaar JSONB-document per eigenaar met afzonderlijke entiteiten in het document, aansluitend op bestaande lokale structuur. Dit is een pragmatische tussenstap voor één sporter; later normaliseren voor grotere volumes en AI-query's. Max 5 MiB per document; test omvang en export vóór invoering. RLS op auth.uid(), geen anon-toegang, geen service-role in browser. Revision compare-and-swap voorkomt lost updates; mutation-ID herkent de laatst bevestigde retry. Bij onduidelijke retry of revision mismatch: herlezen, geen blind overschrijven; conflict tonen, beide versies bewaren. Geen delete via Data API. Serverlogica moet documentstructuur volledig valideren voor productie. Het SQL-ontwerp is nog niet uitgevoerd of op syntax/RLS getest.

## Implementatievolgorde
1. Gebruiker keurt uitsluitend Free-project en regio goed; controleer daadwerkelijk abonnement.
2. Richt disposable testdatabase in en genereer migratie via CLI of gecontroleerde databaseworkflow; test met twee testaccounts en anon op cross-account reads/writes, revision conflicts, dubbele retry en foutinput. Voer advisors uit. Geen echte data.
3. Gebruik officieel Supabase JS SDK met vastgepinde versie en lockfile. OAuth PKCE met signInWithOAuth provider apple; configureer exact toegestane callback. Geen eigen OAuth-implementatie. De webapp toont echte Apple-login pas na succesvolle configuratie.
4. IndexedDB accountgebonden snapshot + outbox; migratie van lokale previewdata uitsluitend na expliciete importbevestiging, eerst JSON-export. Bij eerste login niets automatisch uploaden. CAS update met verwachte revision; bewaak mutaties tijdens sync, multi-tab en offline-reconnect. Auth tokens niet in app-cache; accountwissel verwijdert/isolereert lokale data, uitloggen met niet-gesynchroniseerde data vraagt bevestiging. Conflict blijft bewaard. Geen automatische overname van testdata.
5. Verifieer logout, offline hervatten, dubbele sync, twee apparaten, ongeldige/ verlopen sessie, back-up en restore. Pas na akkoord echte data.

## Apple Developer
Gebruiker heeft een Apple Developer-account. Maak/gebruik een primaire App ID met Sign in with Apple, aparte Services ID voor web, registreer het daadwerkelijke Supabase projectdomein en HTTPS callback https://<project-ref>.supabase.co/auth/v1/callback. Supabase Site URL en redirect allowlist: exacte stabiele app-URL, geen wildcard. De Apple .p8 signing key blijft privé; gebruiker configureert client ID en secret rechtstreeks in Supabase dashboard. Apple OAuth client secret moet elke zes maanden worden vernieuwd. Geen key in chat, repo of browser. Geen betaalde eigen domeinnaam nodig voor testopzet; verifieer Apple-domain/callback in dashboard. Expo niet nodig voor PWA.

Bronnen: https://supabase.com/pricing ; https://supabase.com/docs/guides/auth/social-sign-in/auth-apple ; https://supabase.com/docs/guides/database/postgres/row-level-security ; https://supabase.com/docs/guides/api/securing-your-api
