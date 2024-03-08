import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from "react-native-calendars"
import { firebase } from "../../config/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

const SetAvailabilityCalendar = ({loggedInUserId, initialAvailability}) => {
  const [selectedDates, setSelectedDates] = useState({})

  useEffect(() => {
    setSelectedDates(initialAvailability)
  }, [initialAvailability])

  const handleDayPress = (day) => {
    const { dateString } = day;
    const updatedDates = { ...selectedDates };

    if (updatedDates[dateString]) {
      delete updatedDates[dateString];
    } else {
      updatedDates[dateString] = { selected: true, selectedColor: 'green' };
    }

    setSelectedDates(updatedDates);
  };

  const saveDatesToDatabase = async () => {
    try {
      const db = firebase.firestore();
      const q = query(collection(db, "DJs"), where("userId", "==", loggedInUserId));
      const querySnapshot = await getDocs(q);
      const djDoc = querySnapshot.docs[0];

      if (djDoc) {
        const djRef = doc(db, "DJs", djDoc.id);
        await updateDoc(djRef, { availability: selectedDates });
        console.log("Availability updated in the database!");
      }
    } catch (error) {
      console.error("Error updating availability: ", error);
    }  
  }

  // console.log("Calendar", selectedDates)

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={handleDayPress}
        markedDates={selectedDates}
      />
      <TouchableOpacity
        onPress={saveDatesToDatabase}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save dates</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SetAvailabilityCalendar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  button: {
    height: 40,
    width: 70,
    fontSize: 20,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white'
  }
});