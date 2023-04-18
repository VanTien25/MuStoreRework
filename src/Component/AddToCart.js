import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';


const AddToCart = ({ item, navigation }) => {

    const leftSwipe = () => {
        return (
            <View
                style={{
                    width: '100%', height: 100, borderBottomWidth: 3,
                    backgroundColor: 'red', borderBottomColor: '#DDDDDD',
                    justifyContent: 'center', alignItems: 'center',
                }}>
                <Image
                    source={require('../Images/recyclebin.png')}
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: '#fff',
                    }} />
            </View>
        )
    };

    const onComponentOpen = (idPro) => {
        database().ref('Cart/' + idUser + '/' + idPro).remove();
        alert('Xóa thành công.');
    }


    return (
        <Swipeable
            renderLeftActions={leftSwipe}
            onSwipeableOpen={() => {
                onComponentOpen(item.id);
            }}>
            <View style={{
                width: '100%', height: 100, borderBottomWidth: 3,
                flexDirection: 'row', backgroundColor: '#fff', borderBottomColor: '#DDDDDD',
                justifyContent: 'space-between', alignItems: 'center',
            }}>
                <Image
                    src={item.image}
                    style={{ width: '40%', height: '85%', resizeMode: 'contain' }} />
                <ImageBackground
                    source={require('../Images/star.png')}
                    style={{ position: 'absolute', top: 5, left: 5, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 14 }}>{item.star}</Text>
                </ImageBackground>

                <View style={{
                    width: '60%',
                    height: '100%',
                    justifyContent: 'space-between',
                    padding: 10
                }}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                        {
                            item.title.length > 15
                                ? item.title.substring(0, 15) + '...'
                                : item.title
                        }
                    </Text>
                    <Text style={{ color: 'black', fontSize: 18 }}>Size: {item.size}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>{item.price} VNĐ</Text>
                        <Text style={{ color: 'black', fontSize: 18 }}>x{item.quantity}</Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    )
}

export default AddToCart