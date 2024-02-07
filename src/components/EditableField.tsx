import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditableField = ({ initialValue, label, onSave}) => {
  const [ value, setValue] = useState(initialValue)
  const [ editable, setEditable ] = useState(false)

  const handleSave = () => {
    onSave(value);
    setEditable(false)
  }

  return (
    <View style={styles.mainContainer}>
      {editable ? (
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.container}>
            <TextInput
              value={value}
              style={styles.inputField}
              onChangeText={setValue}
            />
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        ) : (
        <View style={{flexDirection: 'column'}}> 
          <Text style={styles.label}>{label}</Text>
          <View style={styles.container}>
            <Text style={styles.inputField}>{value}</Text>
            <TouchableOpacity onPress={() => setEditable(true)} style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        )   
      }
    </View>
  )
}

export default EditableField;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center', 
    marginTop: 20,
  },
  label: {
    alignSelf: 'flex-start', 
    marginBottom: 5, 
    fontSize: 18, 
    // fontWeight: 'bold', 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  inputField: {
    backgroundColor: "#F7F8FB",
    height: 40,
    width: 280,
    fontSize: 18,
    borderRadius: 10,
    fontWeight: 'bold',
    padding: 10,
    marginRight: 10
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    alignItems: 'center'
  },
  button: {
    height: 40,
    width: 70,
    fontSize: 20,
    backgroundColor: '#f57c00',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})