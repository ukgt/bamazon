let mysql = require("mysql");
let inquirer = require("inquirer");

// create the connection information for the sql database
let connection = mysql.createConnection({
     host: "localhost",

     // Your port; if not 3306
     port: 3306,

     // Your username
     user: "root",

     // Your password
     password: "root",
     database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
     if (err) throw err;
     // run the start function after the connection is made to prompt the user
     start();
});
let displayInventory = () => {
     //console.log("SQL Connection Established")
     connection.query("SELECT * FROM products", function(err, res) {
         if (err) throw err
         for (let i = 0; i < res.length; i++) {
             console.log(" - - - - - - - - - - - - - - - ")
             console.log("item number: " + res[i].id)
             console.log("item: " + res[i].product)
             console.log("price: $" + res[i].price)
         }
          // purchase()
     })
 };
function start() {
     inquirer
          .prompt({
               name: "purchase",
               type: "list",
               message: "Would you like to PURCHASE an item?",
               choices: ["YES", "EXIT"]
          })
          .then(function (answer) {
               // based on their answer, either call theY purchase or exit application
               if (answer.purchase === "YES") {
                    
                    selectItem();
                    //  displayInventory();
               } else if (answer.purchase === "EXIT") {
                    connection.end();
               }
          });
}
// function to handle items wanted
function selectItem() {
     // prompt for info about the item #
     inquirer
          .prompt([{
                    name: "id",
                    type: "input",
                    message: "What is the ID of the product you would like to order?",
                    validate: function (input) {
                         let pass = !isNaN(input) && parseInt(input) > 0;
                         if (pass) {
                              return true;
                         } else {
                              return "Please enter a valid number";
                         }
                    }
               },
               {
                    name: "stock_quantity",
                    type: "input",
                    message: "How many would you like to order?",
                    validate: function (input) {
                         let pass = !isNaN(input) && parseInt(input) > 0;
                         if (pass) {
                              return true;
                         } else {
                              return "Please enter a valid number";
                         }
                    }
               }
          ])
          .then(function(purchase) {
               let item = purchase.id
               let quantity = purchase.stock_quantity
   
               let queryStr = 'SELECT * FROM products WHERE ?';
   
               connection.query(queryStr, { id: item }, function(err, res) {
                   if (err) throw err
   
                   if (res.length === 0) {
                       console.log("ERROR: Invalid Item ID. Please select a valid Item ID.")
                       displayInventory()
                   } else {
   
                       // set the results to the variable of productInfo
                       let productInfo = res[0]
   
                       if (quantity <= productInfo.stock_quantity) {
                           console.log(productInfo.product + " is in stock! Placing order now!")
                           console.log("\n")
   
                           // the updating query string
                           var updateQueryStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE id = " + item
                               // console.log('updateQueryStr = ' + updateQueryStr);
   
                           // Update the inventory
                           connection.query(updateQueryStr, function(err, data) {
                               if (err) throw err;
   
                               console.log("Your order has been placed!");
                               console.log("Your total is $" + productInfo.price * quantity)
                               console.log("Thank you for shopping with bamazon!")
                               console.log(" - - - - - - - - - - - - - - - ")
                               console.log("To shop again with us please input 'node bamazonCustomer.js' into your command line again.")
                               console.log("\n")
   
                               // End the database connection and close the app
                               connection.end();
                           });
                    }else {
                         console.log("Sorry, there is not enough " + productInfo.product + " in stock.")
                         console.log("Your order can not be placed as is.")
                         console.log("Please modify your order or select another item.")
                         console.log("\n")
 
                         // After 3 seconds display the inventory again so that the customer can make a new selcetion.
                         setTimeout(function() { displayInventory() }, 3000)
                     }
                     displayInventory();
 
                 }
             })
 
 
         })
 }
