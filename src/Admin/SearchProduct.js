import { View, Text, TouchableOpacity, Image, TextInput, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';
import CategoryCart from '../Component/CategoryCart';

const SearchProduct = ({ navigation }) => {
    const [listProduct, setListProduct] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        database()
            .ref('Product/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val();
                    arr.push({
                        id: child.key,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        desc: item.desc,
                        size: item.size,
                        star: item.star,
                        category: item.category,
                    })
                })
                setListProduct(arr);
            });
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#AA0000',
                    borderBottomWidth: 3,
                    borderBottomColor: '#DDDDDD',
                    marginBottom: 10,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require('../Images/back.png')}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: '#fff',
                        }} />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: '#AA0000',
                        backgroundColor: '#fff',
                        paddingLeft: 10,
                        width: '85%',
                        height: '70%',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderRadius: 5
                    }}>
                    <Image source={require('../Images/search.png')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: '#AA0000'
                        }} />
                    <TextInput
                        maxLength={20}
                        onChangeText={text => setInput(text)}
                        value={input}
                        placeholder='Nhập mã sản phẩm hoặc tên sản phẩm.'
                        style={{
                            width: '85%',
                            height: '90%',
                        }} />
                </View>
            </View>

            <FlatList
                data={listProduct}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    if (input === "") {
                        return (<CategoryCart item={item} />)
                    }
                    if (item.title.toLowerCase().includes(input.toLowerCase()) || item.id.toLowerCase().includes(input.toLowerCase())) {
                        return (<CategoryCart item={item} />)
                    }
                }}
            />
        </View>
    )
}

export default SearchProduct