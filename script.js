// Hulpscripts voor de website. Hier hoef je normaal niets aan te veranderen.
// Je eigen gegevens zet je in gegevens.js.

var G = window.GEGEVENS || {};
function schoon(t) { return (t || '').toString().trim(); }

// ---------- Gegevens uit gegevens.js op de pagina zetten ----------
var telefoon = schoon(G.telefoon);
var whatsapp = schoon(G.whatsapp);
var email = schoon(G.email);

// Alleen cijfers (en een + vooraan) voor de bel-link
var telCijfers = telefoon.replace(/[^\d+]/g, '');
// WhatsApp wil een internationaal nummer zonder + en zonder 0: 0612345678 -> 31612345678
var waCijfers = whatsapp.replace(/\D/g, '');
if (waCijfers.indexOf('00') === 0) waCijfers = waCijfers.slice(2);
else if (waCijfers.indexOf('0') === 0) waCijfers = '31' + waCijfers.slice(1);

var waarden = { telefoon: telefoon, whatsapp: whatsapp, email: email, kvk: schoon(G.kvk), btw: schoon(G.btw) };
var links = {
  telefoon: telCijfers ? 'tel:' + telCijfers : '',
  whatsapp: waCijfers ? 'https://wa.me/' + waCijfers : '',
  email: email ? 'mailto:' + email : ''
};

document.querySelectorAll('[data-toon]').forEach(function (el) {
  el.hidden = !waarden[el.getAttribute('data-toon')];
});
document.querySelectorAll('[data-veld]').forEach(function (el) {
  el.textContent = waarden[el.getAttribute('data-veld')] || '';
});
document.querySelectorAll('[data-link]').forEach(function (el) {
  var l = links[el.getAttribute('data-link')];
  if (l) el.setAttribute('href', l);
});
if (!telefoon && !whatsapp && !email) {
  document.getElementById('nog-geen-contact').hidden = false;
}

// ---------- Foto's ----------
function maakFoto(bestand, tekst) {
  var img = document.createElement('img');
  img.src = bestand;
  img.alt = tekst || '';
  img.loading = 'lazy';
  return img;
}

if (schoon(G.profielfoto)) {
  var vak = document.getElementById('profielfoto');
  vak.innerHTML = '';
  vak.appendChild(maakFoto(schoon(G.profielfoto), 'Nino van Everts Timmerwerk'));
}

var fotos = (G.fotos || []).filter(function (f) { return f && schoon(f.bestand); });
if (fotos.length) {
  var galerij = document.getElementById('galerij');
  galerij.innerHTML = '';
  fotos.forEach(function (f) {
    var fig = document.createElement('figure');
    fig.appendChild(maakFoto(schoon(f.bestand), schoon(f.tekst)));
    if (schoon(f.tekst)) {
      var cap = document.createElement('figcaption');
      cap.textContent = schoon(f.tekst);
      fig.appendChild(cap);
    }
    galerij.appendChild(fig);
  });
  document.getElementById('fotos-intro').textContent = 'Een paar klussen die ik heb gedaan.';
}

// ---------- Menu openen/sluiten op mobiel ----------
var knop = document.querySelector('.menu-knop');
var menu = document.getElementById('menu');
function sluitMenu() {
  menu.classList.remove('open');
  knop.setAttribute('aria-expanded', 'false');
  knop.textContent = 'Menu';
}
knop.addEventListener('click', function () {
  var open = menu.classList.toggle('open');
  knop.setAttribute('aria-expanded', open ? 'true' : 'false');
  knop.textContent = open ? 'Sluiten' : 'Menu';
});
menu.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') sluitMenu();
});

// ---------- Jaartal onderaan ----------
document.getElementById('jaar').textContent = new Date().getFullYear();

// ---------- Offerteformulier ----------
// Opent het mailprogramma van de bezoeker met een ingevuld bericht.
var formulier = document.getElementById('offerteformulier');
formulier.addEventListener('submit', function (e) {
  e.preventDefault();
  var fout = document.getElementById('foutmelding');
  var naam = formulier.naam.value.trim();
  var omschrijving = formulier.omschrijving.value.trim();

  if (!naam || !omschrijving) {
    fout.textContent = 'Vul in ieder geval je naam en een omschrijving van de klus in.';
    fout.hidden = false;
    return;
  }
  fout.hidden = true;

  var onderwerp = 'Offerte-aanvraag: ' + formulier.soort.value;
  var tekst =
    'Naam: ' + naam + '\n' +
    'Telefoon: ' + formulier.telefoon.value.trim() + '\n' +
    'Woonplaats: ' + formulier.plaats.value.trim() + '\n' +
    'Soort klus: ' + formulier.soort.value + '\n\n' +
    'Omschrijving:\n' + omschrijving + '\n';

  window.location.href = 'mailto:' + email +
    '?subject=' + encodeURIComponent(onderwerp) +
    '&body=' + encodeURIComponent(tekst);
});
