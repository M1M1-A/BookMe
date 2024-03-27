import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Calendar } from "react-native-calendars"
import MoreInfo from '../screens/MoreInfo'
import { useNavigation } from '@react-navigation/native'

const BookingsCalendar = ({allBookings}) => {
  const [bookingDates, setBookingDates] = useState({})
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [flatlistData, setFlatlistData] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    const uniqueDates = {}

    allBookings.forEach( obj => {
      const dateKey = Object.keys(obj.date)[0]
  
      if (!(dateKey in uniqueDates)) {
        uniqueDates[dateKey] = {"selected": true, "selectedColor": "orange"}
      }
    })
  
    setBookingDates(uniqueDates)
  }, [allBookings])

  const handleDayPress = (day) => {
    const { dateString } = day;
    setSelectedDate(dateString);
    
    const bookingsToShow = allBookings.filter((booking) => {
      const dateKey = Object.keys(booking.date)[0]
      return dateKey === dateString
    })

    setFlatlistData(bookingsToShow)
  };

  const markedDates = {
    ...bookingDates,
    [selectedDate]: { selected: true, selectedColor: 'green' },
  };

  return (
    <View>
      <Calendar 
        onDayPress={handleDayPress}
        markedDates={markedDates}  
      />
      <FlatList
        data={flatlistData}
        renderItem={({item}) => (
          <View style={styles.bookingContainer}>
            <Text>{item.customerName}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MoreInfo', {booking: item})}
            >
              <Text>View Booking</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No bookings on this date</Text>}
      />
    </View>
  )
}

export default BookingsCalendar

const styles = StyleSheet.create({
  bookingContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 5
  },
})
