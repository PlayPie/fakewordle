import { WORDS } from "./words.js";

for (let i = 1; i <= 5; i++) {
      x = "casella" + i;
      document.getElementById(x).value;
      l = WORDS;
}
function parolaRandom() {

      l = Math.floor(Math.random() * WORDS.length);
}


for (let i = 1; i <= 5; i++) {
var caselle = document.getElementsById('casella' + [i]);
var inputPrecedente = document.getElementById('input-precedente');

// Aggiungi un gestore di eventi all'evento "input" del campo di input
inputPrecedente.addEventListener('input', function() {
  // Determina l'indice della casella corrente
  var indiceCorrente = -1;
  for (var i = 0; i < caselle.length; i++) {
    if (caselle[i].textContent === inputPrecedente.value) {
      indiceCorrente = i;
      break;
    }
  }

  // Se l'indice è valido e non è l'ultima casella
  if (indiceCorrente > -1 && indiceCorrente < caselle.length - 1) {
    // Seleziona la casella successiva
    var casellaSuccessiva = caselle[indiceCorrente + 1];

    // Sposta il focus alla casella successiva
    casellaSuccessiva.focus();

    // Esegui lo scroll della pagina alla casella successiva (se necessario)
    casellaSuccessiva.scrollIntoView();
  }
});

}




















































