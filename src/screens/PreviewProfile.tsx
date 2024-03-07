import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import AudioPlayer from "../components/audioPlayer";
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PreviewProfile = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const {audio, name, bio, genres, images} = route.params

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.mainContainer}>
        <View id="djCard" style={styles.djCard}>
            <Image source={{uri: images[0]}} style={styles.image}/>
            <AudioPlayer audioUrl={audio}/>
            <View>
              <Text style={styles.djName}>{name}</Text>
              <Text style={styles.djBio}>{bio}</Text>
              <View style={styles.genresContainer}>
              {genres.map((genre, index)=> (
                  <Text key={index} style={styles.genresText}>{genre}</Text>
              ))}      
              </View>
            </View>
            <TouchableOpacity 
              style={styles.button}>
              <Text style={{color: 'white'}}>BOOK</Text>
            </TouchableOpacity>
          </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default PreviewProfile

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
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
  },
  goBackButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    alignItems: "center",
  },
  goBackButton: {
    height: 40,
    width: 150,
    fontSize: 20,
    backgroundColor: "#f57c00",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center'
  },
})
