// Get the yearly book goal
const db = require("../../../../Database/Database.js");
const bookGoalGet = (req, res) => {
  db.all("Select books From goals", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = bookGoalGet;