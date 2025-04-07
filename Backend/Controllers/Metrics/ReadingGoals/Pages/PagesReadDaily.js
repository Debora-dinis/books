const db = require("../../../../Database/Database");

const pagesReadDailyThisMonth = (req, res) => {
  const query = `
    SELECT 
        date(date) AS day,
        SUM(pages) AS total_pages
    FROM reading_log
    WHERE date >= date('now', '-1 month')
    GROUP BY date(date)
    ORDER BY day;
  `;

  db.all(query, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = pagesReadDailyThisMonth;
