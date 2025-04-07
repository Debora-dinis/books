// Get the daily page goal
const db = require("../../Database/Database.js");
const pageGoalGet = (req, res) => {
  db.all("Select pages From goals", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = pageGoalGet;