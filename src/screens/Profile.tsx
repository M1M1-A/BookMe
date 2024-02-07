import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditableField from '../components/EditableField'

const Profile = () => {
  const [name, setName] = useState("Amina")
  const [bio, setBio] = useState('hgjhgjhgkj')

  const handleSaveName = (newValue) => {
    setName(newValue)
  }

  const handleSaveBio = (newValue) => {
    setBio(newValue)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <EditableField 
        initialValue={name}
        onSave={handleSaveName}
        placeholder='Name'
      />
      <EditableField 
        initialValue={bio}
        onSave={handleSaveBio}
        placeholder='Bio'
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignSelf: 'center'
  },
})
