
# Nav-dekoratoren ![nav.no logo](./src/ikoner/meny/navlogo.svg) 
                     

Node.js Express applikasjon med frontend-komponenter i React.
Appen kjører på NAIS i en dockercontainer.


# Installasjon

```
npm install
```

# Bygg applikasjonen

```
npm run build (for produksjon)
npm run build-dev (for lokalt testing)
```

# Kjør applikasjonen

Kjør Express-server/dev-server lokalt: http://localhost:8088/dekoratoren

```
npm start
```

### Nais-cluster

Testmiljøene til dekoratøren er for tiden Q0, Q1, og Q6 
Url til disse miljøene: https://www-{miljø}.nav.no/dekoratoren/


### Bruk av menyen

Dekoratøren har tatt utgangspunkt at den skal være bakover kompatibel, slik at for de eksisterende applikasjoner i nav sitt portifølge som allerede har tatt i bruk dekoratør/v4 trengs det bare å bytte om Url adressen fra https://appres.nav.no/.... til https://www.nav.no/dekoratoren
En kan implementere menyen ved eks:

```
const url =
    
    'http://<test-mijø | prod-adr>/dekoratoren';
const requestDecorator = callback => request(url, callback);
const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
        {
        håndtere inject av data med selektor, enten manuelt eller ved bruk av template engine
        }
        .....
```

eks2: 
sett inn 5 linjer html i front-end:
```
<html>
  <head>
      <link href=http://<miljø adresse>/dekoratoren/css/client.css rel="stylesheet" /> 
  </head>
  <body>
    <section class="navno-dekorator" id="decorator-header" role="main"></section>
    {
      // deres app 
    }
    <section class="navno-dekorator" id="decorator-footer" role="main">
    <div id="decorator-env" data-src="<miljø adresse>/dekoratoren/env.json"></div>
    <script type="text/javascript" src=<miljø adresse>/dekoratoren/client.js></script>
  </body>
</html>
```
eks3:
Bruk av pus-decoratør:

I app-config.yaml bytt ut fasitResources til å peke på ny dekoratør
```
fra
fasitResources:
  used:
  - alias: appres.cms
    resourceType: baseUrl

til
fasitResources:
  used:
  - alias: nav.dekoratoren (denne peker på https://www.nav.no)
    resourceType: baseUrl

```
For komplett oppsett se: https://github.com/navikt/pus-decorator

Appen blir server rendert. Derfor anbefales det å bruke en .js fil til å fetche innholdet fra 'http://<test-mijø | prod-adr>/dekoratoren'. For så å selektere innholdet i id'ene. Selektors som i dag er tatt i bruk:
   
      styles            (inneholder css til appen)
      header-withmenu   (header mounting point)
      footer-withmenu   (footer mounting point)
      scripts           (scripts til applikasjonen)


# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
