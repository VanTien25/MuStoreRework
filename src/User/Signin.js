import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../Component/CustomTextInput'
import CustomButton from '../Component/CustomButton'
import Loader from '../Component/Loader'
import auth from '@react-native-firebase/auth';

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    const [badPassword, setBadPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const signin = () => {
        setModalVisible(true);
        if (email == '') {
            setModalVisible(false);
            setBadEmail(true);
        } else {
            setBadEmail(false);
            if (password == '') {
                setModalVisible(false);
                setBadPassword(true);
            } else {
                setBadPassword(false);
                setTimeout(() => {
                    setBadPassword(false);
                    auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(() => {
                            if (email === 'admin@gmail.com') {
                                setModalVisible(false);
                                Alert.alert('Đăng nhập thành công!');
                                navigation.navigate("Ad");
                            } else {
                                setModalVisible(false);
                                Alert.alert('Đăng nhập thành công!');
                                navigation.navigate("Main");
                            }
                        }).catch(() => {
                            setModalVisible(false);
                            Alert.alert('Đăng nhập không thành công!');
                        });
                }, 2000);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#BB0000' }}>
            <Image
                source={require('../Images/playstore.png')}
                style={{ width: 130, height: 130, alignSelf: 'center', marginTop: 10, borderRadius: 100 }}
            />

            <Text style={{ marginTop: 10, alignSelf: 'center', fontSize: 24, fontWeight: '800', color: '#fff' }}>
                Đăng nhập
            </Text>
            <CustomTextInput
                autoFocus={true}
                placeholder={'Nhập email...'}
                icon={require('../Images/email.png')}
                value={email}
                onChangeText={txt => {
                    setEmail(txt);
                }}
            />

            {
                badEmail === true && (
                    <Text style={{ marginTop: 10, marginLeft: 30, color: 'yellow', fontWeight: 'bold' }}>Hãy nhập email</Text>
                )
            }

            <CustomTextInput
                type={'password'}
                placeholder={'Nhập password...'}
                icon={require('../Images/lock.png')}
                value={password}
                onChangeText={txt => {
                    setPassword(txt);
                }}
            />

            {
                badPassword === true && (
                    <Text style={{ marginTop: 10, marginLeft: 30, color: 'yellow', fontWeight: 'bold' }}>Hãy nhập mật khẩu</Text>
                )
            }

            <Text
                style={{
                    fontSize: 16,
                    alignSelf: 'flex-end',
                    marginRight: 40,
                    marginTop: 20,
                    textDecorationLine: 'underline'
                }}>
                Nhớ mật khẩu
            </Text>

            <CustomButton
                title={'Login'}
                bgColor={'#000'}
                textColor={'#fff'}
                onPress={() => {
                    signin();
                }}
            />

            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '800',
                    alignSelf: 'center',
                    marginTop: 20,
                    textDecorationLine: 'underline'
                }}
                onPress={() => {
                    navigation.navigate('Signup');
                }}>
                Tạo tài khoản mới
            </Text>
            <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    )
}

export default Signin