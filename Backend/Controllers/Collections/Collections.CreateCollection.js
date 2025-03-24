const db = require("../../Database/Database.js");

const collectionsCreateCollection = (req, res) => {
  const { table_name } = req.body;

  // SQL query to insert the table name into the tables_list
  db.run(`INSERT OR IGNORE INTO tables_list (table_name) VALUES (?)`, [table_name], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // SQL query to create the new table with the specified structure
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${table_name.replaceAll(" ","")} (
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
      );
    `;

    db.run(createTableQuery, function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Collection and Table Created", id: this.lastID });
    });
  });
};

module.exports = collectionsCreateCollection;
