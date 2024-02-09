import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Form = () => {
  const [name, setName] = useState("name")
  const [email, setEmail] = useState("")
  const [venueAddress, setVenueAddress] = useState("")
  const [modalOneVisible, setModalOneVisible] = useState(false)
  const [modalTwoVisible, setModalTwoVisible] = useState(false)


  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.text}>Enter your name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={() => setModalOneVisible(true)}>
        <Text>Next</Text>
      </TouchableOpacity>
      <Modal 
        visible={modalOneVisible} 
        style={styles.mainContainer}
        animationType='fade'
        >
        <Text style={styles.text}>Enter your email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => {
          setModalOneVisible(false)
          setModalTwoVisible(true)
        }}>
          <Text>Next</Text>
        </TouchableOpacity>
      </Modal>
      <Modal 
        visible={modalTwoVisible} 
        style={styles.mainContainer}
        animationType='fade'
        >
        <Text style={styles.text}>Enter the venue address</Text>
        <TextInput
          value={venueAddress}
          onChangeText={setVenueAddress}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => {
          setModalTwoVisible(false)
          // setModalThreeVisible(true)
        }}>
          <Text>Next</Text>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  )
}

export default Form

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300
  }, 
  text: {
    margin: 30,
  },
  textInput: {
    margin: 30, 
    backgroundColor: 'grey',
    width: 200,
    height: 40,
    borderRadius: 10,
    textAlign: 'center'
  }
})
