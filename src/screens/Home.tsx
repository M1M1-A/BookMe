import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../config/firebase'
import { collection, getDocs, query } from "firebase/firestore";

export default function Home() {
  // const [djs, setDJs] = useState([]);
  // const collectionRef = collection(db, 'DJs')

  useEffect(() => {
    const fetchDjs = async () => {
      try {
        const q = query(collection(db, "DJs"))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        // const data = await getDocs(collectionRef)
        // console.log(data)
      } catch (error) {
        console.log("Error", error)
      }
    }
    fetchDjs();

  }, []);


  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View id="djCard" style={styles.djCard}>
          {/* <Image source={}/> */}
          <View id="djInfo">
            <Text>Bio ajhdjahsjdhsja</Text>
            <Text>Links, insta</Text>      
          </View>
          <TouchableOpacity onPress={() => addTodo()} style={styles.button}>
            <Text>BOOK</Text>
          </TouchableOpacity>
        </View>
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
