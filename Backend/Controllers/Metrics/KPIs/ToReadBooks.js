//@ts-check
//Get the number of books in to read
const db = require("../../../Database/Database.js");

const toReadBooks = (req, res) => {
  db.all("SELECT COUNT(google_id) AS NoOfToReadBooks FROM ToRead;", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ count: result[0]?.NoOfToReadBooks || 0 });
    }
  });
};

module.exports = toReadBooks;