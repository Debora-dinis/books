const toReadCreateTable = (db) => {
  // SQL query to insert the table name into the tables_list
  db.run(
    `INSERT OR IGNORE INTO tables_list (table_name) VALUES (?)`,
    ["To Read"],
    function (err) {
      if (err) {
        return;
      }

      // SQL query to create the new table with the specified structure
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ToRead (
        google_id TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        authors TEXT,
        publisher TEXT,
        publishedDate TEXT,
        description TEXT,
        pageCount SMALLINT,
        categories TEXT,
        thumbnail TEXT,
        infoLink TEXT
      )`;
      db.run(createTableQuery);
    }
  );
};
module.exports = toReadCreateTable;
