import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Swipeable } from 'react-native-gesture-handler';

const ItemCart = ({ item, onDelete, onUpdate, onDetailProduct }) => {

    const leftSwipe = () => {
        return (
            <View style={{ width: '50%', backgroundColor: '#fff', height: 100, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {
                        onDelete(item.id)
                    }}
                    style={{
                        width: '50%',
                        height: 100,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        style={{ width: 30, height: 30, tintColor: '#fff' }}
                        source={require('../Images/delete.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onUpdate(item);
                    }}
                    style={{
                        width: '50%',
                        height: 100,
                        backgroundColor: 'green',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image style={{
                        width: 30,
                        height: 30,
                        tintColor: '#fff',
                    }}
                        source={require('../Images/edit.png')} />
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <Swipeable
            renderLeftActions={leftSwipe}>
            <TouchableOpacity
                onPress={() => {
                    onDetailProduct(item);
                }}
                style={{
                    width: '100%',
                    height: 100,
                    flexDirection: 'row',
                    borderBottomWidth: 3,
                    borderBottomColor: '#DDDDDD',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                }}>
                <Image src={item.image}
                    style={{
                        width: '25%',
                        height: '90%',
                        resizeMode: 'contain',
                    }} />

                <View style={{ width: '75%', height: '100%', justifyContent: 'space-evenly', alignItems: 'flex-start', marginLeft: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mã:   {item.id}</Text>
                    <Text style={{ fontSize: 18, }}>Tiêu đề:   {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>

    )
}

export default ItemCart