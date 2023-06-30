const express = require("express");
const cors = require("cors");
const model = require("./model");

const app = express();
const port = 8082;

app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Errors
function bookValidate(book) {
  var errors = [];
  if (!book.title) {
    errors.push("Book must have a title");
  }
  if (!book.author) {
    errors.push("Book must have an author");
  }
  if (!book.year) {
    errors.push("Book was made at somepoint");
  }
  if (!book.pages) {
    errors.push("If book exists, book must have a page #");
  }
  if (!isNaN(book.pages)) {
    errors.push("Book page number has to be a number");
  }
}

function applicationValidate(application) {
  var errors = [];
  if (!application.name) {
    errors.push("Application must have a name");
  }
  if (!application.phone) {
    errors.push("Application must have an phone #");
  }
  if (!application.email) {
    errors.push("Application must have an email");
  }
  if (!application.bookID) {
    errors.push("Application must have a book ID");
  }
}

// GET
app.get("/applications", function (req, res) {
  model.application.find().then(function (application) {
    res.send(application);
  });
});

app.get("/books", function (req, res) {
  model.book.find().then(function (book) {
    res.send(book);
  });
});

app.post("/applications", function (req, res) {
  const newApplication = new model.application({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    bookID: req.body.bookID,
  });
  newApplication.save().then(function () {
    res.status(201).send("Application created.");
  });
});

app.post("/books", function (req, res) {
  const newBook = new model.book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    pages: req.body.pages,
    available: req.body.available,
  });
  newBook.save().then(function () {
    res.status(201).send("Book created.");
  });
});

app.delete("/books/:bookID", function (req, res) {
  var bookID = req.params.bookID;

  model.book
    .findOne({ "_id": bookID })
    .then((book) => {
      if (book) {
        model.book.deleteOne({ "_id": bookID }).then((result) => {
          res.status(204).send("book deleted");
        });
      } else {
        res.status(404).send("Book not found");
      }
    })
    .catch((errors) => {
      console.log(errors);
      res.status(400).send("Book not found/error deleting");
    });
});

app.listen(port, function () {
  console.log("Server is running...");
});

// ## REST Endpoints

// Name                           | Method | Path
// -------------------------------|--------|------------------
// Retrieve application collection| GET    | /applications
// Create application item        | POST   | /applications
// Update application item        | PUT    | /applications/*\<id\>*
// Delete application item        | DELETE | /applications/*\<id\>*
// Retrieve book collection       | GET    | /books
// Retrieve book item             | GET    | /books/*\<id\>*
