import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const MyOrder = ({ navigation }) => {
    const userID = firebase.auth().currentUser.uid;
    const [listOrder, setListOrder] = useState([]);

    useEffect(() => {
        database()
            .ref('Payment/')
            .once('value')
            .then(snapshot => {
                let arr = [];
                snapshot.forEach(childSnapshot => {
                    var item = childSnapshot.val();
                    arr.push({
                        id: childSnapshot.key,
                        address: item.address,
                        date: item.date,
                        item: item.item,
                        status: item.status,
                        total: item.total,
                        totalStar: item.totalStar,
                    })
                })
                setListOrder(arr);
                console.log(arr);
            });
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: 50, backgroundColor: '#AA0000', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'yellow', fontSize: 18 }}>Lịch sử đặt hàng</Text>
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
                data={listOrder}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('OrderDetail', {
                                    id: item.id,
                                    address: item.address,
                                    date: item.date,
                                    item: item.item,
                                    status: item.status,
                                    total: item.total,
                                    totalStar: item.totalStar,
                                })
                            }}
                            style={{
                                width: '100%',
                                height: 100,
                                backgroundColor: '#fff',
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                                borderBottomWidth: 4,
                                borderBottomColor: '#DDDDDD'
                            }}>
                            <View style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5 }}>
                                <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 20 }}>{index + 1}</Text>
                            </View>
                            <View style={{ width: '90%', height: '100%', paddingLeft: 15, justifyContent: 'space-evenly' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mã đơn hàng:   {item.id.length > 15 ? item.id.substring(0, 15) + '...' : item.id}</Text>
                                <Text style={{ fontSize: 18 }}>Ngày đặt:   {item.date}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default MyOrder