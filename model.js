const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv");

dotenv.config(); // Import environmental variables

mongoose.set("strictQuery", false);
// mongoose.connect(process.env.DB_CS);
mongoose.connect(process.env.DB_PASSWORD_BL);

// Book schema
// { title: "Dune",
// author: "Frank Herbert",
// year: 1965,
// pages: 537,
// }
// application schema
// { name: "John",
//       phone: "1234567890",
//       email: "john123@gmail.com",
//       bookID: 22,
// }
//

const bookSchema = Schema({
  cover: {
    typer: String,
    required: [false],
  },

  title: {
    type: String,
    required: [true, "Book must have a title."],
  },

  author: {
    type: String,
    required: [true, "Book must have an author."],
  },

  year: {
    type: Number,
    required: [false],
  },

  pages: {
    type: Number,
    required: [false],
  },

  available: {
    type: Boolean,
    required: [true, "Book must have an availability."],
  },
});

const applicationSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Application must have a name."],
    },

    phone: {
      type: String,
      required: [true, "Application must have a phone number."],
    },

    email: {
      type: String,
      required: [true, "Application must have an email."],
    },

    bookID: {
      type: Number,
      required: [true, "Application must have a book ID."],
    },
  },
  { timestamps: true }
);

const application = mongoose.model("application", applicationSchema);
const book = mongoose.model("book", bookSchema);

module.exports = {
  application: application,
  book: book,
};
