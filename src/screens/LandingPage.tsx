import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { firebase } from "../../config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const LandingPage = () => {
  const [bookings, setBookings] = useState([])
  const [djDocId, setDjDocId] = useState("")
  const route = useRoute()
  const { userId } = route.params
  const db = firebase.firestore()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, "DJs"), where("userId", "==", userId))
        const snapshot = await getDocs(q)
        
        snapshot.forEach((doc) => {
          setDjDocId(doc.id)
        })

        const query2 = query(collection(db, "Bookings"), where("djId", "==", djDocId))
        const snapshot2 = await getDocs(query2)
        const newBookings = []

        snapshot2.forEach((doc) => {
          const data = doc.data()
          const dateString = Object.keys(data.date)[0]
          if (data.bookingStatus === "requested") {
            newBookings.push({name: data.customerName, date: dateString})
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
      <Text>LandingPage</Text>
      <Text>Notifications</Text>
      <View style={styles.notificationsContainer}>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.bookingId}
            renderItem={({item}) => (
              <View>
                <Text>{item.name} wants to book you on {item.date}</Text>
              </View>
            )}
          >
          </FlatList>
      </View>
    </View>
  )
}

export default LandingPage

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  notificationsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
