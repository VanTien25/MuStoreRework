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
            <View style={{ flex: 1, paddingTop: 10 }}>
                {listVoucher.length > 0 ? (
                    <FlatList
                        data={listVoucher}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
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
                                            backgroundColor: '#FFFF66',
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
                        }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Không có voucher nào trong kho</Text>
                    </View>
                )}
            </View>
        </View >
    )
}

export default MyVoucher