import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';

const UpdateIDProduct = ({ route, navigation }) => {
  const [listIDProduct, setListIDProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(route.params.category);
  const [selectedIDCategory, setSelectedIDCategory] = useState(route.params.idCat)
  const [isClicked, setIsClicked] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [badId, setBadId] = useState(false);
  let idProduct = route.params.id;
  const [id, setID] = useState(idProduct.slice(selectedIDCategory.length));

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
      });
  }, [])

  const handleSubmit = ({ navigation }) => {
    setButtonDisabled(true);
    if (id == '') {
      setBadId(true);
      setButtonDisabled(false);
    } else {
      setBadId(false);
      database()
        .ref('Product/' + idProduct)
        .update({
          
        })
        .then(() => console.log('Data updated.'));
      console.log(selectedIDCategory.concat(id));

      setButtonDisabled(false)
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
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Cập nhập mã sản phẩm</Text>
      </View>
      <TouchableOpacity
        onPress={() => { navigation.goBack() }}
        style={{ position: 'absolute', top: 10, left: 15 }}>
        <Image
          source={require('../Images/back.png')}
          style={{ width: 40, height: 40, tintColor: 'yellow' }} />
      </TouchableOpacity>

      {/* DropDown */}
      <View style={{ marginBottom: 10, marginTop: 10 }}>
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
                style={{ width: 20, height: 20, }} />)
              :
              (<Image source={require('../Images/dropdown.png')}
                style={{ width: 20, height: 20, }} />)
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
          onChangeText={(txt => setID(txt))}
          value={id}
          placeholder="Nhập mã sản phẩm..."
        />
      </View>
      {
        badId === true && (
          <Text style={{ marginTop: 10, marginLeft: 20, color: 'red' }}>Hãy nhập mã sản phẩm</Text>
        )
      }

      <TouchableOpacity
        onPress={() => {
          if (listIDProduct.includes(selectedIDCategory.concat(id))) {
            Alert.alert('Thông báo', 'mã sản phẩm đã tồn tại.');
            setButtonDisabled(false)
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

export default UpdateIDProduct