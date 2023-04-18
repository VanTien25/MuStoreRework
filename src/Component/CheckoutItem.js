import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'

const CheckoutItem = ({ item }) => {
    return (
        <View
            key={item.id}
            style={{
                width: '100%', height: 100, alignItems: 'center',
                flexDirection: 'row', backgroundColor: '#fff',
                justifyContent: 'space-evenly'
            }}>
            <Image
                src={item.image}
                style={{ width: '40%', height: '85%', resizeMode: 'contain' }}
            />
            <ImageBackground
                source={require('../Images/star.png')}
                style={{ position: 'absolute', top: 5, left: 5, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}
            >
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
    )
}

export default CheckoutItem