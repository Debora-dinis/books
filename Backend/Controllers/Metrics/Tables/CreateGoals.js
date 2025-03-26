//Create table to track reading goals
const createTableGoals = (db) => {
  db.run(`
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    books INTEGER,
    pages INTEGER
  )`);

  db.run(`
    INSERT INTO goals (books, pages)
    SELECT 0, 0
    WHERE NOT EXISTS (SELECT 1 FROM goals);
  `);;
};
module.exports = createTableGoals;
