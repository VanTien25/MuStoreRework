import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const ProductCart = ({ item, goToDetail }) => {
    const userID = firebase.auth().currentUser.uid;

    return (
        <TouchableOpacity
            onPress={() => {
                goToDetail(item);
            }}
            style={{
                borderRadius: 10,
                elevation: 5,
                width: '45%',
                height: 220,
                justifyContent: 'center',
                backgroundColor: '#fff',
                marginBottom: 10,
            }}>
            <Image
                src={item.image}
                style={{ width: '100%', height: 120, resizeMode: 'contain' }} />

            <Text
                style={{
                    marginTop: 20,
                    marginLeft: 10,
                    fontSize: 14,
                    color: 'black',
                    fontWeight: '600',
                }}>
                {
                    item.title.length > 18
                        ? item.title.substring(0, 18) + '...'
                        : item.title
                }
            </Text>

            <Text
                style={{
                    marginTop: 10,
                    fontSize: 18,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                {item.price + ' VND'}
            </Text>

            <TouchableOpacity
                onPress={() => {
                    database().ref('Wishlist/' + userID).push().set({
                        id: item.id,
                        category: item.category,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        size: item.size,
                        star: item.star,
                        desc: item.desc,
                    })
                        .then(() => alert('Đã thêm vào mục yêu thích.'));
                }}
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'red',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 10,
                    right: 10,
                }}>
                <Image
                    source={require('../Images/heart.png')}
                    style={{ width: 24, height: 24, tintColor: '#fff' }}
                />
            </TouchableOpacity>

            <ImageBackground
                source={require('../Images/star.png')}
                style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 10,
                    left: 10,
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: 'red'
                }}>{item.star}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default ProductCart