import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { Swipeable } from 'react-native-gesture-handler';

const Wishlist = () => {
  const [wishListData, setWishListData] = useState([]);
  const userID = firebase.auth().currentUser.uid;

  const rightSwipe = () => {
    return (
      <TouchableOpacity
        style={{
          width: '100%', height: 100, borderBottomWidth: 3,
          backgroundColor: 'red', borderBottomColor: '#DDDDDD',
          justifyContent: 'center', alignItems: 'center',
        }}>
        <Image
          source={require('../Images/recyclebin.png')}
          style={{
            width: 40,
            height: 40,
            tintColor: '#fff',
          }} />
      </TouchableOpacity>
    )
  };

  const onComponentOpen = (idPro) => {
    database().ref('Wishlist/' + userID + '/' + idPro).remove();
    alert('Xóa thành công.');
  }

  useEffect(() => {
    database()
      .ref('Wishlist/' + userID)
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(child => {
          var item = child.val();
          arr.push({
            id: child.key,
            title: item.title,
            image: item.image,
            price: item.price,
            star: item.star,
          });
        })
        setWishListData(arr);
        console.log(arr);
      });
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{
        width: '90%', height: 45, flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
        backgroundColor: '#AA0000', borderBottomLeftRadius: 50,
        borderBottomEndRadius: 50
      }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Sản phẩm yêu thích</Text>
      </View>

      {wishListData.length > 0 ? (
        <FlatList
          data={wishListData}
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                renderRightActions={rightSwipe}
                onSwipeableOpen={() => {
                  onComponentOpen(item.id);
                }}
              >
                <View
                  style={{
                    width: '100%', height: 100, borderBottomWidth: 3,
                    flexDirection: 'row', backgroundColor: '#fff', borderBottomColor: '#DDDDDD',
                    justifyContent: 'space-between', alignItems: 'center',
                  }}>
                  <Image
                    src={item.image}
                    style={{ width: '40%', height: '85%', resizeMode: 'contain' }}
                  />
                  <ImageBackground
                    source={require('../Images/star.png')}
                    style={{ position: 'absolute', top: 5, left: 5, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 14 }}>{item.star}</Text>
                  </ImageBackground>

                  <View style={{
                    width: '60%',
                    height: '100%',
                    justifyContent: 'space-between',
                    padding: 10
                  }}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                      {
                        item.title.length > 15
                          ? item.title.substring(0, 15) + '...'
                          : item.title
                      }
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>{item.price} VNĐ</Text>
                  </View>
                </View>
              </Swipeable>
            )
          }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Không có sản phẩm trong danh mục yêu thích</Text>
        </View>
      )}
    </View >
  )
}

export default Wishlist