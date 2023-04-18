import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';

const AddProduct = ({ navigation }) => {
    const [productInfo, setProductInfo] = useState('');
    const [listIDProduct, setListIDProduct] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Chọn loại sản phẩm')
    const [selectedIDCategory, setSelectedIDCategory] = useState('')
    const [isClicked, setIsClicked] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [star, setStar] = useState('');
    const [desc, setDesc] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [badSelect, setBadSelect] = useState(false)
    const [badId, setBadId] = useState(false);
    const [badTitle, setBadTitle] = useState(false);
    const [badPrice, setBadPrice] = useState(false);
    const [badImage, setBadImage] = useState(false);
    const [badStar, setBadStar] = useState(false);
    const [badDesc, setBadDesc] = useState(false);
    let idProduct = selectedIDCategory.concat(id);

    


    useEffect(() => {
        database()
            .ref('Category/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val();
                    arr.push({
                        name: item.name,
                        id: child.key,
                    });
                })
                setListCategory(arr);
            });
    }, [])

    useEffect(() => {
        database()
            .ref('Product/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val();
                    arr.push(child.key);
                })
                setListIDProduct(arr);
                console.log(arr);
            });
    }, [])


    const handleSubmit = ({ navigation }) => {
        setButtonDisabled(true);
        if (selectedCategory == 'Chọn loại sản phẩm') {
            setBadSelect(true);
            setButtonDisabled(false);
        } else {
            setBadSelect(false);
            if (id == '') {
                setBadId(true);
                setButtonDisabled(false);
            } else {
                setBadId(false);
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
                                    navigation.navigate('AddProductStep2', {
                                        category: selectedCategory,
                                        idCat: selectedIDCategory,
                                        id: idProduct,
                                        title: title,
                                        price: price,
                                        image: image,
                                        star: star,
                                        desc: desc,
                                        setSelectedCategory,
                                        setId,
                                        setTitle,
                                        setPrice,
                                        setImage,
                                        setStar,
                                        setDesc,
                                        setSelectedIDCategory,
                                    })
                                    setButtonDisabled(false)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const handleUpdateScreen = (idProduct) => {
        database()
            .ref('Product/' + idProduct)
            .on('value', snapshot => {
                setProductInfo(snapshot.val());
            });
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Thêm sản phẩm</Text>
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

            {/* DropDown */}
            <View style={{ marginBottom: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        setIsClicked(!isClicked);
                    }}
                    style={{
                        width: '90%',
                        height: 50,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#8e8e8e',
                        alignSelf: 'center',
                        mmarginTop: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}>
                    <Text>{selectedCategory}</Text>
                    {
                        isClicked ?
                            (<Image source={require('../Images/upload.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />) :
                            (<Image source={require('../Images/dropdown.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />)
                    }
                </TouchableOpacity>
                {
                    isClicked ?
                        <View style={{
                            width: '90%',
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            elevation: 5,
                            alignSelf: 'center',
                        }}>
                            {
                                listCategory.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setSelectedCategory(item.name);
                                                setSelectedIDCategory(item.id);
                                                setIsClicked(false);
                                            }}
                                            style={{
                                                width: '85%',
                                                height: 50,
                                                borderBottomWidth: 0.5,
                                                borderBottomColor: '#8e8e8e',
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        : null
                }
            </View>
            {
                badSelect === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy chọn loại sản phẩm</Text>
                )
            }

            <View style={{
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{ width: '20%', borderWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#8e8e8e' }}>
                    <Text style={{ fontWeight: 'bold' }}>{selectedIDCategory} +</Text>
                </View>
                <TextInput
                    style={{
                        borderColor: '#8e8e8e',
                        alignSelf: 'center',
                        width: '77%',
                        height: 50,
                        margin: 12,
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                    }}
                    onChangeText={(txt => setId(txt))}
                    value={id}
                    placeholder="Nhập mã sản phẩm..."
                />
            </View>
            {
                badId === true && (
                    <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập mã sản phẩm</Text>
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
                    if (listIDProduct.includes(idProduct)) {
                        Alert.alert('Thông báo', 'mã sản phẩm đã tồn tại.', [
                            {
                                text: 'Thoát',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                        ]);
                    } else {
                        handleSubmit({ navigation });
                    }

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

export default AddProduct