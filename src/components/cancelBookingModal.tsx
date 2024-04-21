import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react'
import { firebase } from "../../config/firebase";
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const CancelBookingModal = ({visible, onClose, bookingId}) => {
  const [cancellationReason, setCancellationReason] = useState<string>("")
  const navigation = useNavigation()

  const cancelBooking = async () => {
    try {
        const db = firebase.firestore()
        const booking = doc(db, "Bookings", bookingId)
        await updateDoc(booking, {
          bookingStatus: "cancelled",
          cancellationReason
        })
        console.log("Booking cancelled")
        onClose()
        navigation.goBack()
      } catch(error) {
      console.log("Error cancelling booking", error)
    }
  }

  return (
    <Modal  visible={visible} animationType='fade'>
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>Are you sure you want to cancel?</Text>
        <Text style={styles.text}>Enter your reason for cancelling. This will be sent to the client</Text>
        <TextInput 
          value={cancellationReason}
          style={styles.textBox}
          onChangeText={setCancellationReason}
          // multiline={true}  
          textAlignVertical="top"
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={cancelBooking}>
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CancelBookingModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBox: {
    width: 300,
    height: 100,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20
  },
  text: {
    fontSize: 15,
    // fontWeight: 'bold',
    margin: 20,
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
})
