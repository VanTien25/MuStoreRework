import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({ value, onChangeText, placeholder, icon, type, keyboardType }) => {
    return (
        <View style={{
            width: '85%', height: 50, borderRadius: 10,
            alignSelf: 'center', marginTop: 20, flexDirection: 'row',
            alignItems: 'center', paddingLeft: 20, paddingRight: 20,
            backgroundColor: '#fff'
        }}>
            <Image source={icon} style={{ width: 24, height: 24 }} />
            <TextInput
                value={value}
                keyboardType={keyboardType ? keyboardType : 'default'}
                onChangeText={txt => {
                    onChangeText(txt);
                }}
                placeholder={placeholder}
                placeholderTextColor={'black'}
                secureTextEntry={type ? true : false}
                style={{ marginLeft: 10, color: 'black' }}
            />
        </View>
    )
}

export default CustomTextInput