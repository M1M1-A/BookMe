import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { firebase } from "../../config/firebase";
import { postcodeValidator } from "postcode-validator";
import { Calendar } from "react-native-calendars";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MakeBooking = () => {
  const [date, setDate] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [bookingRef, setBookingRef] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { djId, djName, availableDates } = route.params;

  const submitRequest = async () => {
    const data = {
      djId,
      date,
      customerName: name,
      customerEmail: email,
      contactNumber,
      eventStreet: street,
      postcode,
      description: eventDescription,
      bookingStatus: "requested",
    };

    try {
      const ref = firebase.firestore().collection("Bookings").doc();
      await ref.set(data);
      setBookingRef(ref.id);
      console.log("New booking successfully created");
    } catch (error) {
      console.log("Error", error);
    }

    setModalVisible(!modalVisible);
  };

  const checkPostcode = () => {
    postcodeValidator(postcode, "GB")
      ? setPostcode(postcode)
      : Alert.alert("Invalid postcode");
  };

  const handleDayPress = (day) => {
    const { dateString } = day;

    if (!availableDates[dateString]) {
      Alert.alert('Date Not Available', 'Please select an available date.');
    } else {
      setDate(dateString);
    }
  };

  const markedDates = {
    ...availableDates,
    [date]: { selected: true, selectedColor: 'blue' },
  };

  return (
    <SafeAreaView>
      <Text style={styles.heading}>Request to book</Text>
      <Text style={styles.djName}>DJ {djName}</Text>
      <ScrollView>
        <Text style={styles.text}>Select a date from {djName}'s availability</Text>
        <Calendar 
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={styles.calendar}
        />
        <TextInput
          value={date}
          placeholder="Event date"
          placeholderTextColor={"#737373"}
          style={styles.inputField}
        />
        <TextInput
          value={name}
          placeholder="Your name"
          placeholderTextColor={"#737373"}
          style={styles.inputField}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          value={email}
          placeholder="Email"
          placeholderTextColor={"#737373"}
          autoCapitalize="none"
          style={styles.inputField}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={contactNumber}
          placeholder="Contact Number"
          placeholderTextColor={"#737373"}
          autoCapitalize="none"
          style={styles.inputField}
          onChangeText={(text) => setContactNumber(text)}
        />
        <TextInput
          value={street}
          placeholder="Event address 1st line"
          placeholderTextColor={"#737373"}
          style={styles.inputField}
          onChangeText={(text) => setStreet(text)}
        />
        <TextInput
          value={postcode}
          placeholder="Postcode"
          placeholderTextColor={"#737373"}
          style={styles.inputField}
          onChangeText={(text) => setPostcode(text)}
          onBlur={() => checkPostcode()}
        />
        <TextInput
          value={eventDescription}
          placeholder="Add a brief description of your event"
          placeholderTextColor={"#737373"}
          style={styles.eventDescription}
          onChangeText={(text) => setEventDescription(text)}
        />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => submitRequest()} style={styles.button}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modal}>
          <Text style={styles.modalText}>Your request has been sent</Text>
          <Text>Your booking reference is: {bookingRef}</Text>
          <Text>You will receive an email once your booking is confirmed.</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.goBack();
            }}
          >
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 40,
  },
  djName: {
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 25,
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
    margin: 10,
  },
  calendar: {
    width: 350, 
    height: 350, 
    alignSelf: 'center'
  },
  inputField: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    alignSelf: "center",
    paddingLeft: 5,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  dropDownContainer: {
    zIndex: 1,
  },
  dropDown: {
    height: windowHeight * 0.02,
    width: windowWidth * 0.8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  eventDescription: {
    backgroundColor: "#F6F7FB",
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    marginTop: 10,
    alignSelf: "center",
    paddingBottom: 150,
    paddingLeft: 5,
    borderRadius: 5,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#000000",
    width: windowWidth * 0.4,
    height: windowHeight * 0.06,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 20,
    margin: 10,
  },
});

export default MakeBooking;
