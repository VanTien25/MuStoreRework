import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

const CategoryCart = ({ item, navigation }) => {

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Detail',
                    {
                        id: item.id,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        category: item.category,
                        size: item.size,
                        star: item.star,
                        desc: item.desc,
                    })
            }}
            style={{
                width: '94%',
                height: 100,
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                elevation: 5,
                borderRadius: 10,
                backgroundColor: '#fff',
                marginBottom: 10
            }}
        >
            <Image
                src={item.image}
                style={{
                    width: '52%',
                    height: '100%',
                    resizeMode: 'contain',
                }}
            />

            <ImageBackground
                source={require('../Images/star.png')}
                style={{
                    width: 45,
                    height: 45,
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>{item.star}</Text>
            </ImageBackground>

            <View
                style={{
                    width: '52%',
                    height: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.id}</Text>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
                    {
                        item.title.length > 15
                            ? item.title.substring(0, 15) + '...'
                            : item.title
                    }
                </Text>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>{item.price} VND</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCart