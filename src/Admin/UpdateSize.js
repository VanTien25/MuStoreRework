import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';

const UpdateSize = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState();
    const id = route.params.id;
    const [size, setSize] = useState(route.params.size);

    const handleSubmit = () => {
        database().ref('Product/' + id).update({ size: size }).then(() =>
            alert('Cập nhập thành công.'),
            navigation.goBack()
        );
    }

    const handleAddSize = () => {
        setSize([...size, { name, quantity }]),
            setName(''),
            setQuantity('')
    }

    const handleUpdateSize = () => {
        size[index].quantity = quantity;
        size[index].name = name;
        setName('');
        setQuantity('');
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: '100%',
                height: 60,
                backgroundColor: '#AA0000',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Sửa Size</Text>
            </View>
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
                style={{ position: 'absolute', top: 10, left: 15 }}>
                <Image
                    source={require('../Images/back.png')}
                    style={{ width: 40, height: 40, tintColor: 'yellow' }} />
            </TouchableOpacity>

            <ScrollView style={{ flex: 1, marginBottom: 50, marginTop: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', margin: 10 }}>
                    <TextInput
                        onChangeText={(txt => setName(txt))}
                        value={name}
                        placeholder="Nhập Size..."
                        style={{
                            borderColor: '#8e8e8e',
                            width: '35%',
                            height: 50,
                            borderWidth: 1,
                            padding: 10,
                        }} />

                    <TextInput
                        onChangeText={(txt => setQuantity(txt))}
                        value={quantity}
                        keyboardType='numeric'
                        placeholder="Nhập số lượng..."
                        style={{
                            borderColor: '#8e8e8e',
                            width: '35%',
                            height: 50,
                            borderWidth: 1,
                            padding: 10,
                        }} />

                    {
                        name == '' || quantity == '' ?
                            (
                                <View
                                    style={{
                                        width: '15%',
                                        height: 50,
                                        backgroundColor: 'gray',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ color: '#fff' }}>OK</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        index = size.findIndex(item => {
                                            if (item.name === name) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        })

                                        if (index !== -1) {
                                            handleUpdateSize();
                                        } else {
                                            handleAddSize();
                                        }
                                    }}
                                    style={{
                                        width: '15%',
                                        height: 50,
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
                    size.map((item, index) => {
                        return (
                            <View
                                key={item.name}
                                style={{
                                    width: '94%',
                                    height: 50,
                                    borderBottomWidth: 3,
                                    borderBottomColor: '#DDDDDD',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: 'blue' }}>{index + 1}</Text>
                                <Text>{item.name}</Text>
                                <Text>{item.quantity}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            setSize([
                                                ...size.slice(0, index),
                                                ...size.slice(index + 1)
                                            ])
                                        }}>
                                        <Image
                                            source={require('../Images/close.png')}
                                            style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            marginLeft: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            setName(item.name);
                                            setQuantity(item.quantity);
                                        }}>
                                        <Image
                                            source={require('../Images/update.png')}
                                            style={{ width: 30, height: 30 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>

            {
                size.length === 0 ?
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
                                handleSubmit();
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

export default UpdateSize