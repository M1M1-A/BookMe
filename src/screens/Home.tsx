import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../config/firebase'
import { addDoc, collection, query,   doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  where,
  orderBy,
  limit, } from "firebase/firestore";

export default function Home() {
  const [ djs, setDjs] = useState([])
  const [loading, setIsLoading] = useState(false)
  const collectionRef = collection(db, 'DJs');

  useEffect(() => {
    const q = query(collectionRef, 
      where('name', '==', 'Ekany'));

    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setDjs(items);
      console.log(djs)
    });
    return () => {
      unsub();
    };
  }, [])

  // const addTodo = async () => {
  //   const doc =     addDoc(collection(db, 'bookings'), {
  //     bookingDate: '12/02/2024',
  //     description: 'Need DJ for wedding after party for 4 hours'
  //   })
  //   // console.log("")
  // }

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
    backgroundColor: "crimson",
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
