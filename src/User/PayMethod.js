import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import { Swipeable } from 'react-native-gesture-handler';
import { CheckoutContext } from '../Context/CheckoutContext';

const PayMethod = ({ navigation }) => {
    const { checkout, setPay } = useContext(CheckoutContext);
    const [payMethod, setPayMethod] = useState([])

    useEffect(() => {
        database()
            .ref('PayMethod/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val();
                    arr.push({
                        id: child.key,
                        title: item.title,
                    });
                })
                setPayMethod(arr);
                console.log(arr);
            });
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{
                width: '100%', height: 50,
                backgroundColor: '#AA0000', justifyContent: 'center',
                alignItems: 'center', marginBottom: 10,
            }}>
                <Text style={{ fontWeight: 'bold', color: 'yellow', fontSize: 18 }}>Phương thức thanh toán</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                }}>
                <Image
                    source={require('../Images/back.png')}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: 'yellow'
                    }} />
            </TouchableOpacity>

            <FlatList
                data={payMethod}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    if (checkout === undefined) {
                        return (
                            <View
                                style={{
                                    width: '90%',
                                    height: 80,
                                    marginBottom: 10,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    backgroundColor: '#333333',
                                    borderRadius: 10,
                                    padding: 10
                                }}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginTop: 5
                                }}>{item.title}</Text>
                            </View>
                        )
                    } else {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setPay(item)
                                    navigation.goBack();
                                }}
                                style={{
                                    width: '90%',
                                    height: 80,
                                    marginBottom: 10,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    backgroundColor: '#333333',
                                    borderRadius: 10,
                                    padding: 10
                                }}>
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginTop: 5
                                }}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }

                }}
            />
        </View >
    )
}

export default PayMethod