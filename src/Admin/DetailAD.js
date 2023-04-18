import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const DetailAD = ({ route, navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Image
                    src={route.params.image}
                    style={{
                        width: '100%',
                        height: 250,
                        resizeMode: 'contain',
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                    }} />

                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        position: 'absolute',
                        top: 15,
                        left: 20,
                        backgroundColor: '#fff',
                        borderRadius: 10
                    }}>
                    <Image
                        source={require('../Images/back.png')}
                        style={{ width: 45, height: 45, tintColor: '#888888' }} />
                </TouchableOpacity>

                <View style={{ paddingTop: 10, paddingLeft: 15 }}>
                    <Text style={{ marginBottom: 10, fontSize: 20 }}>Tên loại sản phẩm:   {route.params.category}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 20 }}>Tên sản phẩm:   {route.params.title.length > 15 ? route.params.title.substring(0, 15) + '...' : route.params.title}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: 'red' }}>Giá:   {route.params.price}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: '#FFCC00', textAlign: 'left' }}>Sao:   {route.params.star}</Text>
                </View>

                <View style={{
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 3,
                    paddingBottom: 15,
                    marginBottom: 15,
                }}>
                    <Text style={{ fontSize: 20, color: 'black', marginLeft: 15, }}>Mô tả</Text>
                    <View style={{
                        width: '94%',
                        marginTop: 10,
                        borderRadius: 10,
                        alignSelf: 'center',
                        padding: 15,
                        backgroundColor: '#fff',
                    }}>
                        <Text style={{ fontSize: 18 }}>{route.params.desc}</Text>
                    </View>
                </View>

                <Text style={{ fontSize: 20, color: 'black', marginLeft: 15, marginBottom: 15 }}>Size</Text>
                <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    paddingTop: 10,
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, color: 'red', width: '30%', textAlign: 'center' }}>Tên</Text>
                        <Text style={{ fontSize: 20, color: 'red', width: '30%', textAlign: 'center' }}>Số lượng</Text>
                        <Text style={{ fontSize: 20, color: 'red', width: '30%', textAlign: 'center' }}>Đã bán</Text>
                    </View>
                    {
                        route.params.size.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        padding: 15,
                                        alignSelf: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, width: '23%', textAlign: 'center' }}>{item.name}</Text>
                                    <Text style={{ fontSize: 16, width: '23%', textAlign: 'center' }}>{item.quantity}</Text>
                                    <Text style={{ fontSize: 16, width: '23%', textAlign: 'center' }}>DB</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailAD