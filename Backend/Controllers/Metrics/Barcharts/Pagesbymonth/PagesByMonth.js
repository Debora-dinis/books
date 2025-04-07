const db = require("../../../../Database/Database");

const pagesReadThisYearByMonth = (req, res) => {
  const query = `
    SELECT 
        strftime('%m', date) AS month,
        SUM(pages) AS total_pages
    FROM daily_reading
    WHERE date >= date('now', '-1 year')
    GROUP BY strftime('%m', date)
    ORDER BY month;
  `;

  db.all(query, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = pagesReadThisYearByMonth;
