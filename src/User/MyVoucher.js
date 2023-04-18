import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import { CheckoutContext } from '../Context/CheckoutContext';
import Header from '../Component/Header';

const MyVoucher = ({ navigation }) => {
    const { checkout, setVoucher } = useContext(CheckoutContext);
    const userID = firebase.auth().currentUser.uid;
    const [listVoucher, setListVoucher] = useState([]);

    useEffect(() => {
        database()
            .ref('Myvoucher/' + userID)
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(childSnapshot => {
                    var item = childSnapshot.val();
                    arr.push({
                        id: childSnapshot.key,
                        quantity: item.quantity,
                        coin: item.coin,
                        price: item.price,
                        value: item.value,
                        title: item.title,
                    });
                })
                setListVoucher(arr);
            });
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header navigation={navigation} text={'Danh sách voucher'} />

            {listVoucher.length > 0 ? (
                <FlatList
                    data={listVoucher}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        if (checkout === undefined) {
                            return (
                                <View
                                    style={{
                                        width: '94%',
                                        height: 100,
                                        marginBottom: 10,
                                        alignSelf: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        backgroundColor: '#FFFF99',
                                        borderRadius: 10,
                                        padding: 10
                                    }}
                                >
                                    <View style={{
                                        width: '30%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image
                                            source={require('../Images/giftbox.png')}
                                            style={{ width: 50, height: 50 }} />
                                        <Text style={{
                                            color: 'green',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            marginTop: 5
                                        }}>x{item.quantity}</Text>
                                    </View>

                                    <View style={{
                                        width: '70%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text
                                            style={{
                                                color: 'red',
                                                textAlign: 'center',
                                                fontSize: 20,
                                                fontWeight: 'bold'
                                            }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </View>
                            )
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if(checkout.total >= item.value) {
                                            setVoucher(item)
                                            navigation.goBack();
                                        } else {
                                            alert('Chưa đủ điều kiện!')
                                        }
                                    }}
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        marginBottom: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                    <View
                                        style={{
                                            width: '94%',
                                            height: 100,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            backgroundColor: '#FFFF99',
                                            borderRadius: 10,
                                            padding: 10
                                        }}
                                    >
                                        <View style={{
                                            width: '30%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={require('../Images/giftbox.png')}
                                                style={{ width: 50, height: 50 }} />
                                            <Text style={{
                                                color: 'green',
                                                fontWeight: 'bold',
                                                fontSize: 18,
                                                marginTop: 5
                                            }}>x{item.quantity}</Text>
                                        </View>

                                        <View style={{
                                            width: '70%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    textAlign: 'center',
                                                    fontSize: 20,
                                                    fontWeight: 'bold'
                                                }}>
                                                {item.title}
                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        }

                    }}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Không có voucher nào trong kho</Text>
                </View>
            )}
        </View >
    )
}

export default MyVoucher