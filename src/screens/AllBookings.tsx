import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import BookingsList from "../components/bookingsList";
import BookingsCalendar from "../components/bookingsCalendar";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true)
  const [showList, setShowList] = useState(false)
  const navigation = useNavigation();
  const route = useRoute();
  const { djDocId } = route.params;
  const db = firebase.firestore();

  useFocusEffect(
    React.useCallback(() => {
      const fetchBookings = async () => {
        try {
          const q = query(collection(db, "Bookings"), where("djId", "==", djDocId));
          const querySnapshot = await getDocs(q);
          const bookings = [];
  
          querySnapshot.forEach((doc) => {
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
  
      fetchBookings();

    }, [djDocId])
  );

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
        {showCalendar ? (
          <TouchableOpacity 
            style={{ flex: 2 }}
            onPress={() => {setShowList(true), setShowCalendar(false)}}
          >
          <Text>List</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={{ flex: 2 }}
            onPress={() => {setShowList(false), setShowCalendar(true)}}
          >
          <Text>Calendar</Text>
          </TouchableOpacity>
        )}
      </View>
      { showList && (
        <BookingsList allBookings={allBookings}/>
      )}
      { showCalendar && (
        <BookingsCalendar allBookings={allBookings}/>
      )}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>Go Back</Text>
      </TouchableOpacity>
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
