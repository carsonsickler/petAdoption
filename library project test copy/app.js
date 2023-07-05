Vue.createApp({
    data() {
      return {
        expenses: [],
            modalOpen: false,
            modal: {
                index: -1,
                title: "",
                description: "",
                amount: "",
                creator: "",
                date: "",
            },
            search: "",
            filteredExpenses: [],
            newExpense: {
                title: "",
                description: "",
                amount: "",
                creator: "",
                date: ""
            }
        
      };

      

    },
  
    methods: {
      getExpenses: function() {
        fetch('https://expenses.codeschool.cloud/expenses')
        .then(response => response.json()).then((data) => {
            this.expenses = data;
        });
    },

    deleteExpense: function() {
        var expId = this.expenses[index]._id;
        var requestOptions = {
            method: "DELETE"
        }
        fetch(`https://localhost:8080/expenses/${expId}`, requestOptions).then((response) => {
            if(response.status === 204) {
                console.log("success");
                this.expenses.splice(index, 1);

            } else {
                alert("Unable to delete expense");
            }
        })
    },

    toggleModal: function(index = null) {
        console.log(index);
        this.modalOpen = !this.modalOpen;
        if(index !== null) {
            let exp = this.expenses[index];
            this.modal.index = index;
            this.modal.title = exp.title;
            this.modal.description = exp.description;
            this.modal.amount = exp.amount;
            this.modal.creator = exp.creator;
            this.modal.date = exp.date;
        }
    },
    updateExpense: function() {
        myHeaders = new Headers();
        myHeader.append("Content-Type", "application/x-www-form-urlencoded");

        var encodedData = "title=" + encodeURIComponent(this.newExpense.title) +
                          "description=" + encodeURIComponent(this.newExpense.description) +
                          "amount=" + encodeURIComponent(this.newExpense.amount) +
                          "creator=" + encodeURIComponent(this.newExpense.creator) +
                          "date=" + encodeURIComponent(this.newExpense.date)
        
        var requestOptions = {
            method: "PUT",
            body: encodedData,
            headers: myHeaders
        };

        var expId = this.expenses[this.modal.index]._id;
        fetch(`http://localhost:8080/expenses/${expId}`, requestOptions).then((response) => {
            if (response.status === 204) {
                this.expenses[this.modal.index].title = this.modal.title;
                this.expenses[this.modal.index].description = this.modal.description;
                this.expenses[this.modal.index].amount = parseFloat(this.modal.amount);
                this.expenses[this.modal.index].creator = this.modal.creator;
                this.expenses[this.modal.index].date = this.modal.date;
            } else {
                alert("Not able to update extension");
            }
        })
        
    },



    resetSearch: function() {
        this.search = "";
    },


    // fetch/add to backend
    addExpense: function() {
        myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var encodedData = "title=" + encodeURIComponent(this.newExpense.title) +
                          "&description=" + encodeURIComponent(this.newExpense.description) +
                          "&amount=" + encodeURIComponent(this.newExpense.amount) +
                          "&creator=" + encodeURIComponent(this.newExpense.creator) +
                          "&date=" + encodeURIComponent(this.newExpense.date)

        var requestOptions = {
            method: "POST",
            body: encodedData,
            headers: myHeaders
        };

        fetch("http://localhost:8080/expenses", requestOptions).then((response) => {
            if(response.status === 201) {
                response.json().then((data)=> {
                    this.expenses.push(data);
                    this.newExpense = {};
                })
                console.log("success");
            }else {
                alert("not able to add expense");
            }
        });
    }
    //

      
    },

    created : function() {
        
            
    },

    watch : {

        search(newSearch, oldSearch) {
            console.log("read");
            this.filteredExpenses = this.expenses.filter((expense) => {
                return expense.body.toLowerCase().includes(newSearch.toLowerCase());
            });
        }
    }
  }).mount("#app");