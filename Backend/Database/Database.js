const sqlite3 = require("sqlite3").verbose();
const wishlistCreateTable = require("../Controllers/Wishlist/Wishlist.CreateTable");
const collectionsCreateTableCollections = require("../Controllers/Collections/Collections.CreateTableCollections");
const readingCreateTable = require("../Controllers/Collections/Reading/Collections.Reading.CreateTable");
const readCreateTable = require("../Controllers/Collections/Read/Collections.Read.CreateTable");
const toReadCreateTable = require("../Controllers/Collections/ToRead/Collections.ToRead.CreateTable");
const createTableDailyReading = require("../Controllers/Metrics/Tables/CreateDailyReading");
const createTableGoals = require("../Controllers/Metrics/Tables/CreateGoals");

// Connect to SQLite database (or create if it doesn't exist)
const db = new sqlite3.Database("./Database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    collectionsCreateTableCollections(db);
    readingCreateTable(db);
    readCreateTable(db);
    toReadCreateTable(db);
    wishlistCreateTable(db);
    createTableDailyReading(db);
    createTableGoals(db);
    

  }
});

module.exports = db;
