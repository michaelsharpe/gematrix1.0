/* eslint no-unused-vars: 0 */
/* eslint prefer-const: 0 */
/* eslint no-else-return: 0 */

const s = require('underscore.string');

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

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
    definition: '',
    language: '',
    pronunciation: '',
    comments: []
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
    return cb(decomposeNumeral(line));
  }

  return cb(false);
}

function parseWordEntry(sentence, cb) {
  const entry = createEntry();
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
      entry.word = arr[0];
      entry.pronunciation = arr[1];
      entry.langauge = 'hebrew';
      entry.comment = '';

      return entry;
    }
  }

  // HEBREW WORD
  const hebrewWordMatch = arr[0].match(hebrewWordRegex);
  const hebrewWords = [];
  const otherWords = [];

  if (hebrewWordMatch && hebrewWordMatch[0] !== '' && arr[0].length !== 1) {
    entry.language = 'hebrew';

    arr.forEach(word => {
      const matchWord = word.match(hebrewWordRegex);

      if (matchWord && matchWord[0] !== '' && otherWords.length === 0) {
        hebrewWords.push(word);
      } else {
        otherWords.push(word);
      }
    });

    entry.word = hebrewWords.join(' ');

    if (otherWords.length > hebrewWords.length + 2) {
      entry.comment = otherWords.join(' ');
    } else {
      entry.pronunciation = otherWords.join(' ');
    }

    return entry;
  }

  // GREEK
  const greekWordRegex = new RegExp(/([µζχξωβνμασδφγηςκλθωερτψυιοπάέήίϊΐόύϋΰώ*?])*/);
  const greekLetterRegex = new RegExp(/([µζχξωβνμασδφγηςκλθωερτψυιοπάέήίϊΐόύϋΰώ])/);
  const greekEnglishRegex = new RegExp(/([a-zA-Z\s]*\s*\(Gr\){1})/);

  const greekWordMatch = arr[0].match(greekWordRegex);
  if (greekWordMatch && greekWordMatch[0] !== '') {
    entry.language = 'greek';
    // First we need to strip out this broken greek
    const greekStripped = sentence.split('').filter(l => {
      const englishMatch = l.match(new RegExp(/[a-zA-Z\s\(\)]/));
      if (englishMatch) {
        return l;
      }
    }).join('');

    const cleanGreekSentence = s(greekStripped).clean().value();

    if (cleanGreekSentence !== '') {
      entry.word = cleanGreekSentence;
      return entry;
    }
  } else {
    // This ensures that we filter out words that already have greek letters
    // English greek entry

    const greekEnglishMatch = arr.join('').match(greekEnglishRegex);

    if (greekEnglishMatch && greekEnglishMatch[0] !== '') {
      entry.word = cleanedSentence;
      entry.language = 'greek';
      return entry;
    }
  }

  // Latin
  const latinRegex = new RegExp(/([a-zA-Z\s,]*\s*\(Lt.?\){1})(\s[A-Za-z]*)?/);

  const latinMatch = arr.join(' ').match(latinRegex);
  if (latinMatch && latinMatch[0] !== '') {
    entry.language = 'latin';

    if (latinMatch[1]) {
      entry.word = latinMatch[1];
    }

    if (latinMatch[2]) {
      entry.translation = latinMatch[2];
    }

    return entry;
  }

  // if it gets this far, there was nothing
  return false;
}

function parseReferences(sentence, cb) {
  const referenceRegex = new RegExp(/\bsee\s([0-9\s,]*(?:[GgreekLlatin]*)[0-9,\s]*)/);
  const referenceMatch = sentence.match(referenceRegex);
  const references = [];

  if (referenceMatch && referenceMatch[0] !== '') {
    const cleanCommas = referenceMatch[0].split('').filter(l => l !== ',').join('');

    cleanCommas.split(' ').forEach(chunk => {
      if (parseInt(chunk, 10)) {
        references.push(chunk);
      }
    });

    return cb(sentence, references);
  }

  return cb(sentence, false);
}

function parseParagraph(state, cb) {
  const paragraph = state.currentParagraph;
  // First we convert the string into a clean array of sentences.
  const arr = s(paragraph).clean().split('.');
  // Next we check to see if the first index is a word entry
  const entry = parseWordEntry(arr[0]);
  // If the entry isn't empty, it means that the paragraph is one.
  if (!isEmpty(entry)) {
    // If we hit a new entry, we need to check for a previous one
    if (!isEmpty(state.currentEntry)) {
      // If it exists, push the previous entry into the numerals entries
      state.currentNumeral.entries.push(state.currentEntry);
    }

    // Now we remove the first sentence
    arr.shift();

    // We assume that the next sentence is the definition
    if (entry.defintion) {
      entry.definition += arr.shift();
    } else {
      entry.definition = arr.shift();
    }

    const entryComment = createComment();
    entryComment.type = 'entry';
    const referencedParagraph = [];

    arr.forEach(sentence => {
      parseReferences(sentence, (sent, refs) => {
        if (refs) {
          entryComment.see = [...entryComment.see, ...refs];
        } else {
          referencedParagraph.push(sent);
        }
      });
    });

    entryComment.content = referencedParagraph.join(' ');

    if (entryComment.content !== '') {
      entry.comments = [...entry.comments, entryComment];
    }
    entry.numeral = state.currentNumeral.value;

    // We now set the entry to the current entry on the state
    state.currentEntry = entry;

    cb(state);
  } else {
    // if there is still an entry here, we havent finished parsing
    // the last one
    if (!isEmpty(state.currentEntry)) {
      const currentEntryComment = createComment();
      currentEntryComment.type = 'entry';
      const currentReferencedParagraph = [];

      arr.forEach(sentence => {
        parseReferences(sentence, (sent, refs) => {
          if (refs) {
            currentEntryComment.see = [...currentEntryComment.see, ...refs];
          } else {
            currentReferencedParagraph.push(sent);
          }
        });
      });

      currentEntryComment.content = currentReferencedParagraph.join(' ');

      if (currentEntryComment.content !== '') {
        state.currentEntry.comments = [...state.currentEntry.comments, currentEntryComment];
      }

      cb(state);
    } else {
      // If we get here, we are still on a paragraph from the numeral
      const numeralComment = createComment();
      numeralComment.type = 'numeral';
      const numeralReferencedParagraph = [];

      arr.forEach(sentence => {
        parseReferences(sentence, (sent, refs) => {
          if (refs) {
            numeralComment.see = [...numeralComment.see, ...refs];
          } else {
            numeralReferencedParagraph.push(sent);
          }
        });
      });

      numeralComment.content = numeralReferencedParagraph.join(' ');

      if (numeralComment.content !== '') {
        state.currentNumeral.comments = [...state.currentNumeral.comments, numeralComment];
      }
    }

    cb(state);
  }
}

module.exports = Object.freeze({
  parseNumeral,
  parseParagraph,
  isEmpty
});
