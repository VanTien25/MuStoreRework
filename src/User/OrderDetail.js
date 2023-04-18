import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Header from '../Component/Header';
import CheckoutCart from '../Component/CheckoutCart';

const OrderDetail = ({ navigation, route }) => {
    const idUser = firebase.auth().currentUser.uid;
    const [address, setAddress] = useState(route.params.address);
    const [date, setDate] = useState(route.params.date);
    const [id, setID] = useState(route.params.id);
    const [item, setItem] = useState(route.params.item);
    const [total, setTotal] = useState(route.params.total);
    const [totalStar, setTotalStar] = useState(route.params.totalStar);
    const [status, setStatus] = useState(route.params.status);
    console.log(route.params);

    const handleEnd = () => {
        database()
            .ref('Payment/' + idPay)
            .update({
                status: "3",
            })
            .then(() => alert('Cảm ơn quý khách.'));
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginBottom: 100 }}>
                <Header navigation={navigation} text={'Chi tiết đơn hàng'} />

                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/codeproduct.png')} text={'Mã đơn hàng'} />
                    <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 'bold' }}>{id}</Text>
                </View>

                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/location.png')} text={'Địa chỉ nhận hàng'} />
                    <View style={{ marginBottom: 5, justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 20 }}>{address.name} | {address.phone}</Text>
                        <Text style={{ marginBottom: 5, fontSize: 20 }}>{address.home}, {address.address}</Text>
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/date.png')} text={'Ngày đặt hàng'} />
                    <Text style={{ marginBottom: 5, fontSize: 20 }}>{date}</Text>
                </View>

                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/pay.png')} text={'Thanh toán'} />
                    <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 'bold', color: 'red' }}>Tổng cộng:   {total}</Text>
                    <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 'bold', color: '#FFCC00' }}>Điểm tích lũy:   {totalStar}</Text>
                </View>

                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/list.png')} text={'Danh sách sản phẩm'} />
                    {
                        item.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: '100%', height: 100, alignItems: 'center',
                                        flexDirection: 'row', backgroundColor: '#fff',
                                        justifyContent: 'space-evenly'
                                    }}>
                                    <Image
                                        src={item.image}
                                        style={{ width: '40%', height: '85%', resizeMode: 'contain' }}
                                    />
                                    <ImageBackground
                                        source={require('../Images/star.png')}
                                        style={{ position: 'absolute', top: 5, left: 5, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 14 }}>{item.star}</Text>
                                    </ImageBackground>

                                    <View style={{
                                        width: '60%',
                                        height: '100%',
                                        justifyContent: 'space-between',
                                        padding: 10
                                    }}>
                                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                                            {
                                                item.title.length > 15
                                                    ? item.title.substring(0, 15) + '...'
                                                    : item.title
                                            }
                                        </Text>
                                        <Text style={{ color: 'black', fontSize: 18 }}>Size: {item.size}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>{item.price} VNĐ</Text>
                                            <Text style={{ color: 'black', fontSize: 18 }}>x{item.quantity}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

            {
                status === "1" ?
                    (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: 60,
                                backgroundColor: 'grey',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Chờ xác nhận</Text>
                        </View>
                    ) :
                    status === "2" ? (
                        <TouchableOpacity
                            onPress={() => {
                                handleEnd();
                            }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: 60,
                                backgroundColor: 'green',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Đã nhận hàng</Text>
                        </TouchableOpacity>
                    ) : (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: 60,
                                backgroundColor: 'grey',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Hoàn thành</Text>
                        </View>
                    )
            }
        </View>
    )
}

export default OrderDetail