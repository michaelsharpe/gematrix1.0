module.exports = {
  appName: 'gematrix',
  port: process.env.PORT || 2368,
  db: {
    test: 'mongodb://localhost:27017/gematrix-test',
    server: process.env.DATABASE || 'mongodb://localhost:27017/gematrix',
    toSeed: process.env.DATABASE || 'mongodb://localhost:27017/gematrix'
  }
};
