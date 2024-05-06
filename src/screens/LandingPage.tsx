import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute, useNavigation } from "@react-navigation/native";
import { firebase } from "../../config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
const profileIcon = require('../../assets/user.png') 
const calendarIcon = require("../../assets/calendar2.png")
const accountSettingsIcon = require("../../assets/settings.png")

const LandingPage = () => {
  const [bookings, setBookings] = useState([])
  const [djDocId, setDjDocId] = useState("")
  const [djName, setDjName] = useState("")
  const route = useRoute()
  const navigation = useNavigation()
  const { userId } = route.params
  const db = firebase.firestore()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, "DJs"), where("userId", "==", userId))
        const snapshot = await getDocs(q)
        let docId;
        
        snapshot.forEach((doc) => {
          docId = doc.id
          setDjDocId(doc.id)
          setDjName(doc.data().name)
        })

        const query2 = query(collection(db, "Bookings"), where("djId", "==", docId))
        const snapshot2 = await getDocs(query2)
        const newBookings = []

        snapshot2.forEach((doc) => {
          const data = doc.data()
          if (data.bookingStatus === "requested") {
            newBookings.push(data)
          }
        })
        setBookings(newBookings)
      } catch(error) {
        console.log("Error fetching bookings", error)
      }
    }
    fetchBookings()
  }, [userId])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Welcome {djName}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllBookings", {djDocId})}
        >
          <Image source={calendarIcon} style={styles.profileIcon}/>
          <Text style={styles.buttonText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={profileIcon} style={styles.profileIcon}/>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={accountSettingsIcon} style={styles.profileIcon}/>
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>    
      </View>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notificationsContainer}>
        { bookings.length > 0 ? (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.bookingId}
            renderItem={({item}) => (
              <View style={styles.notificationList}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MoreInfo", {booking: item})}
                >
                  <Text style={styles.notificationText}>~ 
                    <Text style={{fontWeight: 'bold'}}>{item.customerName} </Text> 
                    wants to book you on {Object.keys(item.date)[0]}
                  </Text>
                </TouchableOpacity>

              </View>
            )}
          >
          </FlatList>
          ) : (
            <Text>No recent requests</Text>
          )}
      </View>
    </View>
  )
}

export default LandingPage

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  notificationsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  notificationList: {
    marginTop: 10,
    marginBottom: 10
  },
  notificationText: {
    fontSize: 16
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    alignSelf: 'center',
    marginTop: 80
  },
  profileIcon: {
    width: 80, 
    height: 80
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60,
    marginBottom: 20
  },
  buttonText: {
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16
  }
})
