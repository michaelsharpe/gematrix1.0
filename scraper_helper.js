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
  // First we get an array of all the words
  const arr = sentence.split(' ');
  const singleHebrewRegex = new RegExp(/^(Ch|Sh|Th|Tz|\[Heh\]|Aleph|[ABGDHVZCTIKLMNSOPQR])$/);

  arr.forEach((word, index, wordArray) => {
    // check the first word to see if it is a match of a single hebrew letter
    if (index === 0) {
      // Filter out single letters without pronunciation, and longer entries.    
        const letterMatch = word.match(singleHebrewRegex);
        if (letterMatch && letterMatch[0] !== '') {
          if (wordArray.length > 1 && wordArray.length < 3) {
            result.word = wordArray[0];
            result.pronunciation = wordArray[1];
          }
        }

      // Next, we should
    }
  });
}

function parseParagraph(paragraph, cb) {
  // First we convert the string into a clean array of sentences.
  const arr = s(paragraph).clean().split('.');
  // Next we check to see if the first index is a word entry
  parseWordEntry(arr[0]);
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = Object.freeze({
  parseNumeral,
  parseParagraph,
  isEmpty
});
