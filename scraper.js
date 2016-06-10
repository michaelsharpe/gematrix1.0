/* eslint no-unused-vars: 0 */
/* eslint prefer-const: 0 */

const cheerio = require('cheerio');
const fs = require('fs');
const s = require("underscore.string");

const rawHtml = fs.readFileSync('./pfc_notebooks.html', 'utf8');
const $ = cheerio.load(rawHtml);

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
  const checkForNumberRegex = new RegExp(/^[1234567890]*[^\(\)]\s{0,5}\([prime0-9*-+\/]*\)/, 'g');

  return str.match(checkForNumberRegex);
}

function findNumeral(page, cb) {
  let rawNumeral = '';
  $(page).children().each((divIndex, div) => {
    const line = $(div).text();

    if (divIndex === 0) {
      const firstLineNumeral = matchNumeral(line);

      if (firstLineNumeral && firstLineNumeral[0] !== '') {
        cb(divIndex, decomposeNumeral(line));
      }
    } else if (divIndex < 7) {
      const matchLineNumeral = matchNumeral(line);

      if (matchLineNumeral && matchLineNumeral[0] !== '') {
        cb(divIndex, decomposeNumeral(line));
      }
    }
  });
}

let numerals = [];
let currentNumber = {};
let currentComment = {};
let currentEntry = {};

// Regexs
// \([a-zA-Z1-9*]*\)\s*[0-9*\s+-Σ=]\n
const checkForHebrewRegex = '[ABGDHVZChTIKLMNSOPTzQRShTh\\s]*\\s[^.]*';
const checkGreekRegex = '^[A-Za-z\s]{1,}\(Gr\)\.';
const checkLatinRegex = '^[A-Za-z\s]{1,}\(Lt\)\.';

// const seeRegex = new RegExp("((?:see)\s(?:[0-9]*\,*\s*(?:\(*Latin\)*)*)*)", "g");
// need 2-1860(master Gematria)
// 1788 - 1812 - multiple numbers on a page, but uses () with all numbers
// 1812 - 1860 - new format.  No ().  Multiple numbers to a page.  Brief entries.

// Filter through pages
$('.pc').each((pageIndex, page) => {
  // 2-1787 - follows format of 1 number per page
  if (pageIndex > 0 && pageIndex < 1787) {
    findNumeral(page, (divIndex, numeral) => {
      console.log(numeral);
    });
  }
});
