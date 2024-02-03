import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from '../../config/firebase'
import { useNavigation } from "@react-navigation/native";
import AudioPlayer from "../components/audioPlayer";
import { SearchBar } from "react-native-elements";
import DropDownPicker from '../components/dropDownPicker'

export default function Home() {
  const [djs, setDjs] = useState([]);
  const [search, setSearch] = useState("")
  const navigation = useNavigation()

  type djData = {
    audio: string[],
    availability: string,
    bio: string,
    email: string,
    genres: string[],
    hourlyRate: string,
    id: string,
    images: string[],
    instagram: URL,
    name: string,
    soundcloud: string
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('DJs')
      .onSnapshot(async (querySnapshot) => {
        const allDjs: djData[] = [];
  
        querySnapshot.forEach(async (doc) => {
          const dj = doc.data();
          dj.id = doc.id
          allDjs.push(dj);
        });
  
        setDjs(allDjs);
        console.log("All DJs retrieved");
      });
  }, []);

  const renderDjs = (dj) => (
    <View id="djCard" style={styles.djCard}>
      <Image source={{uri: dj.images[0]}} style={styles.image}/>
      <AudioPlayer audioUrl={dj.audio[0]}/>
      <View id="djInfo" key={dj.id}>
        <Text style={styles.djName}>{dj.name}</Text>
        <Text style={styles.djBio}>{dj.bio}</Text>
        <View style={styles.genresContainer}>
        {dj.genres.map((genre)=> (
            <Text style={styles.genresText}>{genre}</Text>
        ))}      
        </View>
      </View>
      <TouchableOpacity 
        onPress={()=> navigation.navigate('MakeBooking')} 
        style={styles.button}>
        <Text style={{color: 'white'}}>BOOK</Text>
      </TouchableOpacity>
    </View>
  )

  const searchResults = djs.filter(dj => 
    dj.name.toLowerCase().includes(search.toLowerCase()) ||
    dj.genres.some(genre => genre.toLowerCase().includes(search.toLowerCase()))
    )

  const dropdownItems = [
    { label: 'Login', value: 'login' },
    { label: 'Signup', value: 'signup' },
  ];

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <SearchBar 
          placeholder="Search by DJ name or Genre"
          onChangeText={(text) => setSearch(text)}
          value={search}
          inputStyle={{ color: 'black'}}
          containerStyle={{ width: 300, backgroundColor: 'black'}}
          inputContainerStyle={{ backgroundColor: 'white'}}
        />
        <DropDownPicker/>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        { search ? 
          searchResults.map(renderDjs)
        : djs.map((renderDjs))}
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
  header: {
    flexDirection: 'row',
    zIndex: 1
  },
  djCard: {
    padding: 10,
    alignSelf: 'center',
    width: 450,
    height: 800,
    backgroundColor: "white",
    borderRadius: 7,
    zIndex: 0
  },
  djName: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 30
  },
  djBio: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 20
  },
  image: {
    width: 400,
    height: 420,
    alignSelf: 'center',
    // marginBottom: 5
  },
  button: {
    backgroundColor: 'black',
    height: 58,
    width: 400,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center'
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genresText: {
    paddingRight: 10,
    paddingTop: 10, 
    paddingBottom: 10,
    paddingLeft: 20,
    fontWeight: 'bold'
  }
})
