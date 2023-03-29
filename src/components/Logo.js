import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/carbon-neutral.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 259,
    marginBottom: 8,
    borderRadius: 150
  },
})
