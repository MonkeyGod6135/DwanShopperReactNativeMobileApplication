// import openDatabase hook
import {openDatabase} from "react-native-sqlite-storage";

//use hook to open database
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';

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
};