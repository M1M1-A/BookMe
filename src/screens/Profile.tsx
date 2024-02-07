import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditableField from '../components/EditableField'

const Profile = () => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [images, setImages] = useState<UR[]>([])
  const [audio, setAudio] = useState<URL>()
  const [genres, setGenres] = useState<string[]>([])
  const [instagramLink, setInstagramLink] = useState<string>("")
  const [soundcloudLink, setSoundcloudLink] = useState<string>("")
  const [availability, setAvailability] = useState("")


  // Do I want one edit button per field, or one edit button 
  // which makes all fields editable?
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <EditableField 
        initialValue={name}
        onSave={setName}
        label='Name'
      />
      <EditableField 
        initialValue={bio}
        onSave={setBio}
        label='Bio'
      />
      <EditableField 
        initialValue={images}
        onSave={setImages}
        label='Images'
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 40,
    display: 'flex',
    alignSelf: 'center'
  },
})
