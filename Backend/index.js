const dotenv=require("dotenv")
dotenv.config()
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;
const wishlistRemove = require("./Controllers/Wishlist/Wishlist.remove.js");
const wishlistGet = require("./Controllers/Wishlist/Wishlist.list.js");
const wishlistInsert = require("./Controllers/Wishlist/Wishlist.insert.js");
const collectionsCreateCollection = require("./Controllers/Collections/Collections.CreateCollection.js")
const collectionsGet = require("./Controllers/Collections/Collections.ListCollections.js");
const listCollectionBooks = require("./Controllers/Collections/Collections.ListCollectionBooks.js");
const readInsert = require("./Controllers/Collections/Read/Collections.Read.InsertBook.js");
const bookRemove = require("./Controllers/Collections/Collections.RemoveBook.js");
const bookInsert = require("./Controllers/Collections/Collections.InsertBook.js");
const readingInsert = require("./Controllers/Collections/Reading/Collections.Reading.InsertBook.js");
const toReadBooks = require("./Controllers/Metrics/KPIs/ToReadBooks.js");
const readBooks = require("./Controllers/Metrics/KPIs/ReadBooks.js");
const wishlistedBooks = require("./Controllers/Metrics/KPIs/WishlistedBooks.js");
const updatePagesGoal = require("./Controllers/Metrics/ReadingGoals/UpdateGoalPages.js");
const updateBooksGoal = require("./Controllers/Metrics/ReadingGoals/UpdateGoalBooks.js");
const booksReadThisYear = require("./Controllers/Metrics/ReadingGoals/Gauges/Books/BooksReadThisYear.js");
const bookGoalGet = require("./Controllers/Metrics/ReadingGoals/Gauges/Books/BookGoal.js")
const booksByCategory = require("./Controllers/Metrics/Barcharts/BooksByCategory/BooksByCategory.js")
app.use(cors());
app.use(express.json());
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

//Create collection
app.post("/CreateCollection",collectionsCreateCollection)
//Select all collections
app.get("/Collections",collectionsGet)
//Select all books from a collection
app.post("/listCollectionBooks",listCollectionBooks)
//Remove a book from a collection
app.delete("/removeBook/:googleId/:table_name",bookRemove)
//Insert a book to a collection
app.post("/insertBook",bookInsert)

//Add a book to the read collection
app.post("/Read",readInsert)

//Add a book to the reading collection
app.post("/Reading",readingInsert)

// Add a book to the wishlist
app.post("/Wishlist",wishlistInsert );
// Remove a book to the wishlist
app.delete("/Wishlist/:googleId", wishlistRemove);
// Select all books from wishlist
app.get("/Wishlist", wishlistGet);

//Get the number of books to read
app.get("/KPItoRead",toReadBooks);
// Get the number of books read
app.get("/KPIRead",readBooks)
//Get the number of books wishlisted
app.get("/KPIWishlisted",wishlistedBooks)

//Get the number of books read this year
app.get("/BooksReadThisYear",booksReadThisYear)
//Get the yearly book reading goal
app.get("/bookGoalGet",bookGoalGet)

//Get number of books read per category

app.get("/booksByCategory",booksByCategory)

//Update page reading goal
app.post("/GoalPages", updatePagesGoal)
//Update book reading goal
app.post("/GoalBooks", updateBooksGoal)

// Search for books with google api
app.post("/search", async (req, res) => {
  console.log(req.body);
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let reqOptions = {
    url: `https://www.googleapis.com/books/v1/volumes?q=${
      req.body.Search
    }&fields=items(id,volumeInfo(title,authors,publisher,publishedDate,description,pageCount,categories,imageLinks/thumbnail,infoLink,industryIdentifiers))&key=${process.env.API}&startIndex=${
      req.body.startIndex || 0
    }&maxResults=20`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  console.log(response.data);
  res.send(response.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
