// =====================================================================
//  JOUW GEGEVENS
//  Dit is het enige bestand dat je hoeft aan te passen.
//
//  Regels:
//  - Zet je gegevens TUSSEN de aanhalingstekens "  ".
//  - Laat iets leeg ("") als je het nog niet hebt. Dan wordt het
//    op de website gewoon niet getoond.
//  - Laat de komma's aan het eind van de regels staan.
// =====================================================================

var GEGEVENS = {

  // Telefoonnummer, gewoon zoals je het zou opschrijven. Voorbeeld: "06 12345678"
  telefoon: "",

  // WhatsApp-nummer, ook gewoon zoals je het opschrijft. Voorbeeld: "06 12345678"
  // (Meestal hetzelfde als je telefoonnummer.)
  whatsapp: "",

  // E-mailadres. Voorbeeld: "info@evertstimmerwerk.nl"
  // Zodra dit is ingevuld, verschijnt ook het offerteformulier op de site.
  email: "",

  // KvK-nummer (8 cijfers). Voorbeeld: "12345678"
  kvk: "",

  // Btw-identificatienummer. Mag leeg blijven als je dit niet wilt tonen.
  btw: "",

  // Foto van jezelf (bij "Over mij").
  // Upload de foto in de map "fotos" en zet hier de naam. Voorbeeld: "fotos/nino.jpg"
  profielfoto: "",

  // Foto's van je werk. Upload ze in de map "fotos" en zet ze hieronder.
  // Per foto één regel, met een korte beschrijving. Voorbeeld:
  //   { bestand: "fotos/keuken-1.jpg", tekst: "Nieuwe keuken geplaatst in Hoorn" },
  //   { bestand: "fotos/deur-1.jpg",   tekst: "Binnendeur opnieuw afgehangen" },
  fotos: [
    { bestand: "fotos/tv-wand.jpg",                 tekst: "Tv-wand met inbouwhaard, nissen en verlichting" },
    { bestand: "fotos/keuken-geplaatst-1.jpg",      tekst: "Keuken geplaatst" },
    { bestand: "fotos/keuken-geplaatst-2.jpg",      tekst: "Keuken geplaatst, met aanrechtblad en spoelbak" },
    { bestand: "fotos/keukenwand-voorbereid.jpg",   tekst: "Keukenwand voorbereid: nieuwe beplating en aansluitpunten" },
    { bestand: "fotos/keuken-wit.jpg",              tekst: "Keuken geplaatst met boven- en onderkasten" },
    { bestand: "fotos/keuken-gesloopt.jpg",         tekst: "Elektra voorbereid voor de stukadoor: leidingen ingefreesd en dozen geplaatst" },
    { bestand: "fotos/keukenwand-beplaat.jpg",      tekst: "Keukenwand opnieuw beplaat, met nieuwe aansluitpunten" },
    { bestand: "fotos/buitenlamp-1.jpg",           tekst: "Buitenlamp gemonteerd en aangesloten" },
    { bestand: "fotos/buitenlamp-2.jpg",            tekst: "Buitenlamp naast de achterdeur" },
    { bestand: "fotos/plafond-regelwerk.jpg",       tekst: "Plafond: regelwerk en isolatie aangebracht" },
    { bestand: "fotos/plafond-dicht-1.jpg",         tekst: "Plafond dichtgezet met gipsplaten" },
    { bestand: "fotos/schoorsteen-afgetimmerd.jpg", tekst: "Schoorsteenkanaal dichtgezet, plafond beplaat" },
    { bestand: "fotos/plafond-dicht-2.jpg",         tekst: "Nieuw plafond met gipsplaten" },
    { bestand: "fotos/zolderplafond.jpg",           tekst: "Zolderplafond dichtgezet" },
    { bestand: "fotos/schuin-plafond.jpg",          tekst: "Schuin plafond: isoleren en beplaten" },
    { bestand: "fotos/plafond-afwerklat.jpg",       tekst: "Plafond met afwerklat langs de wand" },
    { bestand: "fotos/plafond-geopend.jpg",         tekst: "Plafond geopend en uitgezet met de laser" },
    { bestand: "fotos/aanrecht-afgekit.jpg",        tekst: "Aanrecht netjes afgekit" },
    { bestand: "fotos/vloer-uitvlakken.jpg",        tekst: "Ondervloer uitvlakken langs de wand" },
    { bestand: "fotos/tegelhoek-afgekit.jpg",       tekst: "Tegelhoek netjes afgekit" },
    { bestand: "fotos/trap-afwerking.jpg",          tekst: "Bij de trap gipsplaten tegen beide muren geplaatst en rondom netjes afgekit" },
    { bestand: "fotos/gang-wand.jpg",               tekst: "Gipsplaat tegen de muur geplaatst en netjes afgewerkt" },
    { bestand: "fotos/scharnier-ingelaten.jpg",     tekst: "Scharnier strak ingelaten (oefenstuk tijdens mijn opleiding)" },
    { bestand: "fotos/insteekslot.jpg",             tekst: "Insteekslot strak ingelaten (oefenstuk tijdens mijn opleiding)" },
    { bestand: "fotos/wc-slot.jpg",                 tekst: "Deurbeslag met vrij/bezet-slot gemonteerd (oefenstuk tijdens mijn opleiding)" },
  ],

  // Voor-en-na-foto's (met schuifbalk). Per klus één regel met twee foto's.
  // Tip: maak de foto's van ongeveer dezelfde plek en hoek, dan werkt het het mooist.
  // Voorbeeld:
  //   { voor: "fotos/keuken-voor.jpg", na: "fotos/keuken-na.jpg", tekst: "Keukenrenovatie in Hoorn" },
  voorNa: [
    { voor: "fotos/plafond-voor.jpg", na: "fotos/plafond-na.jpg", tekst: "Lekkage onderzocht en verholpen, plafond gerepareerd en stucklaar opgeleverd" },
    { voor: "fotos/achterwand-voor.jpg", na: "fotos/achterwand-na.jpg", tekst: "Achterwand was slecht, nieuwe achterwand op maat gemaakt" },
    { voor: "fotos/plafond2-voor.jpg", na: "fotos/plafond2-na.jpg", tekst: "Plafond met lekkageschade behandeld, netjes afgekit en opgeleverd" },
  ],

  // Reviews van echte klanten. Zolang hier niets staat, is het blok
  // "Wat klanten zeggen" niet zichtbaar op de site.
  // Vraag de klant of je de review en zijn/haar voornaam mag plaatsen.
  // sterren: 1 t/m 5 (of weglaten als de klant geen sterren gaf).
  // klus: mag je weglaten.
  //
  // VOORBEELD (staat uit, wordt niet getoond). Kopieer de regel hieronder,
  // haal de // aan het begin weg en vul de echte gegevens van de klant in:
  //   { naam: "Voornaam klant", plaats: "Hoorn", sterren: 4, klus: "Plafond hersteld", tekst: "Wat de klant schreef." },
  reviews: [
    { naam: "Anja", plaats: "Purmerend", sterren: 5, klus: "Keuken geplaatst en afgekit, elektra afgemonteerd", tekst: "Wij zijn ontzettend tevreden over het werk van Nino! Hij heeft ons compleet ontzorgd bij het plaatsen van onze nieuwe keuken. In de planning stond 7 uur, maar Nino had de klus al binnen 3 uur geklaard! De keuken is netjes geplaatst en afgekit en ook de Perilex-aansluiting is vakkundig aangesloten. Alles ziet er keurig uit en we konden ons geen betere service wensen.\n\nWij komen zeker weer bij Nino terug voor een volgende klus. Bedankt voor het mooie werk, Nino! Nu kunnen wij weer heerlijk gaan koken! 😊" },
  ]

};
