import { View, Text, Image, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
const contactIcon = require("../../assets/user.png");
const locationIcon = require("../../assets/location.png");

const { width, height} = Dimensions.get('screen')

const MoreInfoModal = ({visible, onClose, booking}) => {

  function formatDate(dateObject) {
    const dateString = Object.keys(dateObject)[0]
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.modalContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.locationContainer}>
            <Image source={contactIcon} style={styles.icon}/>
            <Text style={styles.customerName}>{booking.customerName}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image style={styles.icon} source={locationIcon} />
            <Text>{booking.eventStreet}, {booking.postcode}</Text>
          </View>
          <Text>{booking.customerEmail}</Text>
          <Text>{booking.contactNumber}</Text>
          <Text>{booking.description}</Text>
          <Text>Status: {booking.bookingStatus}</Text>
          {/* <Text>{formatDate(booking.date)}</Text> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default MoreInfoModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  customerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    width: '40%',
    height: '5%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    margin: 10
  }
})
