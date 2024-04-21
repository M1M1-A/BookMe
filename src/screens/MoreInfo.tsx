import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { firebase } from "../../config/firebase";
import CancelBookingModal from "../components/cancelBookingModal";
import RejectBookingModal from "../components/rejectBookingModal";
import ConfirmBookingModal from "../components/confirmBooking";
const { width, height } = Dimensions.get("screen");
const contactIcon = require("../../assets/user.png");
const locationIcon = require("../../assets/location.png");
const emailIcon = require("../../assets/email.png");
const phoneIcon = require("../../assets/phone.png");
const calendarIcon = require('../../assets/calendar.png')
const infoIcon = require('../../assets/info.png')

const MoreInfo = () => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params;

  function formatDate(dateObject) {
    const dateString = Object.keys(dateObject)[0];
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const closeModal = () => {
    setCancelModalVisible(false);
    setRejectModalVisible(false);
    setConfirmModalVisible(false)
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.locationContainer}>
          <Image source={contactIcon} style={styles.icon} />
          <Text style={styles.customerName}>{booking.customerName}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image style={styles.icon} source={calendarIcon} />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{formatDate(booking.date)}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image style={styles.icon} source={locationIcon} />
          <Text>
            {booking.eventStreet}, {booking.postcode}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <Image style={styles.icon} source={emailIcon} />
          <Text>{booking.customerEmail}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image style={styles.icon} source={phoneIcon} />
          <Text>{booking.contactNumber}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image style={styles.icon} source={infoIcon} />
          <Text>{booking.description}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusText}>Status</Text>
          </View>
          <Text style={{fontWeight: 'bold'}}>{booking.bookingStatus.toUpperCase()}</Text>
        </View>
      </View>
      <View>
        {booking.bookingStatus === "requested" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setConfirmModalVisible(true)}
              style={styles.actionButton}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRejectModalVisible(true)}
              style={styles.actionButton}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
        {booking.bookingStatus === "confirmed" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setCancelModalVisible(true)}
              style={styles.actionButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Close</Text>
      </TouchableOpacity>
      <ConfirmBookingModal 
        visible={confirmModalVisible}
        onClose={closeModal}
        bookingId={booking.id}
      />
      <CancelBookingModal
        visible={cancelModalVisible}
        onClose={closeModal}
        bookingId={booking.id}
      />
      <RejectBookingModal
        visible={rejectModalVisible}
        onClose={closeModal}
        bookingId={booking.id}
      />
    </SafeAreaView>
  );
};

export default MoreInfo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
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
  closeButton: {
    width: "40%",
    height: "5%",
    backgroundColor: "orange",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    margin: 40,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
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
  description: {
    fontSize: 15,
    alignSelf: 'center',
    margin: 10
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'center',
    margin: 20
  },
  statusTextContainer: {
    backgroundColor: "green",
    marginRight: 10,
    borderRadius: 5,
    width: 100,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
});
