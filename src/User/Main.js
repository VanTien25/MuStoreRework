import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Bottom/Home';
import Star from '../Bottom/Star';
import Cart from '../Bottom/Cart';
import Wishlist from '../Bottom/Wishlist';
import Profile from '../Bottom/Profile';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFCC33',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 50,
          shadowColor: '#7F5DF0',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5
        }
      }}
    >
      <Tab.Screen
        name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={require('../Images/home.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#AA0000' : 'black',
              }} />
        }} />

      <Tab.Screen
        name="Star" component={Star}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={require('../Images/shopstar.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#AA0000' : 'black',
              }} />
        }} />

      <Tab.Screen
        name="Cart" component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={require('../Images/shopping-cart.png')}
              style={{ width: 30, height: 30, tintColor: focused ? '#AA0000' : 'black', }} />
        }} />

      <Tab.Screen
        name="Wishlist" component={Wishlist}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={require('../Images/heart.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#AA0000' : 'black',
              }} />
        }} />

      <Tab.Screen
        name="Profile" component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={require('../Images/user.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#AA0000' : 'black',
              }} />
        }} />
    </Tab.Navigator>
  )
}

export default Main