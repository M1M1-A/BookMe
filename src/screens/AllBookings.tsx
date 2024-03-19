import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../config/firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";
const contactIcon = require("../../assets/user.png");
const locationIcon = require("../../assets/location.png");
import CancelBookingModal from "../components/cancelBookingModal";
import RejectBookingModal from "../components/rejectBookingModal";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState<{}>({});
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { djDocId } = route.params;
  const db = firebase.firestore()

  const fetchBookings = async () => {
    try {
      const q = query(
        collection(db, "Bookings"),
        where("djId", "==", djDocId)
      );
      const querySnapshot = await getDocs(q);
      const bookings = [];

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        const booking = { ...data, id: doc.id };
        bookings.push(booking);
      });

      setAllBookings(bookings);
      console.log("All Bookings retrieved");
    } catch (error) {
      console.log("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [djDocId]);

  const limitDescriptionLength = (description) => {
    if (description.length <= 20) {
      return description;
    } else {
      return description.slice(0, 20) + "...";
    }
  };

  const handleConfirm = async (id) => {
    try {
      if (id) {
        const bookingRef = doc(db, "Bookings", id)
        await updateDoc(bookingRef, {
          bookingStatus: "confirmed"
        })
      }     
      fetchBookings()
      console.log("Booking confirmed")

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
    setRejectModalVisible(true)
  }

  const closeModal = () => {
    setCancelModalVisible(false);
    setRejectModalVisible(false)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.heading}>BOOKINGS</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: 380,
          alignSelf: "center",
        }}
      >
        <Text style={{ flex: 2 }}>Filter</Text>
        <Text style={{ flex: 6 }}>Search</Text>
        <Text style={{ flex: 2 }}>Calendar</Text>
      </View>
      <FlatList
        data={allBookings}
        keyExtractor={(item) => item.customerEmail}
        renderItem={({ item }) => (
          <View style={styles.mainContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.contactContainer}>
                <Image style={styles.icon} source={contactIcon} />
                <Text style={styles.customerName}>{item.customerName}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Image style={styles.icon} source={locationIcon} />
                <Text>{item.postcode}</Text>
              </View>
              <Text style={styles.descriptionText}>
                {limitDescriptionLength(item.description)}
              </Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusText}>Status</Text>
                </View>
                <Text>{item.bookingStatus.toUpperCase()}</Text>
              </View>
            </View>
            {/* <View style={styles.buttonsContainer}> */}
            {item.bookingStatus === "requested" && (
              <View style={styles.statusRequestedButtons}>
              <TouchableOpacity 
              onPress={() => handleConfirm(item.id)}
              style={styles.button}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleRejectBooking(item.id)}
                style={styles.button}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>More Info</Text>
              </TouchableOpacity>
              </View>
            )}
            { item.bookingStatus === "confirmed" && (
              <View style={styles.statusConfirmedButtons}>
                <TouchableOpacity 
                  onPress={() => handleCancelBooking(item.id)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>More Info</Text>
                </TouchableOpacity>
            </View>
            )}
            { (item.bookingStatus === "cancelled" || item.bookingStatus === "rejected") && (
              <View style={styles.statusCancelledButtons}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>More Info</Text>
                </TouchableOpacity>
              </View>
            )}
            </View>
        )}
      />
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>Go Back</Text>
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
  );
};

export default AllBookings;

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: 380,
    height: 160,
    borderColor: "black",
    margin: 10,
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 2,
    flexDirection: "column",
    margin: 10,
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    // marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
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
  descriptionText: {
    marginLeft: 50,
    marginBottom: 10,
    fontSize: 15,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 50,
    alignItems: "center",
  },
  statusTextContainer: {
    backgroundColor: "green",
    marginRight: 10,
    borderRadius: 5,
    width: 60,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  statusConfirmedButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 10,
    // backgroundColor: 'orange',
    borderRadius: 4,
  },
  statusRequestedButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    // backgroundColor: 'orange',
    borderRadius: 4,
  },
  statusCancelledButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 10,
    // backgroundColor: 'orange',
    borderRadius: 4,
  },
  button: {
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
  goBackButton: {
    backgroundColor: "black",
    height: 58,
    width: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    alignSelf: "center",
  },
});
