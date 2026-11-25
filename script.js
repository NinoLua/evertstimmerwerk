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

  // Op het begin maar een paar foto's tonen, de rest via de knop
  var EERST = 6;
  var figuren = galerij.querySelectorAll('figure');
  if (figuren.length > EERST) {
    for (var i = EERST; i < figuren.length; i++) figuren[i].hidden = true;
    var meer = document.getElementById('meer-fotos');
    meer.textContent = 'Meer foto\'s tonen (' + (figuren.length - EERST) + ')';
    meer.hidden = false;
    meer.addEventListener('click', function () {
      figuren.forEach(function (f) { f.hidden = false; });
      meer.hidden = true;
    });
  }

  // Klik op een foto om hem groot te bekijken
  var dlg = document.getElementById('fotogroot');
  if (dlg && dlg.showModal) {
    var grootImg = dlg.querySelector('img');
    var grootTekst = dlg.querySelector('.fotogroot__tekst');
    galerij.addEventListener('click', function (e) {
      if (e.target.tagName !== 'IMG') return;
      grootImg.src = e.target.src;
      grootImg.alt = e.target.alt;
      grootTekst.textContent = e.target.alt;
      dlg.showModal();
    });
    dlg.addEventListener('click', function () { dlg.close(); });
  }
  document.getElementById('fotos-intro').textContent = 'Een paar klussen die ik heb gedaan.';
}

// ---------- Voor en na (schuifbalk) ----------
function maakLaag(soort, bestand, tekst) {
  var laag = document.createElement('div');
  laag.className = 'vn__laag vn__' + soort;
  if (bestand) {
    laag.appendChild(maakFoto(bestand, tekst));
  } else {
    laag.innerHTML = '<div class="foto-leeg"><span>Foto ' + soort + '<br>(volgt)</span></div>';
  }
  return laag;
}

function maakVoorNa(voor, na, tekst) {
  var fig = document.createElement('figure');
  var vn = document.createElement('div');
  vn.className = 'vn';

  var naLaag = maakLaag('na', na, tekst ? tekst + ' (na)' : 'Na');
  vn.appendChild(naLaag);
  // Vorm van het vak aanpassen aan de foto (staand of liggend)
  var naImg = naLaag.querySelector('img');
  if (naImg) {
    var pasAan = function () {
      if (naImg.naturalWidth) vn.style.aspectRatio = naImg.naturalWidth + ' / ' + naImg.naturalHeight;
    };
    if (naImg.complete) pasAan(); else naImg.addEventListener('load', pasAan);
  }
  vn.appendChild(maakLaag('voor', voor, tekst ? tekst + ' (voor)' : 'Voor'));
  vn.insertAdjacentHTML('beforeend',
    '<div class="vn__lijn"><div class="vn__greep" aria-hidden="true">&#9664;&#9654;</div></div>' +
    '<span class="vn__label vn__label--voor">Voor</span>' +
    '<span class="vn__label vn__label--na">Na</span>');

  // Schuifbalk voor toetsenbord en schermlezers
  var schuif = document.createElement('input');
  schuif.type = 'range'; schuif.min = 0; schuif.max = 100; schuif.value = 50;
  schuif.setAttribute('aria-label', 'Schuif tussen voor en na' + (tekst ? ': ' + tekst : ''));
  vn.appendChild(schuif);

  var labelVoor = vn.querySelector('.vn__label--voor');
  var labelNa = vn.querySelector('.vn__label--na');
  function zet(procent) {
    procent = Math.max(0, Math.min(100, procent));
    vn.style.setProperty('--pos', procent + '%');
    schuif.value = procent;
    // Label verbergen zodra die kant (bijna) helemaal is weggeschoven
    labelVoor.classList.toggle('weg', procent < 15);
    labelNa.classList.toggle('weg', procent > 85);
  }
  schuif.addEventListener('input', function () { zet(Number(schuif.value)); });

  // Slepen met muis of vinger
  var slepen = false;
  function vanPositie(e) {
    var r = vn.getBoundingClientRect();
    zet((e.clientX - r.left) / r.width * 100);
  }
  vn.addEventListener('pointerdown', function (e) {
    slepen = true;
    vn.setPointerCapture(e.pointerId);
    vanPositie(e);
  });
  vn.addEventListener('pointermove', function (e) { if (slepen) vanPositie(e); });
  vn.addEventListener('pointerup', function () { slepen = false; });
  vn.addEventListener('pointercancel', function () { slepen = false; });

  fig.appendChild(vn);
  if (tekst) {
    var cap = document.createElement('figcaption');
    cap.textContent = tekst;
    fig.appendChild(cap);
  }
  return fig;
}

var voorNa = (G.voorNa || []).filter(function (p) { return p && (schoon(p.voor) || schoon(p.na)); });
var vnLijst = document.getElementById('voor-na');
if (voorNa.length) {
  voorNa.forEach(function (p) {
    vnLijst.appendChild(maakVoorNa(schoon(p.voor), schoon(p.na), schoon(p.tekst)));
  });
  document.getElementById('fotos-intro').textContent = 'Een paar klussen die ik heb gedaan.';
  // Nog geen losse foto's? Dan het blok "Meer klussen" met lege vakken verbergen
  if (!fotos.length) {
    document.getElementById('meer-klussen-kop').hidden = true;
    document.getElementById('galerij').hidden = true;
  }
} else {
  // Nog geen foto's: laat een voorbeeld zien met lege vakken
  vnLijst.appendChild(maakVoorNa('', '', ''));
}

// ---------- Reviews ----------
var reviews = (G.reviews || []).filter(function (r) { return r && schoon(r.tekst); });
if (reviews.length) {
  var lijst = document.getElementById('reviewlijst');
  reviews.forEach(function (r) {
    var fig = document.createElement('figure');
    fig.className = 'review';

    var n = Math.round(Number(r.sterren));
    if (n >= 1 && n <= 5) {
      var sterren = document.createElement('div');
      sterren.className = 'review__sterren';
      sterren.setAttribute('role', 'img');
      sterren.setAttribute('aria-label', n + ' van 5 sterren');
      sterren.innerHTML = '&#9733;'.repeat(n) + '<span class="leeg">' + '&#9733;'.repeat(5 - n) + '</span>';
      fig.appendChild(sterren);
    }

    var quote = document.createElement('blockquote');
    quote.textContent = schoon(r.tekst);
    fig.appendChild(quote);

    var wie = document.createElement('figcaption');
    var naam = document.createElement('strong');
    naam.textContent = schoon(r.naam) || 'Klant';
    wie.appendChild(naam);
    var extra = [schoon(r.plaats), schoon(r.klus)].filter(Boolean).join(' · ');
    if (extra) wie.appendChild(document.createTextNode(', ' + extra));
    fig.appendChild(wie);

    lijst.appendChild(fig);
  });
  document.getElementById('reviews').hidden = false;
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
    fout.textContent = 'Vul in ieder geval uw naam en een omschrijving van de klus in.';
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
