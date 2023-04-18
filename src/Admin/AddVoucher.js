import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';

const AddVoucher = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [coin, setCoin] = useState('');
    const [price, setPrice] = useState('');
    const [value, setValue] = useState('');
    const [badTitle, setBadTitle] = useState(false);
    const [badCoin, setBadCoin] = useState(false);
    const [badPrice, setBadPrice] = useState(false);
    const [badValue, setBadValue] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = () => {
        setButtonDisabled(true);
        if (title == '') {
            setBadTitle(true);
            setButtonDisabled(false);
        } else {
            setBadTitle(false);
            if (coin == '') {
                setBadCoin(true);
                setButtonDisabled(false);
            } else {
                setBadCoin(false);
                if (price == '') {
                    setBadPrice(true);
                    setButtonDisabled(false);
                } else {
                    setBadPrice(false);
                    if (value == '') {
                        setBadValue(true);
                        setButtonDisabled(false);
                    } else {
                        setBadValue(false);
                        handle();
                    }
                }
            }
        }
    }


    const handle = () => {
        database()
            .ref('Voucher/')
            .push()
            .set({
                title: title,
                coin: coin,
                price: price,
                value: value,
            })
            .then(() =>
                alert('Thêm voucher thành công.'),
                setTitle(''),
                setCoin(''),
                setPrice(''),
                setValue(''),
                setButtonDisabled(false),
            );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: '100%',
                height: 60,
                backgroundColor: '#AA0000',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'yellow',
                }}>Thêm voucher giảm giá</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();;
                }}
                style={{
                    position: 'absolute',
                    top: 15,
                    left: 15,
                }}>
                <Image
                    source={require('../Images/back.png')}
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: 'yellow',
                    }} />
            </TouchableOpacity>
            <TextInput
                style={{
                    borderColor: '#8e8e8e',
                    alignSelf: 'center',
                    width: '90%',
                    height: 50,
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                }}
                onChangeText={(txt => setTitle(txt))}
                value={title}
                placeholder="Nhập tiêu đề voucher..."
            />
            {
                badTitle === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập tiêu đề voucher</Text>
                )
            }

            <TextInput
                style={{
                    borderColor: '#8e8e8e',
                    alignSelf: 'center',
                    width: '90%',
                    height: 50,
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                }}
                onChangeText={(txt => setCoin(txt))}
                keyboardType='numeric'
                value={coin}
                placeholder="Nhập giá..."
            />
            {
                badCoin === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập giá</Text>
                )
            }

            <TextInput
                style={{
                    borderColor: '#8e8e8e',
                    alignSelf: 'center',
                    width: '90%',
                    height: 50,
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                }}
                onChangeText={(txt => setValue(txt))}
                keyboardType='numeric'
                value={value}
                placeholder="Nhập giá trị voucher..."
            />
            {
                badValue === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập giá trị voucher</Text>
                )
            }

            <TextInput
                style={{
                    borderColor: '#8e8e8e',
                    alignSelf: 'center',
                    width: '90%',
                    height: 50,
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                }}
                onChangeText={(txt => setPrice(txt))}
                value={price}
                placeholder="Nhập giá khuyến mãi..."
            />
            {
                badPrice === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập giá khuyến mãi</Text>
                )
            }

            <TouchableOpacity
                onPress={() => {
                    handleSubmit();
                }}
                disabled={buttonDisabled}
                style={{
                    width: '90%',
                    height: 50,
                    backgroundColor: 'black',
                    borderRadius: 5,
                    marginTop: 15,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{ color: '#fff' }}>Thêm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddVoucher