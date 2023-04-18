import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Header = ({navigation, text}) => {
    return (
        <View>
            <View style={{ width: '100%', height: 50, backgroundColor: '#AA0000', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'yellow', fontSize: 18 }}>{text}</Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                }}>
                <Image
                    source={require('../Images/back.png')}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: 'yellow'
                    }} />
            </TouchableOpacity>
        </View>
    )
}

export default Header