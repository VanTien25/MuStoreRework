import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import database, { firebase } from '@react-native-firebase/database';

const Detail = ({ navigation, route }) => {
    const [type, setType] = useState('');
    let [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(route.params.size);
    const userID = firebase.auth().currentUser.uid;
    const total = size.reduce((accumulator, current) => accumulator + current.quantity, 0);
    const [listCart, setListCart] = useState([]);
    const idProduct = route.params.id;

    const subtraction = () => {
        setQuantity(quantity - 1);
    }

    const addition = () => {
        setQuantity(quantity + 1);
    }

    useEffect(() => {
        database()
            .ref('Cart/' + userID)
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val();
                    arr.push({
                        idCart: child.key,
                        productID: item.id,
                        size: item.size,
                        quantity: item.quantity,
                    })
                })
                setListCart(arr);
            });
    }, [])

    const onUpdateCart = (x) => {
        const total = x.quantity + quantity;
        database()
            .ref('Cart/' + userID + '/' + x.idCart)
            .update({
                quantity: total,
            })
            .then(() => console.log('Data updated.'));
        navigation.navigate('Cart');
    }

    const onAddToCart = () => {
        database()
            .ref('Cart/' + userID)
            .push()
            .set({
                id: route.params.id,
                category: route.params.category,
                image: route.params.image,
                idCat: route.params.idCat,
                title: route.params.title,
                price: route.params.price,
                star: route.params.star,
                desc: route.params.desc,
                size: type,
                quantity: quantity,
            })
            .then(() => alert('Thêm vào giỏ hàng thành công'));
        navigation.navigate('Cart');
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Image
                    src={route.params.image}
                    style={{
                        width: '100%',
                        height: 230,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                    }}
                />

                <TouchableOpacity
                    style={{
                        width: 50,
                        elevation: 5,
                        height: 50,
                        backgroundColor: '#999999',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 10,
                        left: 10,
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require('../Images/back.png')}
                        style={{ width: 24, height: 24, }}
                    />
                </TouchableOpacity>

                <ImageBackground
                    source={require('../Images/star.png')}
                    style={{
                        width: 60,
                        height: 60,
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 18 }}>{route.params.star}</Text>
                </ImageBackground>

                {/* Title */}
                <Text
                    style={{
                        fontSize: 20,
                        color: 'black',
                        marginLeft: 15,
                        textAlign: 'left',
                        marginTop: 15,
                        marginBottom: 15,
                    }}>
                    {route.params.title}
                </Text>


                {/* Price */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 15,
                            color: 'red',
                            textAlign: 'left',
                        }}>
                        {route.params.price} VNĐ
                    </Text>

                    <Text
                        style={{
                            fontSize: 18,
                            marginRight: 15,
                            textAlign: 'left',
                        }}>
                        SL: {total}
                    </Text>
                </View>


                <View style={{ height: 1, borderWidth: 0.65, borderColor: '#BBBBBB', marginTop: 10, marginBottom: 10 }} />

                {/* Size */}
                <View style={{
                    height: 80, flexDirection: 'row',
                    alignItems: 'center', padding: 15
                }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Size: </Text>
                    <FlatList
                        data={size}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.name}
                        renderItem={({ item, index }) => {
                            if (item.quantity <= 0) {
                                return (
                                    <View
                                        key={item.name}
                                        style={{
                                            width: 60,
                                            height: 40,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            marginLeft: 15,
                                            backgroundColor: '#CCCCCC'
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
                                    </View>
                                );
                            } else {
                                return (
                                    <TouchableOpacity
                                        key={item.name}
                                        onPress={() => setType(item.name)}
                                        style={type === item.name ? {
                                            width: 60,
                                            height: 40,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            marginLeft: 15,
                                            backgroundColor: '#009900'
                                        } : {
                                            width: 60,
                                            height: 40,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            marginLeft: 15,
                                            backgroundColor: '#BB0000'
                                        }}>
                                        <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }
                        }}
                    />
                </View>

                <View style={{ height: 1, borderWidth: 0.5, borderColor: '#BBBBBB', marginTop: 5, marginBottom: 10 }} />

                {/* Quantity */}
                <View style={{
                    height: 80,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 15,
                }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Số Lượng: </Text>

                    <View style={{
                        width: 130, height: '100%', borderRadius: 8, backgroundColor: '#DDDDDD',
                        flexDirection: 'row', padding: 10, borderWidth: 1.5,
                        justifyContent: 'center', alignItems: 'center', borderColor: '#BBBBBB'
                    }}>
                        {
                            quantity <= 1 ? (
                                <View
                                    onPress={() => {
                                        subtraction();
                                    }}
                                    style={{
                                        width: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        source={require('../Images/sub.png')}
                                        style={{ width: 26, height: 26, tintColor: '#CCCCCC' }} />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        subtraction();
                                    }}
                                    style={{
                                        width: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                    <Image
                                        source={require('../Images/sub.png')}
                                        style={{ width: 26, height: 26 }} />
                                </TouchableOpacity>
                            )
                        }
                        <View style={{
                            width: 50,
                            height: '100%',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{quantity}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                addition();
                            }}
                            style={{
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                source={require('../Images/add.png')}
                                style={{ width: 26, height: 26 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 1, borderWidth: 0.5, borderColor: '#BBBBBB', marginTop: 5, marginBottom: 10 }} />

                {/* Desc */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'black',
                            margin: 15
                        }}>Mô tả</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'black',
                            margin: 15
                        }}>
                        {route.params.desc}
                    </Text>
                </View>

            </ScrollView>

            {/* Button Add Detail */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    alignItems: 'center',
                    height: '7%',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    elevation: 5,
                }}>
                {
                    type == '' ?
                        (<View
                            style={{
                                width: '75%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#DDDDDD'
                            }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Thêm vào giỏ hàng</Text>
                        </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    const Obj = listCart.find(element => {
                                        if (element.productID === idProduct && element.size === type) {
                                            return true;
                                        }

                                        return false;
                                    });

                                    if (Obj !== undefined) {
                                        onUpdateCart(Obj);
                                    } else {
                                        onAddToCart();
                                    }


                                }}
                                style={{
                                    width: '75%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#AA0000'
                                }}>
                                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        )
                }
                <TouchableOpacity
                    style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}>
                    <Image
                        source={require('../Images/like.png')}
                        style={{
                            width: 24,
                            height: 24,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Detail