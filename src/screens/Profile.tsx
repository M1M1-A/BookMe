import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const [name, setName] = useState("Amina")
  const [editName, setEditname] = useState(false)

  return (
    <SafeAreaView style={styles.mainContainer}>
      {editName ? (
        <View style={styles.container}>
          <TextInput
            value={name}
            placeholder='Name'
            style={styles.inputField}
            onChangeText={(text) => setName(text)}
          />
          <TouchableOpacity onPress={() => setEditname(false)}>
            <Text style={styles.inputField}>Save</Text>
          </TouchableOpacity>
        </View>
        ) : (
        <View style={styles.container}>
          <Text style={styles.inputField}>{name}</Text>
          <TouchableOpacity onPress={() => setEditname(true)}>
            <Text style={styles.inputField}>Edit</Text>
          </TouchableOpacity>
        </View>
        )   
      }
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold'
  },
  button: {
    fontSize: 20,
    margin: 20
  }
})
