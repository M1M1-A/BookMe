import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from '../../config/firebase'

export default function Home() {
  const [djs, setDjs] = useState([]);

  type djData = {
    audio: string[],
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

  const getImageURL = async (imageRef: string) => {
    const ref = firebase.storage().refFromURL(imageRef)
    const url = await ref.getDownloadURL()
    return url
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('DJs')
      .onSnapshot(async (querySnapshot) => {
        const allDjs: djData[] = [];
        const promises: Promise<string>[] = [];
  
        querySnapshot.forEach(async (doc) => {
          const dj = doc.data();
          const imageURLs: string[] = [];
  
          if (dj.images.length > 0) {
            dj.images.forEach((ref: string) => {
              const promise = getImageURL(ref);
              promises.push(promise);  
              promise.then((url) => {
                imageURLs.push(url);
              });
            });
          }
  
          dj.images = imageURLs;
          dj.id = doc.id
          allDjs.push(dj);
        });
  
        await Promise.all(promises);  
        setDjs(allDjs);
        console.log("All DJs retrieved");
      });
  }, []);
  

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        { djs.map((dj) => (
          <View id="djCard" style={styles.djCard}>
            <Image source={{uri: dj.images[0]}} style={styles.image}/>
          <View id="djInfo" key={dj.id}>
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
    height: 750,
    backgroundColor: "white",
    borderRadius: 7
  },
  image: {
    width: 400,
    height: 420,
    alignSelf: 'center'
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
