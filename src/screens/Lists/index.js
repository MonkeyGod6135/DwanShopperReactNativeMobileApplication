
import React, {useState, useEffect} from 'react';
import List from '../../components/List';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
// import openDatabase hook
import {openDatabase} from "react-native-sqlite-storage";

//use hook to open database
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';

const ListsScreen = props => {

  const navigation =useNavigation();

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
        // declare an empty array that will store the results of the select
        let results = [];
        // declare a transaction that will execute the select
        shopperDB.transaction(txn => {
          // console.log(txn);
          //execute select
          txn.executeSql(
            `SELECT * FROM ${listsTableName}`,
            [],
            // callback function to handle results from the select
            (_, res) => {
              // get number of rows of data selected
              let len = res.rows.length;
              console.log('Length of Lists ' + len);
              // if more then one row was returned
              if (len > 0){
                // loop through the rows
                for (let i = 0; i < len; i++){
                  // push a row of data at a time onto the 
                  // results array
                  let item = res.rows.item(i);
                  results.push({
                    id: item.id,
                    name: item.name,
                    store: item.store,
                    date: item.date,
                  });
                }
                // assign results array to lists state variable
                setLists(results);
              } else {
                // if no rows of data were returned,
                // set lists state variable to an empty arrray
                setLists([]);
              }
            },
            error => {
              console.log('Error getting list ' + error.message);
            },
         )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
        data={lists}
        renderItem={({item}) => <List post={item} />}
        keyExtractor={item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add List!')}
             >
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ListsScreen;