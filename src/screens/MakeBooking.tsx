import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

const MakeBooking = () => {
  const [ date, setDate ] = useState<string>("")
  const [ name, setName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ eventDescription, setEventDescription ] = useState<string>("")
  const [ eventAddress, setEventAddress] = useState<string>("")
  const [ eventLink, setEventLink ] = useState<string>("")
  const route = useRoute()
  const { djId, djName } = route.params

  return (
    <SafeAreaView>
      <Text>Request to book DJ {djName}</Text>
      <TextInput 
        value={date}
        placeholder='Event date'
        onChangeText={(text) => setDate(text)}
      />
      <TextInput 
        value={name}
        placeholder='Your name'
        onChangeText={(text) => setName(text)}
      />
      <TextInput 
        value={email}
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
        value={eventDescription}
        placeholder='Add a brief decsription of your event'
        onChangeText={(text) => setEventDescription(text)}
      />
      <TextInput 
        value={eventAddress}
        placeholder='Event address'
        onChangeText={(text) => setEventAddress(text)}
      />
      <TextInput 
        value={eventLink}
        placeholder='Add a link for the event from eventbrite, Dice, RA etc'
        onChangeText={(text) => setEventLink(text)}
      />

    </SafeAreaView>
  )
}

export default MakeBooking