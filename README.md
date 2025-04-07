# 📚 Libris Vault

**Libris Vault** is a web app that helps you search for books using the Google Books API, managing personal collections in your library and track your reading progress with analytics

---

## ✨ Features

- 🔍 **Search**: Find books quickly using the Google Books API.
- 📘 **Collections**: Add books to collections in your personal library.
- 📊 **Analytics**: Track your reading progress with reading tracking and personal reading goals.

---

## 🛠 Tech Stack

- **React**
- **JavaScript**
- **SQLite** (for local storage)
- **Google Books API**
- **Air Datepicker** (for custom date input)
- **Chart.js / Recharts** (for analytics)

---
## 🚀 Installation

1.  Clone the repository:
  ```bash
git clone https://github.com/Debora-dinis/books.git
cd books
```

2. Install dependencies:
  ```bash
 npm install
```
3. Create a .env file in the root directory and add your Google Books API key:
```
REACT_APP_GOOGLE_BOOKS_API_KEY=your_api_key_here
```
4. Start the development server:

```bash
npm start
```

---
## 🧑‍💻 Usage

### 🔍 Search
Search for books by **title**, **author**, or **ISBN**.  
Select the appropriate search filter, type your query into the search bar, and hit **Search** to view results.

### 📚 Results
After searching, you can:
- Add books to your **Wishlist** to save them for later.
- Add books to a **Collection** in your personal library.
- View more details about each book, including the **description**, **publisher**, and other metadata.

### 📝 Wishlist
View and manage your **wishlisted** books.  
Once you’ve purchased a book, remove it from the wishlist or add it to a collection.

### 📁 Collections
Choose from default collections like:
- **Wishlist**
- **Read**
- **To Read**
- **Reading**

You can also create your **own custom collections**.  
Select a collection to:
- Manage the books inside it
- Mark when a book is read
- Track how much of a book you’ve read, or when you read it

### 📊 Dashboard
- Set a **yearly book reading goal** and a **daily page reading goal**
- Track your progress toward those goals
- View insights such as:
  - Books read per month
  - Most-read genres
  - Total books in **Wishlist**, **Read**, and **To Read**
  - Your **reading streak**

