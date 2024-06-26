import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react'
import { firebase } from "../../config/firebase";
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const RejectBookingModal = ({visible, onClose, bookingId}) => {
  const navigation = useNavigation()

  const rejectBooking = async () => {
    try {
        const db = firebase.firestore()
        const booking = doc(db, "Bookings", bookingId)
        await updateDoc(booking, {
          bookingStatus: "rejected"
        })
        console.log("Booking rejected")
        onClose()
        navigation.goBack()
      } catch(error) {
      console.log("Error rejecting booking", error)
    }
  }

  return (
    <Modal  visible={visible} animationType='fade'>
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>Are you sure you want to reject?</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={rejectBooking}>
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default RejectBookingModal

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
