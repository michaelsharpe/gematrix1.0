const Numeral = require('../models/numeral');
const striptags = require('striptags');
const {
  createError,
  BAD_REQUEST
} = require('../helpers/error_helper');

function updateNumeral({ numeral, updates }) {
  // Sanitize updates for permitted props
  ['value'].map(prop => {
    if (updates.hasOwnProperty(prop)) {
      numeral[prop] = updates[prop];
    }
  });

  return numeral;
}

function getNumerals(req, res, next) {
  Numeral
    .find(req.query)
    .then(numerals => {
      if (numerals.length === 0) {
        return next(createError({
          status: BAD_REQUEST,
          message: 'No numerals found.'
        }));
      }

      let key = '';
      let data = {};

      if (numerals.length === 1) {
        key = 'numeral';
        data = {
          id: numerals[0].id,
          value: numerals[0].value,
          comments: numerals[0].comments,
          entries: numerals[0].entries,
          createdAt: numerals[0].createdAt,
          updatedAt: numerals[0].updatedAt
        };
      } else {
        key = 'numerals';
        data = numerals.map(num => {
          return {
            id: num.id,
            value: num.value,
            createdAt: num.createdAt,
            updatedAt: num.updatedAt
          };
        });
      }

      res.json({
        success: true,
        [key]: data
      });
    })
    .catch(next);
}

function postNumeral(req, res, next) {
  updateNumeral({
    numeral: new Numeral(),
    updates: req.body
  })
  .save()
  .then(numeral => {
    res.json({
      success: true,
      message: 'Numeral created.',
      numeral: numeral
    });
  })
  .catch(next);
}

function getNumeral(req, res, next) {
  Numeral
    .findById(req.params.numeral_id)
    .then(numeral => {
      if (!numeral) {
        return next(createError({
          status: BAD_REQUEST,
          message: `Unable to find numeral with id ${req.params.numeral_id}`
        }));
      }

      res.json({
        success: true,
        message: 'Numeral found',
        numeral: numeral
      });
    })
    .catch(next);
}

function putNumeral(req, res, next) {
  Numeral.findById(req.params.numeral_id)
    .then(numeral => {
      if (!numeral) {
        return next(createError({
          status: BAD_REQUEST,
          message: `No numeral found with id ${req.params.numeral_id}`
        }));
      }

      updateNumeral({
        numeral,
        updates: req.body
      })
        .save()
        .then(updatedNumeral => {
          res.json({
            success: true,
            message: 'Numeral updated',
            numeral: updatedNumeral
          });
        })
        .catch(next);
    })
    .catch(next);
}

function deleteNumeral(req, res, next) {
  Numeral
    .findById(req.params.numeral_id)
    .then(numeral => {
      if (!numeral) {
        return next(createError({
          status: BAD_REQUEST,
          message: `No numeral found with id ${req.params.numeral_id}`
        }));
      }

      numeral.remove()
        .then(() => {
          res.json({
            success: true,
            message: 'Numeral deleted'
          });
        })
        .catch(next);
    })
    .catch(next);
}

function getNumeralComments(req, res, next) {
  Numeral
    .findById(req.params.numeral_id)
    .then(numeral => {
      if (!numeral) {
        return next(createError({
          status: BAD_REQUEST,
          message: `No numeral found with id ${req.params.numeral_id}`
        }));
      }

      res.json({
        success: true,
        comments: numeral.comments
      });
    })
    .catch(next);
}

function postNumeralComment(req, res, next) {
  if (!res.body.content) {
    return next(createError({
      status: BAD_REQUEST,
      message: 'No content provided.'
    }));
  }

  Numeral
    .findById(req.params.numeral_id)
    .then(numeral => {
      Comment.create({
        type: 'numeral',
        typeId: numeral.id,
        content: res.body.content
      })
      .then(comment => {
        numeral.comments = [...numeral.comments, comment];

        numeral.save()
          .then(savedNumeral => {
            res.json({
              success: true,
              message: `Comment successfully created on numeral ${savedNumeral.id}`,
              comment: comment
            });  
          })
          .catch(next);
      })
      .catch(next);
    })
    .catch(next);
}

function getNumeralEntries(req, res, next) {
  next();
}

function postNumeralEntry(req, res, next) {
  next();
}

module.exports = Object.freeze({
  getNumerals,
  postNumeral,
  getNumeral,
  putNumeral,
  deleteNumeral,
  getNumeralComments,
  postNumeralComment,
  getNumeralEntries,
  postNumeralEntry
});