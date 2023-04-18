import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Search = () => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                position: 'absolute',
                top: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SearchProduct')
                }}
                style={{
                    width: '70%',
                    height: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginLeft: 15
                }}>
                <Text style={{ color: 'red', marginLeft: 20, fontSize: 15 }}>Bạn muốn tìm gì?</Text>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image source={require('../Images/search.png')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: '#222222'
                        }} />
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('OrderCustom')
                }}
                style={{
                    width: '20%',
                    height: 40,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image source={require('../Images/note.png')}
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#fff'
                    }} />
            </TouchableOpacity>
        </View>

    )
}

export default Search
