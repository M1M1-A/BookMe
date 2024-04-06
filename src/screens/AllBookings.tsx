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
import DropDownPicker from 'react-native-dropdown-picker';
import BookingsList from "../components/bookingsList";
import BookingsCalendar from "../components/bookingsCalendar";
import FilterBookingsDropdown from "../components/FilterBookingsDropdown";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true)
  const [showList, setShowList] = useState(false)
  const [filteredBookings, setFilteredBookings] = useState([])
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

  const handleFilter = (selections) => {
    let filtered = allBookings;
  
    if (selections.length > 0) {
      filtered = allBookings.filter((booking) =>
        selections.includes(booking.bookingStatus)
      );
    }
  
    setFilteredBookings(filtered);
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
          margin: 20
        }}
      >
        <FilterBookingsDropdown handleFilter={handleFilter}/>
        <Text style={{ flex: 4 }}>Search</Text>
        {showCalendar ? (
          <TouchableOpacity 
            style={{ flex: 2 }}
            onPress={() => {setShowList(true); setShowCalendar(false)}}
          >
          <Text>List</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={{ flex: 2 }}
            onPress={() => {setShowList(false); setShowCalendar(true)}}
          >
          <Text>Calendar</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{zIndex: 0, flex: 1}}>
        {showList && <BookingsList allBookings={filteredBookings.length > 0 ? filteredBookings : allBookings} />}
        {showCalendar && <BookingsCalendar allBookings={filteredBookings.length > 0 ? filteredBookings : allBookings} />}
      </View>
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
