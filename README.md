# Gematrix
-------------------------------
Gematria database and service for keeping track of numerical exegesis.

## Seeding

There is a database seed in `./seeds` that will populate a given database with scraped data from Paul Foster Case's Gematria Notebooks.  Currently there is only the first 900 numbers, and none of the supplementary notes on the paths, or alchemy.

To populate a given database, first go into `./config.js` and set the variable 'db.toSeed' to the database you would like to see.  Then run `npm run pfcSeed` and the script will populate you database.

## API Design

#### Collections

GET /collections  - return public collections
GET /collections/:collection_id  - return a public collection

GET /collections/:collection_id/numerals - return the numerals in a collection
POST /collections/:collection_id/numerals - create a new numeral in a collection

GET /collections/:collection_id/numerals/:value - return a numeral from a collection with a given value
PUT /collections/:collection_id/numerals/:value - return a numeral from a collection with a given value

#### Numerals

GET /numerals/:numeral_id - retrieve a numeral based on id
PUT /numerals/:numeral_id - update a numeral based on id
DELETE /numerals/:numeral_id - delete a numeral based on id



#### Users

GET /user/:id - get a users public profile

GET /user/:id/profile - get a users onw profile
PUT /user/:id/profile - update a users own profile

GET /user/:id/collections - return a users own collections
POST /user/:id/collections - create a new collection

GET /user/:id/collections/:collection_id  - update a users collection
PUT /user/:id/collections/:collection_id  - update a users collection
DELETE /user/:id/collections/:collection_id  - delete a users collection
