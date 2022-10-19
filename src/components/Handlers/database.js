// import openDatabase hook
import {openDatabase} from "react-native-sqlite-storage";

//use hook to open database
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';
const itemsTableName = 'items';

module.exports = {
    // declare function that will create lists table
    createListsTable: async function() {
        //declare a transaction that will execute a sql statement
        (await shopperDB).transaction(txn => {
            //execute the sql
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${listsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    store TEXT,
                    date TEXT
                );`,
                // arguements needed when using an SQL PREPARED statement
                [],
                // callback function to handle results of SQL
                () => {
                    console.log('Lists table created successfully');
                },
                error => {
                    console.log('error creating lists table' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row into the lists table
    addList: async function(name, store, date){
        // declare a transaction that will execute an SQL statement
        (await shopperDB).transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${listsTableName} (name, store, date) VALUES ("${name}", "${store}", "${date}")`,
                // arugements passed when using SQL prepared statemnets
                [],
                // callback function
                () => {
                    console.log(name + " added sucessfully");
                },
                error => {
                    console.log('error adding list' + error.message);
                },
            );
        });
    },
     //declare function
     addList: async function (name, store, date){
        (await shopperDB).transaction(txn =>{
                //execute the sql
                txn.executeSql(
                    `INSERT INTO ${listsTableName} (name, store, date) VALUES ("${name}", "${store}", "${date}")`,
                 // arugements passed when using SQL prepared statemnets
                [],
                // callback function
                () => {
                    console.log(name + " added sucessfully");
                },
                error => {
                    console.log('error adding list' + error.message);
                },
            );
        });
     },
     // declare function that will create lists table
    createItemsTable: async function() {
        //declare a transaction that will execute a sql statement
        (await shopperDB).transaction(txn => {
            //execute the sql
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${itemsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT(100),
                    price REAL,
                    quanitiy INTEGER
                );`,
                // arguements needed when using an SQL PREPARED statement
                [],
                // callback function to handle results of SQL
                () => {
                    console.log('Items table created successfully');
                },
                error => {
                    console.log('error creating items table' + error.message);
                },
            );
        });
    },

    addItem: async function(name, price, quantity){
        // declare a transaction that will execute an SQL statement
        (await shopperDB).transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${itemsTableName} (name, price, quantity) VALUES ("${name}", ${price}, ${quantity})`,
                // arugements passed when using SQL prepared statemnets
                [],
                // callback function
                () => {
                    console.log(name + " added sucessfully");
                },
                error => {
                    console.log('error adding item' + error.message);
                },
            );
        });
    },
     
     

};
