import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { firebase } from "../../config/firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRoute, useNavigation } from "@react-navigation/native";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState<{}>({})
  const route = useRoute()
  const { djDocId } = route.params

  useEffect(() => {
    //fetch all bookings with logged in DJs doc id
    const fetchBookings = async () => {
      try {
        const db = firebase.firestore()
        const q = query(collection(db, "Bookings"), where("djId", "==", djDocId));
        const querySnapshot = await getDocs(q)
        const bookings = []

        querySnapshot.forEach(async (doc) => {
          const booking = doc.data()
          bookings.push(booking)
        })
        
        setAllBookings(bookings)
        console.log("All Bookings retrieved")
      } catch (error) {
        console.log("Error fetching bookings", error)
      }
    }

    fetchBookings()
  }, [djDocId])

  return (
    <SafeAreaView>
      <Text>BOOKINGS</Text>
      <FlatList 
        data={allBookings}
        keyExtractor={item => item.customerEmail}
        renderItem={({item}) => (
          <View>
            <Text>{item.customerName}</Text>
          </View>
        )}     
      />
    </SafeAreaView>
  )
}

export default AllBookings