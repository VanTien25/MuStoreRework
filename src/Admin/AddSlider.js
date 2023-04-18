import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';

const AddSlider = ({ navigation }) => {
    const [image, setImage] = useState('');
    const [badImage, setBadImage] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = () => {
        setButtonDisabled(true);
        if (image == '') {
            setBadImage(true);
            setButtonDisabled(false);
        } else {
            setBadImage(false);
            handle();
        }
    }

    const handle = () => {
        database()
            .ref('Slider/')
            .push()
            .set({
                image: image,
            })
            .then(() =>
                alert('Thêm thành công'),
                setImage(''),
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
                }}>Thêm banner quảng cáo</Text>
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
                onChangeText={(txt => setImage(txt))}
                value={image}
                placeholder="Thêm hình ảnh..."
            />
            {
                badImage === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy thêm hình ảnh</Text>
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

export default AddSlider