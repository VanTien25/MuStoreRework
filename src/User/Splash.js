import { View, Image } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 3000);
    }, []);

    const getData = () => {
        navigation.navigate('Signin');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <Image
                source={require('../Images/playstore.png')}
                style={{ width: 500, height: 500, resizeMode: 'contain' }} />
        </View>
    )
}

export default Splash