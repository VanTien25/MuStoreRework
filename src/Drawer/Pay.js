import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import database from '@react-native-firebase/database';
import ItemCart from '../Component/ItemCart';

const Pay = ({ navigation }) => {
    const [payMethod, setPayMethod] = useState([])

    useEffect(() => {
        database()
            .ref('PayMethod/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val()
                    arr.push({
                        id: child.key,
                        title: item.title,
                    })
                })
                setPayMethod(arr)
                console.log(arr)
            });
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: '100%',
                height: 60,
                backgroundColor: '#AA0000',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <Image
                        source={require('../Images/back.png')}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: 'yellow',
                        }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: 'yellow', fontWeight: 'bold' }}>Phương thức thanh toán</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddPay');
                    }}
                >
                    <Image
                        source={require('../Images/additem.png')}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: 'yellow'
                        }} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={payMethod}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ height: 50, borderWidth: 1}}>
                            <Text>{item.title}</Text>
                        </View>
                    )
                }} />
        </View>
    )
}

export default Pay