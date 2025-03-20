//Get all collections
const db = require("../../Database/Database.js");
const collectionsGet = (req, res) => {
  db.all("Select table_name From tables_list", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = collectionsGet;