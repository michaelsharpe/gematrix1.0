/* eslint no-unused-vars: 0 */
/* eslint prefer-const: 0 */

const s = require('underscore.string');

// Regexs
// \([a-zA-Z1-9*]*\)\s*[0-9*\s+-Σ=]\n
// // const seeRegex = new RegExp("((?:see)\s(?:[0-9]*\,*\s*(?:\(*Latin\)*)*)*)", "g");
const checkForHebrewRegex = '[ABGDHVZChTIKLMNSOPTzQRShTh\\s]*\\s[^.]*';
const checkGreekRegex = '^[A-Za-z\s]{1,}\(Gr\)\.';
const checkLatinRegex = '^[A-Za-z\s]{1,}\(Lt\)\.';

function createNumeral() {
  return {
    value: 0,
    math: [],
    comments: [],
    entries: [],
    see: []
  };
}

function createComment() {
  return {
    type: '',
    content: '',
    see: []
  };
}

function createEntry() {
  return {
    numeral: '',
    word: '',
    language: '',
    pronunciation: '',
    comments: [],
    see: []
  };
}

function decomposeNumeral(line) {
  const numeral = createNumeral();
  const cleaned = s(line).clean().value();
  const splitNumeralRegex = new RegExp(/(^[0-9]*)\s?(\(.*\))?\s?(.*)?/);
  const rawArray = cleaned.match(splitNumeralRegex);
  // drop the 0 index.  It is just the full string.
  rawArray.shift();

  numeral.value = +(rawArray.shift());

  for (let i = 0; i <= rawArray.length; i++) {
    if (rawArray[i]) {
      numeral.math.push(rawArray[i]);
    } else {
      break;
    }
  }

  return numeral;
}

function matchNumeral(str) {
  const checkForNumberRegex = new RegExp(/^[1234567890]{1,}[^\(\)]\s{0,5}\([prime0-9*-+\/]*\)/, 'g');

  return str.match(checkForNumberRegex);
}

function parseNumeral(line, cb) {
  const match = matchNumeral(line);

  if (match && match[0] !== '') {
    // console.log(decomposeNumeral(line).value);
    return cb(decomposeNumeral(line));
  }

  return cb(false);
}

function parseWordEntry(sentence, cb) {
  const result = {};
  // Clean the sentences. Remove '+'.
  const strippedSentence = sentence.split('').filter(l => l !== '+').join('');
  const cleanedSentence = s(strippedSentence).clean().value();
  // First we get an array of all the words
  const arr = cleanedSentence.split(' ');
  const singleHebrewRegex = new RegExp(/^(Ch|Sh|Th|Tz|\[Heh\]|Aleph|[ABGDHVZCTIKLMNSOPQR])$/);
  const hebrewWordRegex = new RegExp(/^(Ch|Sh|Th|Tz|[ABGDHVZCTIKLMNSOPQR-])*$/);

  // SINGLE HEBREW LETTER
  // check the first word to see if it is a match of a single hebrew letter
  const letterMatch = arr[0].match(singleHebrewRegex);

  if (letterMatch && letterMatch[0] !== '') {
    if (arr.length === 2) {
      result.word = arr[0];
      result.pronunciation = arr[1];
      result.langauge = 'hebrew';
      result.comment = '';

      return result;
    }
  }

  // HEBREW WORD
  const hebrewWordMatch = arr[0].match(hebrewWordRegex);
  const hebrewWords = [];
  const otherWords = [];

  if (hebrewWordMatch && hebrewWordMatch[0] !== '' && arr[0].length !== 1) {
    result.language = 'hebrew';

    arr.forEach(word => {
      const matchWord = word.match(hebrewWordRegex);

      if (matchWord && matchWord[0] !== '' && otherWords.length === 0) {
        hebrewWords.push(word);
      } else {
        otherWords.push(word);
      }
    });

    result.word = hebrewWords.join(' ');

    if (otherWords.length > hebrewWords.length + 2) {
      result.comment = otherWords.join(' ');
    } else {
      result.pronunciation = otherWords.join(' ');
    }

    return result;
  }

  // GREEK
  const greekWordRegex = new RegExp(/([µζχξωβνμασδφγηςκλθωερτψυιοπάέήίϊΐόύϋΰώ*?])*/);
  const greekLetterRegex = new RegExp(/([µζχξωβνμασδφγηςκλθωερτψυιοπάέήίϊΐόύϋΰώ])/);
  const greekEnglishRegex = new RegExp(/([a-zA-Z\s]*\s*\(Gr\){1})/);

  const greekWordMatch = arr[0].match(greekWordRegex);
  if (greekWordMatch && greekWordMatch[0] !== '') {
    result.language = 'greek';
    // First we need to strip out this broken greek
    const greekStripped = sentence.split('').filter(l => {
      const englishMatch = l.match(new RegExp(/[a-zA-Z\s\(\)]/));
      // console.log(englishMatch);
      if (englishMatch) {
        return l;
      }
    }).join('');

    const cleanGreekSentence = s(greekStripped).clean().value();

    if (cleanGreekSentence !== '') {
      result.word = cleanGreekSentence;
      return result;
    }
  } else {
    // This ensures that we filter out words that already have greek letters
    // English greek entry

    const greekEnglishMatch = arr.join('').match(greekEnglishRegex);

    if (greekEnglishMatch && greekEnglishMatch[0] !== '') {
      result.word = cleanedSentence;
      result.language = 'greek';
      return result;
    }
  }

  // Latin
  const latinRegex = new RegExp(/([a-zA-Z\s,]*\s*\(Lt.?\){1})(\s[A-Za-z]*)?/);

  const latinMatch = arr.join(' ').match(latinRegex);
  if (latinMatch && latinMatch[0] !== '') {
    result.language = 'latin';

    if (latinMatch[1]) {
      result.word = latinMatch[1];
    }

    if (latinMatch[2]) {
      result.translation = latinMatch[2];
    }

    return result;
  }
}

function parseParagraph(paragraph, cb) {
  // First we convert the string into a clean array of sentences.
  const arr = s(paragraph).clean().split('.');
  // Next we check to see if the first index is a word entry
  const entry = parseWordEntry(arr[0]);

  if (entry) {
    const {word, pronunciation, language, translation} = entry;
    console.log(entry);
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = Object.freeze({
  parseNumeral,
  parseParagraph,
  isEmpty
});
