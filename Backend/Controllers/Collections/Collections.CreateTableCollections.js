const collectionsCreateTableCollections = (db) => {
  db.run(`
CREATE TABLE IF NOT EXISTS tables_list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT UNIQUE NOT NULL
);
`);
};

module.exports = collectionsCreateTableCollections;
