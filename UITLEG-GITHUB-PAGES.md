# Je website gratis online zetten met GitHub Pages

Je website bestaat uit deze bestanden:

| Bestand | Wat is het |
|---|---|
| `gegevens.js` | **Jouw gegevens**: telefoon, e-mail, KvK en foto's. Dit is het enige bestand dat je zelf hoeft aan te passen. |
| `index.html` | De pagina zelf (alle teksten staan hierin) |
| `style.css` | De opmaak: kleuren, lettertypes, indeling |
| `script.js` | Zet je gegevens op de pagina, regelt het mobiele menu en het offerteformulier |
| `favicon.svg` | Het kleine icoontje in het tabblad van de browser |

Dit uitlegbestand hoef je niet te uploaden (mag wel, het kan geen kwaad).

---

## Stap 1 – Nieuwe repository maken

1. Ga naar <https://github.com> en log in.
2. Klik rechtsboven op het **+** en kies **New repository**.
3. Bij **Repository name** vul je een naam in. Twee keuzes:
   - **Tip:** noem hem precies `jouwgebruikersnaam.github.io` (met je eigen GitHub-naam).
     Dan wordt je adres: `https://jouwgebruikersnaam.github.io`
   - Of een andere naam, bijvoorbeeld `evertstimmerwerk`. Dan wordt je adres:
     `https://jouwgebruikersnaam.github.io/evertstimmerwerk/`
4. Kies **Public** (verplicht voor de gratis versie van GitHub Pages).
5. Klik op **Create repository**.

## Stap 2 – Bestanden uploaden

1. Klik in je nieuwe repository op **uploading an existing file**
   (of later via **Add file → Upload files**).
2. Open op je pc de map `timmerman-website` en selecteer de **bestanden erin**
   (`gegevens.js`, `index.html`, `style.css`, `script.js`, `favicon.svg`).
   Sleep de losse bestanden naar GitHub, **niet de map zelf**.
   `index.html` moet direct bovenaan in de repository staan.
3. Klik onderaan op **Commit changes**.

## Stap 3 – GitHub Pages aanzetten

1. Ga in je repository naar **Settings** (tandwieltje bovenaan).
2. Klik links op **Pages**.
3. Bij **Source** kies je **Deploy from a branch**.
4. Bij **Branch** kies je **main** en daarnaast **/ (root)**. Klik **Save**.
5. Wacht 1 tot 2 minuten en ververs de pagina. Bovenaan verschijnt:
   *"Your site is live at …"* met je adres. Klik erop: je website staat online!

Bij **Actions** in je repository zie je de voortgang (een groen vinkje = klaar).

---

## Later je telefoon, e-mail of KvK-nummer toevoegen

Alles wat je nog niet hebt, wordt op de site gewoon **niet getoond**. Zodra je
het wel hebt:

1. Klik in je repository op `gegevens.js`.
2. Klik op het **potloodje** (Edit) rechtsboven.
3. Zet je gegevens tussen de aanhalingstekens. Bijvoorbeeld:
   ```
   telefoon: "06 12345678",
   whatsapp: "06 12345678",
   email: "info@evertstimmerwerk.nl",
   kvk: "12345678",
   ```
   Let op: laat de aanhalingstekens `"` en de komma `,` aan het eind staan.
4. Klik op **Commit changes**. Na 1 à 2 minuten is je site bijgewerkt.

Wat er dan vanzelf gebeurt:
- Met een **telefoonnummer** verschijnt de knop "Bel" bovenaan en bij Contact.
- Met een **WhatsApp-nummer** verschijnt "Stuur een bericht" (opent WhatsApp).
- Met een **e-mailadres** verschijnt ook het **offerteformulier**.
- Met een **KvK-nummer** komt dat onderaan de pagina te staan.

Ziet de site er na een wijziging ineens kaal of kapot uit? Dan is er waarschijnlijk
een aanhalingsteken of komma weggevallen in `gegevens.js`. Kijk die regel even na.

## Later foto's toevoegen

1. Maak de foto's kleiner voordat je ze uploadt (bijvoorbeeld max. 1600 pixels breed),
   dan laadt de site snel op mobiel. Gebruik simpele namen zonder spaties of hoofdletters:
   `keuken-1.jpg`, `deur-1.jpg`, `nino.jpg`.
2. Zet ze op je pc in een map die `fotos` heet.
3. Ga in GitHub naar **Add file → Upload files** en sleep de **hele map `fotos`** erin.
   Klik **Commit changes**.
4. Open `gegevens.js` (potloodje) en zet de foto's erin:
   ```
   profielfoto: "fotos/nino.jpg",

   fotos: [
     { bestand: "fotos/keuken-1.jpg", tekst: "Nieuwe keuken geplaatst" },
     { bestand: "fotos/deur-1.jpg",   tekst: "Binnendeur opnieuw afgehangen" },
   ]
   ```
5. Klik **Commit changes**. De lege fotovakken worden dan vanzelf je echte foto's.

Gebruik alleen foto's die je zelf hebt gemaakt, en vraag klanten toestemming
als hun huis herkenbaar is.

## Hoe werkt het offerteformulier?

GitHub Pages kan zelf geen e-mails versturen. Daarom opent het formulier het
**mailprogramma van de bezoeker** met het bericht al ingevuld; de bezoeker drukt
daar op verzenden. Er worden geen gegevens opgeslagen en er zijn geen cookies.

## Goed om te weten: KvK

Zodra je betaalde klussen gaat doen, moet je ingeschreven staan bij de KvK.
Na je inschrijving ben je ook verplicht je KvK-nummer op je website te zetten,
dus vul dat dan meteen in `gegevens.js` in.
Check bij de inschrijving ook of de naam "Everts Timmerwerk" nog vrij is
(dat kun je zoeken op <https://www.kvk.nl/zoeken>).

## Later een eigen domeinnaam? (optioneel)

Wil je een adres als `www.evertstimmerwerk.nl`? Dat kost een paar euro per jaar bij een
domeinnaam-aanbieder. In **Settings → Pages → Custom domain** kun je die koppelen.
Dit is niet nodig: de gratis `github.io`-link werkt prima.
