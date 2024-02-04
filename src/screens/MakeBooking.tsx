import { View, Text, TextInput, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height  

const MakeBooking = () => {
  const [ date, setDate ] = useState<string>("")
  const [ name, setName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ eventDescription, setEventDescription ] = useState<string>("")
  const [ eventAddress, setEventAddress] = useState<string>("")
  const [ eventDuration, setEventDuration ] = useState<string>("")
  const route = useRoute()
  const navigation = useNavigation()
  const { djId, djName } = route.params

  // onSubmit function to create new booking in firestore 
  // and alert customer booking made and return to home 

  // address should be selected from address finder?

  // change hours to be a dropdown selection

  return (
    <SafeAreaView>
      <Text style={styles.heading}>Request to book</Text>
      <Text style={styles.djName}>DJ {djName}</Text>
      <ScrollView>
        <TextInput 
          value={date}
          placeholder='Event date'
          placeholderTextColor={'#737373'}
          style={styles.inputField}
          onChangeText={(text) => setDate(text)}
        />
        <TextInput 
          value={name}
          placeholder='Your name'
          placeholderTextColor={'#737373'}
          style={styles.inputField}
          onChangeText={(text) => setName(text)}
        />
        <TextInput 
          value={email}
          placeholder='Email'
          placeholderTextColor={'#737373'}
          autoCapitalize='none'
          style={styles.inputField}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
          value={eventDuration}
          placeholder='Duration (hours)'
          placeholderTextColor={'#737373'}
          style={styles.inputField}
          onChangeText={(text) => setEventDuration(text)}
        />
        <TextInput 
          value={eventAddress}
          placeholder='Event address'
          placeholderTextColor={'#737373'}
          style={styles.inputField}
          onChangeText={(text) => setEventAddress(text)}
        />
        <TextInput 
          value={eventDescription}
          placeholder='Add a brief description of your event'
          placeholderTextColor={'#737373'}
          style={styles.eventDescription}
          onChangeText={(text) => setEventDescription(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20
  },
  djName: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40
  },
  inputField: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    alignSelf: 'center',
    paddingLeft: 5, 
    margin: 10,
    borderRadius: 5,
    fontSize: 18
  }, 
  dropDownContainer: {
    zIndex: 1
  },
  dropDown: {
    height: windowHeight * 0.02, 
    width: windowWidth * 0.8, 
    alignItems: 'center', 
    justifyContent: 'center',
    alignSelf: 'center',
  },
  eventDescription: {
    backgroundColor: "#F6F7FB",
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    margin: 10,
    alignSelf: 'center',
    paddingBottom: 150,
    paddingLeft: 5,
    borderRadius: 5,
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: "#000000",
    width: windowWidth * 0.4,
    height: windowHeight * 0.06,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: 'white'
  }
})


export default MakeBooking