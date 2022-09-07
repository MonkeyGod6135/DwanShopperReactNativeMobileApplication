import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const AddList = props => {

    const navigation =useNavigation();

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [date, setDate] = useState('');

    const onListAdd = () => {
        if (!name){
            alert('please enter a shooping list name.');
            return;
        }
        if (!store){
            alert('please enter a store.');
            return;
        }
        if (!date){
            alert('please enter a date in format YYYY-MM-DD.');
            return;
        }
        alert(name + ' Added!');
        navigation.navigate('Start Shopping!');
    }

return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput 
                    value={name}
                    onChangeText={value => setName(value)}
                    style={styles.name}
                    clearButtonMode={'while-editing'}
                    placeholder={'Enter List Name'}
                    PlaceholderTextColor={'grey'}
                />
                <TextInput 
                    value={store}
                    onChangeText={value => setStore(value)}
                    style={styles.store}
                    clearButtonMode={'while-editing'}
                    placeholder={'Enter Store'}
                    PlaceholderTextColor={'grey'}
                />
                <TextInput 
                    value={date}
                    onChangeText={value => setDate(value)}
                    style={styles.date}
                    clearButtonMode={'while-editing'}
                    placeholder={'Enter Date in format YYYY-MM-DD'}
                    PlaceholderTextColor={'grey'}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Pressable style={styles.button} onPress={onListAdd}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default AddList;