import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from '../../config/firebase'
import { useNavigation } from "@react-navigation/native";
import AudioPlayer from "../components/audioPlayer";
import { SearchBar } from "react-native-elements";
import DropDownPicker from '../components/dropDownPicker'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home() {
  const [djs, setDjs] = useState([]);
  const [search, setSearch] = useState("")
  const navigation = useNavigation()

  type djData = {
    audio: string,
    availability: string,
    bio: string,
    email: string,
    genres: string[],
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

  const renderDjs = (djData) => (
    <FlatList 
      data={djData}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View id="djCard" style={styles.djCard}>
          <Image source={{uri: item.images[0]}} style={styles.image}/>
          <AudioPlayer audioUrl={item.audio}/>
          <View>
            <Text style={styles.djName}>{item.name}</Text>
            <Text style={styles.djBio}>{item.bio}</Text>
            <View style={styles.genresContainer}>
            {item.genres.map((genre, index)=> (
                <Text key={index} style={styles.genresText}>{genre}</Text>
            ))}      
            </View>
          </View>
          <TouchableOpacity 
            onPress={()=> navigation.navigate('MakeBooking', {djId: item.id, djName: item.name, availableDates: item.availability})} 
            style={styles.button}>
            <Text style={{color: 'white'}}>BOOK</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )

  const searchResults = djs.filter(dj => 
    dj.name.toLowerCase().includes(search.toLowerCase()) ||
    dj.genres.some(genre => genre.toLowerCase().includes(search.toLowerCase()))
    )

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <SearchBar 
          placeholder="Search by DJ name or Genre"
          onChangeText={(text) => setSearch(text)}
          value={search}
          inputStyle={{ color: 'black'}}
          containerStyle={{ width: 320, backgroundColor: 'black'}}
          inputContainerStyle={{ backgroundColor: 'white'}}
        />
        <DropDownPicker/>
      </View>
      <View>
        {search ? renderDjs(searchResults) : renderDjs(djs)}
      </View>
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
    zIndex: 1,
    backgroundColor: 'black'
  },
  djCard: {
    padding: 10,
    alignSelf: 'center',
    width: windowWidth * 1,
    height: windowHeight * 0.85,
    backgroundColor: "white",
    borderRadius: 7,
    zIndex: 0
  },
  djName: {
    marginTop: 10,
    marginBottom: 8,
    marginRight: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 30
  },
  djBio: {
    marginTop: 8,
    marginBottom: 8,
    marginRight: 10,
    marginLeft: 10
  },
  image: {
    width: windowWidth * 1,
    height: windowHeight * 0.43,
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
    paddingBottom: 8,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
})
