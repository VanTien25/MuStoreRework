import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { CheckoutContext } from '../Context/CheckoutContext';
import CheckoutItem from '../Component/CheckoutItem';
import CheckoutCart from '../Component/CheckoutCart';
import Header from '../Component/Header';

const Checkout = ({ navigation }) => {
    const [payment, setPayment] = useState(false)
    const { checkout, address, voucher, setVoucher, setCheckout } = useContext(CheckoutContext);
    const [currentDate, setCurrentDate] = useState('');
    const [starUser, setStarUser] = useState();
    const userID = firebase.auth().currentUser.uid;
    const total = checkout.total;
    const star = checkout.totalStar;
    const listProduct = checkout.dataCart;


    useEffect(() => {
        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        var hours = new Date().getHours()
        var min = new Date().getMinutes()
        var sec = new Date().getSeconds()
        setCurrentDate(
            date + '/' + month + '/' + year + '  ' + hours + ':' + min + ':' + sec
        )
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
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 70 }}>
                <Header text={'Thanh toán'} navigation={navigation}/>

                <View style={{
                    width: '100%',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
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
                            marginRight: 20,
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

                <View style={{
                    width: '100%',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/list.png')} text={'Danh sách sản phẩm'} />
                    {
                        listProduct.map((item, index) => {
                            return (
                                <CheckoutItem item={item} />
                            )
                        })
                    }
                </View>

                <View style={{
                    width: '100%',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/luckystar.png')} text={'Điểm tích lũy'} />
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 5, paddingRight: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sao may mắn</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF9900' }}>{star}</Text>
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/voucher.png')} text={'Voucher giảm giá'} />
                    {
                        Object.values(voucher).length === 0 ? (null) : (
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
                                    }}>x{voucher.quantity}</Text>
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
                                        {voucher.title}
                                    </Text>
                                </View>
                            </View>
                        )
                    }

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            marginRight: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5,
                            borderRadius: 5,
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: '#C0C0C0',
                            backgroundColor: '#fff',
                        }}
                        onPress={() => {
                            navigation.navigate('MyVoucher');
                        }}>
                        <Image
                            source={require('../Images/add.png')}
                            style={{ width: 25, height: 25, marginRight: 5, tintColor: 'red' }} />
                        <Text style={{ color: 'red', fontSize: 15 }}>Chọn voucher</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    width: '100%',
                    padding: 15,
                    borderBottomWidth: 5,
                    borderBottomColor: '#DDDDDD',
                }}>
                    <CheckoutCart icon={require('../Images/paymethod.png')} text={'Thanh toán'} />
                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 80,
                            marginBottom: 10,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            backgroundColor: 'green',
                            borderRadius: 10,
                            padding: 10
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginTop: 5
                        }}>Thanh toán khi nhận hàng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setChoosePay(item.title)
                        }}
                        style={{
                            width: '90%',
                            height: 80,
                            marginBottom: 10,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            backgroundColor: 'green',
                            borderRadius: 10,
                            padding: 10
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginTop: 5
                        }}>Thanh toán khi nhận hàng</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Nut thanh toan */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 70,
                    flexDirection: 'row',
                }}>
                {
                    Object.values(voucher).length === 0 ? (
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
                    ) : (
                        <View style={{
                            width: '75%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: 15
                        }}>
                            <Text style={{ fontSize: 18 }}>Tổng thanh toán</Text>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'red' }}>₫{total - voucher.price}</Text>
                        </View>
                    )
                }

                {
                    Object.values(address).length === 0 ? (
                        <View
                            style={{
                                width: '25%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#CCCCCC',
                            }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Đặt hàng</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                handleSubmit();
                                navigation.navigate('Home');
                                database().ref('Cart/' + userID).remove();
                                database()
                                    .ref('User/' + userID)
                                    .update({
                                        myStar: starUser + star,
                                    })
                                    .then(() => console.log('Data updated.'));
                                if (Object.values(voucher).length !== 0) {
                                    var vouQunatity = voucher.quantity
                                    if (vouQunatity > 1) {
                                        database()
                                            .ref('Myvoucher/' + userID + '/' + voucher.id)
                                            .update({
                                                quantity: vouQunatity - 1,
                                            })
                                            .then(() => console.log('Data updated.'));
                                    }
                                    if (vouQunatity = 1) {
                                        database().ref('Myvoucher/' + userID + '/' + voucher.id).remove();
                                    }
                                }
                                setVoucher({});
                                setCheckout({});

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
                    )
                }
            </View>
        </>

    )
}

export default Checkout