import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditableField = ({ initialValue, placeholder, onSave}) => {
  const [ value, setValue] = useState(initialValue)
  const [ editable, setEditable ] = useState(false)

  const handleSave = () => {
    onSave(value);
    setEditable(false)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {editable ? (
        <View style={styles.container}>
          <TextInput
            value={value}
            placeholder={placeholder}
            style={styles.inputField}
            onChangeText={setValue}
          />
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.inputField}>Save</Text>
          </TouchableOpacity>
        </View>
        ) : (
        <View style={styles.container}>
          <Text style={styles.inputField}>{value}</Text>
          <TouchableOpacity onPress={() => setEditable(true)}>
            <Text style={styles.inputField}>Edit</Text>
          </TouchableOpacity>
        </View>
        )   
      }
    </SafeAreaView>
  )
}

export default EditableField;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    // alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
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
  }
})