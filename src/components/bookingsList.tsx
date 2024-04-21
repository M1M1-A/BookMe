import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from 'react'
import { useNavigation } from "@react-navigation/native";
const contactIcon = require("../../assets/user.png");
const locationIcon = require("../../assets/location.png");
const calendarIcon = require("../../assets/calendar.png");

const BookingsList = ({allBookings}) => {
  const navigation = useNavigation()

  const limitDescriptionLength = (description) => {
    if (description.length <= 20) {
      return description;
    } else {
      return description.slice(0, 20) + "...";
    }
  };
  
  function formatDate(dateObject) {
    const dateString = Object.keys(dateObject)[0];
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <View style={{flex: 1}}>
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
                <Image style={styles.icon} source={calendarIcon} />
                <Text>{formatDate(item.date)}</Text>
              </View>
              <Text style={styles.descriptionText}>
                {limitDescriptionLength(item.description)}
              </Text>
              <View style={styles.locationContainer}>
                <Image style={styles.icon} source={locationIcon} />
                <Text>{item.postcode}</Text>
              </View>
            </View>
            <View style={styles.viewBookingButtons}>
              <View style={styles.statusContainer}>
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusText}>Status</Text>
                </View>
                <Text>{item.bookingStatus.toUpperCase()}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("MoreInfo", {booking: item});
                }}
              >
                <Text style={styles.buttonText}>View Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default BookingsList

const styles = StyleSheet.create({
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
    flexDirection: "column",
    alignItems: "center",
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  viewBookingButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 4,
  },
  button: {
    width: 115,
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
