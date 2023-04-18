import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';

const AddProductStep2 = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState();
    const [listSize, setListSize] = useState([]);
    console.log(route.params);

    const handleSubmit = () => {
        database()
            .ref('Product/' + route.params.id)
            .set({
                category: route.params.category,
                catID: route.params.idCat,
                image: route.params.image,
                title: route.params.title,
                price: route.params.price,
                star: route.params.star,
                desc: route.params.desc,
                size: listSize,
            })
            .then(() =>
                alert('Thêm thành công.'),
                navigation.goBack(),
                route.params.setSelectedCategory('Chọn loại sản phẩm'),
                route.params.setId(''),
                route.params.setTitle(''),
                route.params.setPrice(''),
                route.params.setImage(''),
                route.params.setStar(''),
                route.params.setDesc(''),
                route.params.setSelectedIDCategory(''),
            );
    }


    const deleteSize = (index) => {
        setListSize([
            ...listSize.slice(0, index),
            ...listSize.slice(index + 1)
        ]);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginBottom: 50 }}>
                <View style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: '#AA0000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Thêm sản phẩm</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 15,
                    }}>
                    <Image source={require('../Images/back.png')}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: 'yellow',
                        }} />
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center',
                    width: '100%', height: 60
                }}>
                    <TextInput
                        style={{
                            borderColor: '#8e8e8e',
                            width: '30%',
                            height: 50,
                            margin: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                        }}
                        onChangeText={(txt => setName(txt))}
                        value={name}
                        placeholder="nhập Size..."
                    />

                    <TextInput
                        style={{
                            borderColor: '#8e8e8e',
                            width: '30%',
                            height: 50,
                            margin: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                        }}
                        onChangeText={(txt => setQuantity(txt))}
                        keyboardType='numeric'
                        value={quantity}
                        placeholder="Nhập số lượng..."
                    />

                    {
                        name == '' || quantity == '' ?
                            (
                                <View
                                    style={{
                                        width: '15%',
                                        height: 50,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#8e8e8e',
                                        backgroundColor: 'gray',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ color: '#fff' }}>OK</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        setListSize([...listSize, { name, quantity }]),
                                            setName(''),
                                            setQuantity('')
                                    }}
                                    style={{
                                        width: '15%',
                                        height: 50,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#8e8e8e',
                                        backgroundColor: 'black',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ color: '#fff' }}>OK</Text>
                                </TouchableOpacity>
                            )
                    }
                </View>

                {
                    listSize.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: '90%',
                                    height: 50,
                                    borderBottomWidth: 3,
                                    borderBottomColor: '#DDDDDD',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: 'blue' }}>{index}</Text>
                                <Text>{item.name}</Text>
                                <Text>{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        deleteSize(index);
                                    }}
                                >
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }

            </ScrollView>

            {
                listSize.length === 0 ?
                    (
                        <View style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: 'grey',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Thêm</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                handleSubmit(route.params);
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: 'green',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 5,
                                borderTopLeftRadius: 5,
                            }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Thêm</Text>
                        </TouchableOpacity>
                    )
            }

        </View>
    )
}

export default AddProductStep2