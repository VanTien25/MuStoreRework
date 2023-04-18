import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { CheckoutContext } from '../Context/CheckoutContext';
import CheckoutItem from '../Component/CheckoutItem';
import CheckoutCart from '../Component/CheckoutCart';
import Header from '../Component/Header';

const Checkout = ({ navigation }) => {
    const [payment, setPayment] = useState(false)
    const { checkout, address, setAddress } = useContext(CheckoutContext);
    const [listVoucher, setListVoucher] = useState([]);
    const [starUser, setStarUser] = useState();
    const [total, setTotal] = useState(checkout.total);
    const [chooseVoucher, setChooseVoucher] = useState({});
    const userID = firebase.auth().currentUser.uid;
    const star = checkout.totalStar;
    const listProduct = checkout.dataCart;
    const currentDate = new Date().toLocaleString()

    console.log(address);

    useEffect(() => {
        database()
            .ref('Myvoucher/' + userID)
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val()
                    arr.push({
                        id: child.key,
                        coin: item.coin,
                        idVoucher: item.idVoucher,
                        price: item.price,
                        title: item.title,
                        value: item.value,
                    });
                })
                setListVoucher(arr);
            });
    }, [])

    useEffect(() => {
        database()
            .ref('User/' + userID)
            .on('value', snapshot => {
                var item = snapshot.val()
                setStarUser(item.myStar)
            });
    }, [])

    const handleSubmit = () => {
        database().ref('Payment/').push().set({
            userID: userID,
            address: address,
            item: listProduct,
            totalStar: star,
            total: total,
            paymentStatus: payment,
            date: currentDate,
            status: "1",
        }).then(() => {
            alert('Đặt hàng thành công.');
        });
        updateInfo();
    }

    const updateInfo = async () => {
        await database()
            .ref('User/' + userID)
            .update({
                myStar: star + starUser,
            })
            .then(() => console.log('Data updated.'));
        await database().ref('Myvoucher/' + userID + '/' + chooseVoucher.id).remove();
        await database().ref('Cart/' + userID).remove();
        setAddress({});
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 70 }}>
                <Header text={'Thanh toán'} navigation={navigation} />
                <View style={{ padding: 15, borderBottomWidth: 5, borderBottomColor: '#DDDDDD' }}>
                    <CheckoutCart icon={require('../Images/location.png')} text={'Địa chỉ nhận hàng'} />
                    {
                        Object.values(address).length === 0 ? (null) : (
                            <View style={{ marginBottom: 5, justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: 20 }}>{address.name} | {address.phone}</Text>
                                <Text style={{ marginBottom: 5, fontSize: 20 }}>{address.home}, {address.address}</Text>
                            </View>
                        )
                    }

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5,
                            flexDirection: 'row',
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#C0C0C0',
                            backgroundColor: '#fff',
                        }}
                        onPress={() => {
                            navigation.navigate('MyAddress');
                        }}>
                        <Image
                            source={require('../Images/add.png')}
                            style={{ width: 25, height: 25, marginRight: 5, tintColor: 'red' }} />
                        <Text style={{ color: 'red', fontSize: 15 }}>Chọn địa chỉ</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 15, borderBottomWidth: 5, borderBottomColor: '#DDDDDD' }}>
                    <CheckoutCart icon={require('../Images/list.png')} text={'Danh sách sản phẩm'} />
                    {
                        listProduct.map((item, index) => { return (<CheckoutItem item={item} />) })
                    }
                </View>

                <View style={{ padding: 15, borderBottomWidth: 5, borderBottomColor: '#DDDDDD' }}>
                    <CheckoutCart icon={require('../Images/luckystar.png')} text={'Điểm tích lũy'} />
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 5, paddingRight: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sao may mắn</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF9900' }}>{star}</Text>
                    </View>
                </View>

                <View style={{ padding: 15, borderBottomWidth: 5, borderBottomColor: '#DDDDDD' }}>
                    <CheckoutCart icon={require('../Images/voucher.png')} text={'Voucher giảm giá'} />
                    {
                        Object.values(chooseVoucher).length === 0 ? (<FlatList
                            data={listVoucher}
                            horizontal
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                if (listVoucher.length === 0) {
                                    <Text>Không có voucher nào!</Text>
                                } else {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (total >= item.value) {
                                                    Alert.alert('Thông báo', 'Bạn chắc chắn muốn chọn voucher này?', [
                                                        {
                                                            text: 'OK', onPress: () => {
                                                                setChooseVoucher(item)
                                                                setTotal(total - item.price)
                                                            }
                                                        },
                                                    ],
                                                        {
                                                            cancelable: true,
                                                        },);

                                                } else {
                                                    alert('Chưa đủ điều kiện');
                                                }
                                            }}
                                            style={{
                                                width: 250,
                                                height: 100,
                                                alignSelf: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#FFFF66',
                                                borderRadius: 10,
                                                marginRight: 10,
                                            }}>
                                            <Image
                                                source={require('../Images/giftbox.png')}
                                                style={{ width: 40, height: 40 }} />
                                            <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }} />) : (
                            <View
                                style={{
                                    width: 250,
                                    height: 100,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#FFFF66',
                                    borderRadius: 10,
                                    marginRight: 10,
                                }}>
                                <Image
                                    source={require('../Images/giftbox.png')}
                                    style={{ width: 40, height: 40 }} />
                                <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>
                                        {chooseVoucher.title}
                                    </Text>
                                </View>
                            </View>
                        )
                    }

                </View>

                <View style={{ padding: 15, borderBottomWidth: 5, borderBottomColor: '#DDDDDD' }}>
                    <CheckoutCart icon={require('../Images/paymethod.png')} text={'Thanh toán'} />
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 50,
                            marginBottom: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'green',
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Thanh toán khi nhận hàng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setChoosePay(item.title)
                        }}
                        style={{
                            width: '80%',
                            height: 50,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'green',
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Thanh toán online</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Nut thanh toan */}
            <View style={{ position: 'absolute', bottom: 0, height: 70, flexDirection: 'row' }}>
                <View style={{
                    width: '75%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: 15
                }}>
                    <Text style={{ fontSize: 18 }}>Tổng thanh toán</Text>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'red' }}>₫{total}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if (Object.values(address).length === 0) {
                            alert('Bạn chưa điền đủ thông tin')
                        } else {
                            handleSubmit();
                            navigation.navigate('Home');
                        }
                    }}
                    style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#AA0000'
                    }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

export default Checkout