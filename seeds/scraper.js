/* eslint no-unused-vars: 0 */
/* eslint prefer-const: 0 */

const cheerio = require('cheerio');
const fs = require('fs');
const s = require('underscore.string');

const rawHtml = fs.readFileSync('./pfc_notebooks.html', 'utf8');
const $ = cheerio.load(rawHtml);

const {
  parseNumeral,
  parseParagraph,
  cleanLine,
  isEmpty
} = require('./scraper_helper');

let state = {
  numerals: [],
  currentNumeral: {},
  currentComment: {},
  currentEntry: {},
  paragraphArray: [],
  currentParagraph: ''
};

// need 2-1860(master Gematria)
// 1788 - 1812 - multiple numbers on a page, but uses () with all numbers
// 1812 - 1860 - new format.  No ().  Multiple numbers to a page.  Brief entries.

// TODO:10 Fix the greek word regex so that it doesnt pick up *** (or strip all *s)
// DOING:0 remove Single line occurences of Greek and Latin
// TODO:0 Fix the bug that makes last entry the first entry of next numeral.
// TODO:20 Activate mongoose
// TODO:30 Take output from parsing and record into monggDB
// DONE:0 Fix bug that leaves out an entry before the next numeral

// Filter through pages
$('.pc').each((pageIndex, page) => {
  // 2-1787 - follows format of 1 number per page
  if (pageIndex > 0 && pageIndex < 1787) {
    $(page).children().each((lineIndex, lineDiv) => {
      // Clean line of spaces, and remove unwanted things.
      const line = $(lineDiv).text();

      const numeralState = parseNumeral(line, numeral => {
        // If there is no current numeral, we are starting the parsing
        if (isEmpty(state.currentNumeral) && numeral) {
          state.currentNumeral = numeral;
        }

        // If there is a current numeral, and no numeral is found, we are still parsing
        // the last one
        if (!isEmpty(state.currentNumeral) && !numeral) {
          // Check to see if the current line is empty
          if ($(lineDiv).hasClass('ls1') && (s(line).clean().value() === '')) {
            // If the line is empty, check to see if there is a current paragraph
            if (state.currentParagraph !== '') {
              parseParagraph(state, updatedState => {
                state = updatedState;
              });
              state.currentParagraph = '';
            }
          } else {
            // Otherwise, add the line to the current paragraph
            state.currentParagraph += line;
          }
        }

        // If there is a currentNumeral and we hit another one, we need to set the
        // state for a new numeral
        if (!isEmpty(state.currentNumeral) && numeral) {
          // Reset the current properties

          if (state.currentParagraph !== '') {
            if (state.currentParagraph !== '') {
              parseParagraph(state, updatedState => {
                state = updatedState;
              });
              state.currentParagraph = '';
            }
          }


          if (!isEmpty(state.currentEntry)) {
            // push the updated entry into the current numeral
            state.currentNumeral.entries.push(state.currentEntry);
            // reset entry
            state.currentEntry = {};
          }

          // Make sure the current paragraph is empty (it should be by now)
          state.currentParagraph = '';
          // Push the last numeral into the numerals array
          state.numerals = [...state.numerals, numeral];
          // Set the current numeral to the new numeral
          state.currentNumeral = numeral;
        }
      });
    });
  }
});

const filteredNumerals = state.numerals.filter((num, i) => i > 96);

// Write state numerals to a file
fs.writeFile('./numerals.json', JSON.stringify(filteredNumerals), err => {
  if (err) throw err;

  console.log('results saved to file.');
});

console.log(state.numerals);
