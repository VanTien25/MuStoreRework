import { View, Text, Image } from 'react-native'
import React from 'react'

const CheckoutCart = ({ icon, text }) => {
    return (
        <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
            <Image
                source={icon}
                style={{
                    width: 30,
                    height: 30,
                    tintColor: '#00AA00',
                    marginRight: 10,
                }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00AA00' }}>{text}</Text>
        </View>
    )
}

export default CheckoutCart