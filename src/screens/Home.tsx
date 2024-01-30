import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from '../../config/firebase'

export default function Home() {
  const [djs, setDjs] = useState([]);

  type djData = {
    audio: URL,
    availability: string,
    bio: string,
    email: string,
    genres: string[],
    hourlyRate: string,
    images: string[],
    instagram: URL,
    name: string,
    soundcloud: string
  }

  useEffect(() => {
    firebase.firestore()
    .collection('DJs')
    .onSnapshot((querySnapshot) => {
      const allDjs: djData[] = []
      querySnapshot.forEach((doc) => {
        allDjs.push(doc.data())
      })
      setDjs(allDjs)
      console.log("All DJs retrieved")
    })
  }, [])


  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        { djs.map((dj) => (
          <View id="djCard" style={styles.djCard}>
          {/* <Image source={{uri: "gs://bookme-f607f.appspot.com/DJs/Ekany/Ekany.png"}}/> */}
          <View id="djInfo">
            <Text>{dj.name}</Text>
            <Text>{dj.bio}</Text>
            {dj.genres.map((genre)=> (
                <Text>{genre}</Text>
            ))}      
          </View>
          <TouchableOpacity style={styles.button}>
            <Text>BOOK</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "black",
    justifyContent: 'center',
    paddingVertical: 20
  },
  djCard: {
    padding: 10,
    alignSelf: 'center',
    width: 400,
    height: 650,
    backgroundColor: "white",
    borderRadius: 7
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})
