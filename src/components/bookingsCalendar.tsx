import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Calendar } from "react-native-calendars"
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
    getFlatlistData(selectedDate)

  }, [allBookings])

  const getFlatlistData = (date) => {
    const bookingsToShow = allBookings.filter((booking) => {
      const dateKey = Object.keys(booking.date)[0]
      return dateKey === date
    })

    setFlatlistData(bookingsToShow)
  }

  const handleDayPress = (day) => {
    const { dateString } = day;

    setSelectedDate(dateString);  
    getFlatlistData(dateString)
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
          <View>
            <View style={styles.bookingContainer}>
              <View>
                <Text style={styles.customerName}>{item.customerName}</Text>
                <Text style={styles.bookingStatus}>Status: {item.bookingStatus}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('MoreInfo', {booking: item})}
                style={styles.button}
              >
                <Text style={styles.buttonText}>View Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{margin: 10, alignSelf: 'center'}}>No bookings on this date</Text>}
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
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5
  },
  bookingStatus: {
    marginLeft: 5
  },
  button: {
    width: 115,
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: 'bold'
  }
})
