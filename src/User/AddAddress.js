import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../Component/CustomTextInput';
import CustomButton from '../Component/CustomButton';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const AddAddress = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [homeInfo, setHomeInfo] = useState('');
    const [city, setCity] = useState('');
    const userID = firebase.auth().currentUser.uid;

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        marginLeft: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1.5,
                        padding: 7,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image
                        source={require('../Images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>
            <CustomTextInput
                placeholder={'Họ và tên'}
                value={name}
                onChangeText={txt => {
                    setName(txt);
                }}
                icon={require('../Images/name.png')}
            />
            <CustomTextInput
                placeholder={'Số điện thoại'}
                keyboardType={'number-pad'}
                value={phone}
                onChangeText={txt => {
                    setPhone(txt);
                }}
                icon={require('../Images/smartphone.png')}
            />
            <CustomTextInput
                placeholder={'Địa chỉ nhà'}
                value={homeInfo}
                onChangeText={txt => {
                    setHomeInfo(txt);
                }}
                icon={require('../Images/home.png')}
            />
            <CustomTextInput
                placeholder={'Tỉnh/Thành phố, Quận/Huyện'}
                value={city}
                onChangeText={txt => {
                    setCity(txt);
                }}
                icon={require('../Images/address.png')}
            />
            <CustomButton
                title={'Save Address'}
                bgColor={'#000'}
                textColor={'#fff'}
                onPress={() => {
                    if (name !== '' && phone !== '' && city !== '') {
                        database()
                            .ref('Address/' + userID)
                            .push()
                            .set({
                                name: name,
                                phone: phone,
                                home: homeInfo,
                                city: city,

                            })
                            .then(() =>
                                alert('Thêm thành công.'),
                                navigation.goBack()
                            );
                    }
                }}
            />
        </View>
    )
}

export default AddAddress