const mongoose = require('mongoose');
const fs = require('fs');

const config = require('../config');
const Comment = require('../models/comment');
const Entry = require('../models/entry');
const Numeral = require('../models/numeral');

// MONGOOSE
mongoose.Promise = Promise;
mongoose.connect(config.db.toSeed);

// Load the seed file

function createComment(comment) {
  const newComment = new Comment();

  ['type', 'typeId', 'content', 'see'].map(prop => {
    if (comment.hasOwnProperty(prop)) {
      newComment[prop] = comment[prop];
    }
  });

  return newComment.save();
}

function createEntry(entry) {
  return new Promise((resolve, reject) => {
    const newEntry = new Entry();
    const entryComments = [];

    if (entry.comments.length !== 0) {
      entry.comments.forEach(comment => {
        comment.typeId = newEntry.id;
        entryComments.push(createComment(comment));
      });
    }

    ['language', 'word', 'language', 'pronciation', 'defintion', 'see', 'numeralId'].map(prop => {
      if (entry.hasOwnProperty(prop)) {
        newEntry[prop] = entry[prop];
      }
    });

    if (entry.language === '') {
      newEntry.language = 'hebrew';
    }

    Promise
      .all(entryComments)
      .then(savedComments => {
        newEntry.comments = savedComments;

        return newEntry.save();
      })
      .then(savedEntry => {
        resolve(savedEntry);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function createNumeral({ numeral, updates }) {
  return new Promise((resolve, reject) => {
    const commentPromises = [];
    const entryPromises = [];

    if (updates.comments.length !== 0) {
      updates.comments.forEach(comment => {
        comment.typeId = numeral.id;
        commentPromises.push(createComment(comment));
      });
    }
    //
    if (updates.entries.length !== 0) {
      updates.entries.forEach(entry => {
        entry.numeralId = numeral.id;

        const numEntry = createEntry(entry);
        entryPromises.push(numEntry);
      });
    }


    ['value', 'math'].map(prop => {
      if (updates.hasOwnProperty(prop)) {
        numeral[prop] = updates[prop];
      }
    });

    Promise
      .all(commentPromises)
      .then(comments => {
        numeral.comments = comments;
      })
      .then(() => Promise.all(entryPromises))
      .then(entries => {
        numeral.entries = entries;
      })
      .then(() => numeral.save())
      .then(savedNumeral => {
        resolve(savedNumeral);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function seed() {
  // Main reading
  fs.readFile('./numerals.json', 'utf8', (err, data) => {
    if (err) console.log('ERROR: ', err);

    const jsonData = JSON.parse(data);
    const numeralPromises = [];

    jsonData.forEach(rawNumeral => {
      const numProm = createNumeral({
        numeral: new Numeral(),
        updates: rawNumeral
      });

      numeralPromises.push(numProm);
    });

    Promise.all(numeralPromises)
      .then(numerals => {
        console.log('*************************');
        console.log(`${numerals.length} created.`);
        console.log('*************************');
        setTimeout(() => {
          console.log('Seed completed.');
          process.exit(0);
        }, 3000);
      })
      .catch(numErr => {
        console.log(numErr);
        process.exit(1);
      });
  });
}

seed();
