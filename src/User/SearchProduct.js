import { View, Text, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import database from '@react-native-firebase/database';
import CategoryCart from '../common/CategoryCart';
import { FlatList } from 'react-native';

const SearchProduct = () => {
    const navigation = useNavigation();
    const [listSearch, setListSearch] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        database()
            .ref('Products/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(childSnapshot => {
                    var item = childSnapshot.val();
                    arr.push({
                        id: childSnapshot.key,
                        category: item.category,
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        size: item.size,
                        star: item.star,
                        desc: item.desc,
                    })
                })
                setListSearch(arr);
            });
    }, []);

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
                    {/* <Text style={{fontSize: 16, color: 'red'}}>back</Text> */}
                    <Image
                        source={require('../images/back.png')}
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
                    <Image source={require('../images/search.png')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: '#AA0000'
                        }} />
                    <TextInput
                        maxLength={20}
                        onChangeText={text => setInput(text)}
                        value={input}
                        placeholder='Bạn muốn tìm gì?'
                        style={{
                            width: '85%',
                            height: '90%',
                        }} />
                </View>
            </View>

            <FlatList
                data={listSearch}
                renderItem={({ item, index }) => {
                    if (input === "") {
                        return (<CategoryCart item={item} />)
                    }
                    if (item.title.toLowerCase().includes(input.toLowerCase())) {
                        return (<CategoryCart item={item} />)
                    }
                }}
            />
        </View>
    )
}

export default SearchProduct