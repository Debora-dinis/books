//Remove book from collection
const db = require("../../Database/Database.js");
const bookRemove = (req, res) => {
  const { googleId, table_name } = req.params;

  const query = `
      DELETE FROM ${table_name.replaceAll(" ","")} WHERE google_id = ?
    `;

  db.run(query, [googleId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Book removed from the collection", id: this.lastID });
    }
  });
};

module.exports = bookRemove;


