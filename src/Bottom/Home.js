import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ProductCart from '../Component/ProductCart';
import Search from '../Component/Search';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

// const { width: screenWidth } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [listProduct, setListProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [img, setImg] = useState([]);
  // const stepAutoImg = useRef(null);

  useEffect(() => {


    database()
      .ref('Product/')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            idCat: item.idCategory,
            category: item.category,
            title: item.title,
            price: item.price,
            image: item.image,
            star: item.star,
            desc: item.desc,
            size: item.size,
          })
        })
        setListProduct(arr);
        // console.log(arr);
      });
  }, [])

  useEffect(() => {
    database()
      .ref('Category/')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            title: item.name,
            image: item.image,
          })
        })
        setListCategory(arr);
      });
  }, [])


  // useEffect(() => {
  //   database().ref('Slider/').on('value', (snapshot) => {
  //     let arr = [];
  //     snapshot.forEach(child => {
  //       var item = child.val();
  //       arr.push({
  //         id: child.key,
  //         image: item.image
  //       });
  //     });
  //     setImg(arr);
  //   });
  // }, [])

  // useEffect(() => {
  //   if (img.length > 0) {
  //     let index = 0;
  //     setInterval(() => {
  //       stepAutoImg.current.scrollTo({ x: index * screenWidth, y: 0, animated: true });
  //       index += 1;
  //       if (index === img.length) {
  //         index = 0;
  //       }
  //     }, 3000);
  //   }
  // }, [])

  return (
    <>
      <View style={{ flex: 1 }}>

        {/* Banner */}
        {/* <View style={{ width: '100%', height: '25%', alignSelf: 'center' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: screenWidth * img.length, height: '100%' }}
            ref={stepAutoImg}
            scrollEventThrottle={16}
          >
            {
              img.map((item, index) => {
                console.log(item.image);
                return (
                  <Image
                    key={index}
                    src={item.image}
                    resizeMode='stretch'
                    style={{
                      width: screenWidth,
                      height: '100%',
                    }} />
                )
              })
            }
          </ScrollView>
        </View> */}

        {/* List Button Category */}
        <View style={{ width: '100%', height: 60, marginTop: 10, backgroundColor: '#DDDDDD', flexDirection: 'row' }}>
          <FlatList
            data={listCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Category', {
                      name: item.name,
                      listProduct
                    });
                  }}
                  style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 10, backgroundColor: '#fff', marginLeft: 18, borderRadius: 100 }}>
                  <Image
                    src={item.image}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </TouchableOpacity>
              )
            }}
          />
        </View>

        {/* List San Pham */}
        <View style={{ backgroundColor: '#AA0000', width: '100%', height: 30, marginTop: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Danh sách sản phẩm</Text>
        </View>
        <View style={{ marginTop: 10, paddingBottom: 110 }}>
          <FlatList
            data={listProduct}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <ProductCart
                  item={item}
                  goToDetail={x => {
                    navigation.navigate('Detail', {
                      id: item.id,
                      category: item.category,
                      idCat: item.idCat,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      size: item.size,
                      star: item.star,
                      desc: item.desc,
                    })
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      <Search />
    </>
  )
}

export default Home