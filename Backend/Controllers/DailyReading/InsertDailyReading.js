//Insert daily readings
const db = require("../../Database/Database.js");
const dailyReadingInsert = (req, res) => {
  const { date, pagesRead } = req.body;

  const query = `
      INSERT INTO daily_reading
        (date, pages) 
      VALUES (?, ?)
    `;

  db.run(query, [date, pagesRead], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Daily reading successfully added", id: this.lastID });
    }
  });
};

module.exports = dailyReadingInsert;
