const fs = require('fs');
const readline = require('readline');

// Parola segreta da indovinare
let secretWord = '';

// Array delle parole possibili
let words = [];

// Lettura delle parole dal file di testo
function readWordsFromFile(filename) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      words.push(line.trim().toLowerCase());
    });

    rl.on('close', () => {
      resolve();
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}

// Genera una parola segreta casuale
function generateSecretWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  secretWord = words[randomIndex];
}

// Funzione per controllare la validità della parola inserita
function isValidWord(word) {
  // Verifica se la parola ha cinque lettere
  if (word.length !== 5) {
    console.log("La parola deve avere cinque lettere.");
    return false;
  }

  // Verifica se la parola contiene solo lettere
  if (!/^[a-zA-Z]+$/.test(word)) {
    console.log("La parola può contenere solo lettere.");
    return false;
  }

  return true;
}

// Funzione per confrontare la parola inserita con la parola segreta
function compareWords(guess) {
  let matchedLetters = 0;
  let matchedPositions = 0;

  for (let i = 0; i < secretWord.length; i++) {
    const secretLetter = secretWord[i];
    const guessLetter = guess[i];

    if (guessLetter === secretLetter) {
      matchedPositions++;
    } else if (secretWord.includes(guessLetter)) {
      matchedLetters++;
    }
  }

  return [matchedLetters, matchedPositions];
}

// Funzione principale del gioco
async function playWordle() {
  try {
    await readWordsFromFile('parole.txt');
    generateSecretWord();

    let attempts = 0;

    while (attempts < 10) {
      const guess = prompt("Indovina una parola a cinque lettere:");

      if (!isValidWord(guess)) {
        continue;
      }

      attempts++;

      const [matchedLetters, matchedPositions] = compareWords(guess);

      console.log(`Tentativo ${attempts}`);
      console.log(`Parole corrispondenti: ${matchedLetters}`);
      console.log(`Posizioni corrispondenti: ${matchedPositions}`);

      if (matchedPositions === 5) {
        console.log("Hai indovinato la parola! Congratulazioni!");
        return;
      }
    }

    console.log("Hai esaurito i tentativi. La parola segreta era:", secretWord);
  } catch (err) {
    console.error("Si è verificato un errore durante la lettura del file:", err);
  }
}

// Avvia il gioco
playWordle();