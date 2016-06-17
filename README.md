# Gematrix
-------------------------------
Gematria database and service for keeping track of numerical exegesis.

## Seeding
There is a database seed in `./seeds` that will populate a given database with scraped data from Paul Foster Case's Gematria Notebooks.  Currently there is only the first 900 numbers, and none of the supplementary notes on the paths, or alchemy.

To populate a given database, first go into `./config.js` and set the variable 'db.toSeed' to the database you would like to see.  Then run `npm run pfcSeed` and the script will populate you database.
