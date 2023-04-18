import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';

const UpdateProduct = ({ route, navigation }) => {
    const id = route.params.id;
    const [title, setTitle] = useState(route.params.title);
    const [price, setPrice] = useState(route.params.price);
    const [image, setImage] = useState(route.params.image);
    const [star, setStar] = useState(route.params.star);
    const [desc, setDesc] = useState(route.params.desc);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [badTitle, setBadTitle] = useState(false);
    const [badPrice, setBadPrice] = useState(false);
    const [badImage, setBadImage] = useState(false);
    const [badStar, setBadStar] = useState(false);
    const [badDesc, setBadDesc] = useState(false);

    const handleSubmit = () => {
        setButtonDisabled(true);
        if (title == '') {
            setBadTitle(true);
            setButtonDisabled(false);
        } else {
            setBadTitle(false);
            if (price == '') {
                setBadPrice(true);
                setButtonDisabled(false);
            } else {
                setBadPrice(false);
                if (image == '') {
                    setBadImage(true);
                    setButtonDisabled(false);
                } else {
                    setBadImage(false);
                    if (star == '') {
                        setBadStar(true);
                        setButtonDisabled(false);
                    } else {
                        setBadStar(false);
                        if (desc == '') {
                            setBadDesc(true);
                            setButtonDisabled(false);
                        } else {
                            setBadDesc(false);
                            database()
                                .ref('Product/' + id)
                                .update({
                                    title: title,
                                    price: price,
                                    image: image,
                                    star: star,
                                    desc: desc
                                })
                                .then(() =>
                                    alert('Cập nhập thành công.'),
                                    navigation.goBack()
                                );
                        }
                    }
                }
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: '100%',
                height: 60,
                backgroundColor: '#AA0000',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Sửa sản phẩm</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 15,
                }}>
                <Image source={require('../Images/back.png')}
                    style={{
                        width: 40,
                        height: 40,
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
                placeholder="Nhập tiêu đề sản phẩm..."
            />
            {
                badTitle === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập tiêu đề sản phẩm</Text>
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
                keyboardType={'numeric'}
                onChangeText={(txt => setPrice(txt))}
                value={price}
                placeholder="Nhập giá..."
            />
            {
                badPrice === true && (
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
                onChangeText={(txt => setImage(txt))}
                value={image}
                placeholder="Nhập nguồn hình ảnh..."
            />
            {
                badImage === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập hình ảnh</Text>
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
                keyboardType={'numeric'}
                onChangeText={(txt => setStar(txt))}
                value={star}
                placeholder="Nhập số sao..."
            />
            {
                badStar === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập sao</Text>
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
                onChangeText={(txt => setDesc(txt))}
                value={desc}
                placeholder="Nhập mô tả..."
            />
            {
                badDesc === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập mô tả</Text>
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
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    borderRadius: 20,
                    marginBottom: 15
                }}>
                <Text style={{ color: '#fff' }}>Tiếp</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateProduct