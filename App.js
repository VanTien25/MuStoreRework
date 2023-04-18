import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/Navigation'
import { CheckoutProvider } from './src/Context/CheckoutContext'

const App = () => {
  return (
    <CheckoutProvider>
      <Navigation />
    </CheckoutProvider>

  )
}

export default App