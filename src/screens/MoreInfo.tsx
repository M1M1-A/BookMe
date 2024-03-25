import { View, Text, Image, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from "@react-navigation/native";
const contactIcon = require("../../assets/user.png");
const locationIcon = require("../../assets/location.png");
import CancelBookingModal from "../components/cancelBookingModal";
import RejectBookingModal from "../components/rejectBookingModal";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { firebase } from "../../config/firebase";
const { width, height} = Dimensions.get('screen')

const MoreInfo = () => {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const route = useRoute()
  const navigation = useNavigation()
  const { booking, fetchBookings } = route.params
  
  function formatDate(dateObject) {
    const dateString = Object.keys(dateObject)[0]
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  const handleConfirm = async (id) => {
    try {
      if (id) {
        const db = firebase.firestore()
        const bookingRef = doc(db, "Bookings", id);
        await updateDoc(bookingRef, {
          bookingStatus: "confirmed",
        });
      }
      fetchBookings();
      console.log("Booking confirmed");
    } catch (error) {
      console.log("Failed to confirm booking status");
    }
  };
  
  const handleCancelBooking = (id) => {
    setSelectedBookingId(id);
    setCancelModalVisible(true);
  };

  const handleRejectBooking = (id) => {
    setSelectedBookingId(id);
    setRejectModalVisible(true);
  };

  const closeModal = () => {
    setCancelModalVisible(false);
    setRejectModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.infoContainer}>
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
          <Text>{formatDate(booking.date)}</Text>
        </View>
        <View>
        {booking.bookingStatus === "requested" && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleConfirm(booking.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRejectBooking(booking.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
            {booking.bookingStatus === "confirmed" && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleCancelBooking(booking.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text>Close</Text>
        </TouchableOpacity>
        <CancelBookingModal
          visible={cancelModalVisible}
          onClose={closeModal}
          bookingId={selectedBookingId}
          fetchBookings={fetchBookings}
        />
        <RejectBookingModal
          visible={rejectModalVisible}
          onClose={closeModal}
          bookingId={selectedBookingId}
          fetchBookings={fetchBookings}
        />
    </SafeAreaView>
  )
}

export default MoreInfo

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
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
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  actionButton: {
    width: 80,
    height: 30,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

})
