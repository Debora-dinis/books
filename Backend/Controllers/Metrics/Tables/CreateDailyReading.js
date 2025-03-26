//Create table to track daily reading
const createTableDailyReading = (db) => {
    db.run(`
  CREATE TABLE IF NOT EXISTS daily_reading (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    pages INTEGER NOT NULL
  )`);
  };
  
  module.exports = createTableDailyReading;
  