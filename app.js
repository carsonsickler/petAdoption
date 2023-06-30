Vue.createApp({
  data() {
    return {
      applications: [],
      books: [],
      newApplication: {
        name: "",
        phone: "",
        email: "",
      },
      newBook: {
        cover: "",
        title: "",
        author: "",
        year: 0,
        pages: 0,
        available: true,
      },
    };
  },

  methods: {
    // add application
    addApplication: function (index) {
      myHeaders1 = new Headers();
      myHeaders1.append("Content-Type", "application/x-www-form-urlencoded");
      var data1 =
        "name=" +
        encodeURIComponent(this.newApplication.name) +
        "&phone=" +
        encodeURIComponent(this.newApplication.phone) +
        "&email=" +
        encodeURIComponent(this.newApplication.email) +
        "&index=" +
        encodeURIComponent(this.newApplication.index);
      var requestOptions1 = {
        method: "POST",
        body: data1,
        headers: myHeaders1,
      };
      fetch("http://localhost:8082/applications", requestOptions1).then(
        (response) => {
          if (response.status === 201) {
            response.json().then((data) => {
              this.applications.push(data);
            });
            console.log("Application added");
            this.newApplication = {};
          } else {
            alert("Error adding expense");
          }
        }
      );

      // update book to unavailable
      myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");
      var data2 =
        "cover=" +
        encodeURIComponent(this.books[index].cover) +
        "&title=" +
        encodeURIComponent(this.books[index].title) +
        "&author=" +
        encodeURIComponent(this.books[index].author) +
        "&year=" +
        encodeURIComponent(this.books[index].year) +
        "&pages=" +
        encodeURIComponent(this.books[index].pages) +
        "&available=" +
        encodeURIComponent(false);
      var requestOptions2 = {
        method: "PUT",
        body: data2,
        headers: myHeaders2,
      };
      fetch("http://localhost:8082/applications", requestOptions2).then(
        (response) => {
          if (response.status === 204) {
            response.json().then((data) => {
              this.books.splice(index, 1);
              this.books.push(data);
            });
          } else {
            alert("Error updating book to unavailable.");
          }
        }
      );
    },

    // add book
    addBook: function () {
      myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var data =
        "cover=" +
        encodeURIComponent(this.newBook.cover) +
        "title=" +
        encodeURIComponent(this.newBook.title) +
        "&author=" +
        encodeURIComponent(this.newBook.author) +
        "&year=" +
        encodeURIComponent(this.newBook.year) +
        "&pages=" +
        encodeURIComponent(this.newBook.pages) +
        "&available=" +
        encodeURIComponent(this.newBook.available);
      var requestOptions = {
        method: "POST",
        body: data,
        headers: myHeaders,
      };
      fetch("http://localhost:8082/books", requestOptions).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            this.books.push(data);
          });
          console.log("Book added");
          this.newBook = {};
        } else {
          alert("Error adding book");
        }
      });
    },

    // DELETE
    deleteBook: function (index) {
      var requestOptions = {
        method: "DELETE",
        params: { bookID: this.books[index]._id },
      };
      fetch(
        `http://localhost:8080/expenses/${this.books[index]._id}`,
        requestOptions
      ).then((response) => {
        if (response.status === 204) {
          console.log(response.body);
        } else if (response.status === 404) {
          alert("Error deleting book");
        } else if (response.status === 422) {
          alert("Unable to delete book");
        }
      });
      this.books.splice(index, 1);
    },

    deleteApplication: function (index) {
      var requestOptions = {
        method: "DELETE",
        params: { applicationID: this.applications[index]._id },
      };
      fetch(
        `http://localhost:8080/expenses/${this.applications[index]._id}`,
        requestOptions
      ).then((response) => {
        if (response.status === 204) {
          console.log(response.body);
        } else if (response.status === 404) {
          alert("Error deleting application");
        } else if (response.status === 422) {
          alert("Unable to delete application");
        }
      });
      this.applications.splice(index, 1);
    },
  },

  created: function () {},
}).mount("#app");
