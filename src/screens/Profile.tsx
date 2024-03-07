import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  FlatList
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthenticatedUserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../config/firebase";
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import SetAvailabilityCalendar from "../components/setAvailabilityCalendar"
import GenresDropdown from '../components/genresDropdown'

const Profile = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [audio, setAudio] = useState<string>("");
  const [audioFileName, setAudioFileName] = useState<string>("")
  const [genres, setGenres] = useState<string[]>([]);
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [soundcloudLink, setSoundcloudLink] = useState<string>("");
  const [availability, setAvailability] = useState("");
  const [edit, setEdit] = useState<boolean>(false);
  const navigation = useNavigation()

  const loggedInUserId = user ? user.uid : null;

  useEffect(() => {
    const fetchDj = async () => {
      try {
        const db = firebase.firestore()
        const q = query(collection(db, "DJs"), where("userId", "==", loggedInUserId));
        const querySnapshot = await getDocs(q);
        const dj = querySnapshot.docs[0].data()
        setName(dj.name)
        setBio(dj.bio)
        setImages(dj.images)
        setAudio(dj.audio)
        setGenres(dj.genres)
        setInstagramLink(dj.instagram)
        setSoundcloudLink(dj.soundcloud)
        setAvailability(dj.availability)

        const decodedUrl = decodeURIComponent(dj.audio);
        const startIndex = decodedUrl.lastIndexOf('/') + 1;
        const endIndex = decodedUrl.indexOf('?');
        const filename = decodedUrl.substring(startIndex, endIndex);
        setAudioFileName(filename)

      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchDj();
  }, [loggedInUserId]); 

  const handleSave = async () => {
    if (!name || !bio || !images || !genres) {
      Alert.alert("This fields cannot be empty: Name, Bio, Images, Genres")
    } else {
      try {
        const db = firebase.firestore()
        const q = query(collection(db, "DJs"), where("userId", "==", loggedInUserId))
        const querySnapshot = await getDocs(q)
        const djDoc = querySnapshot.docs[0]
    
        if (djDoc) {
          const djRef = doc(db, "DJs", djDoc.id)
          await updateDoc(djRef, { 
            name,
            bio,
            images,
            genres,
            audio,
            instagram: instagramLink,
            soundcloud: soundcloudLink,
          })
          console.log("DJ doc updated")
        } else {
          await addDoc(collection(db, "DJs"), {
            name,
            bio,
            images,
            genres,
            audio,
            instagram: instagramLink,
            soundcloud: soundcloudLink,
            userId: loggedInUserId
          }) 
          console.log("New doc created for DJ")
        }
      } catch (error) {
        console.error("Error updating DJ doc", error)
      }

      setEdit(false);
    }
  };

  const handleGenresChange = (selectedGenres) => {
    setGenres(selectedGenres); 
  };

  const handleDeleteImage = (image, index) => {
    const updatedImages = images.filter((_, i) => i !== index); 
    setImages(updatedImages); 

    const fileRef = firebase.storage().refFromURL(image)
    fileRef.delete()
    console.log("Image deleted")
  };
  
  const handleImageUpload = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    
      if (!result.cancelled) {
        const uri = result.assets[0].uri;
        const imageName = uri.substring(uri.lastIndexOf('/') + 1);
        const storageRef = firebase.storage().ref(`DJs/${name}/${imageName}`);
    
        const response = await fetch(uri);
        const blob = await response.blob();
    
        try {
          await storageRef.put(blob);
    
          const downloadURL = await storageRef.getDownloadURL();
          const newImages = [...images, downloadURL]
    
          if (newImages.length <= 4) {
            setImages(newImages);
            console.log("Image uploaded");
          } else {
            Alert.alert("You cannot upload more than 4 images");
          }        
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
  };

  const handleAudioUpload = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "audio/mpeg"
    })

    if (file) {
      const uri = file.assets[0].uri;
      const audioFileName = file.assets[0].name;
      setAudioFileName(audioFileName)
      const newAudioRef = firebase.storage().ref(`DJs/${name}/${audioFileName}`);
  
      const response = await fetch(uri);
      const blob = await response.blob();
  
      try {
        await newAudioRef.put(blob);

        if (audio) {
          const previousAudioRef = firebase.storage().refFromURL(audio)
          previousAudioRef.delete()
          console.log("Previous Audio deleted")
        }
  
        const downloadURL = await newAudioRef.getDownloadURL();  
        setAudio(downloadURL)
        console.log("New Audio uploaded")
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    }
  }

  // console.log("Audio URL", audio)
  // slight delay when changing audio, and pressing save. New audio URL 
  // might not be setting in time before the save function executes, so 
  // database doesn't get updated with new URL

  const profileInfo = [
    { label: "Name", value: name, onChangeText: setName },
    { label: "Bio", value: bio, onChangeText: setBio },
    {
      label: "Instagram Link",
      value: instagramLink,
      onChangeText: setInstagramLink,
    },
    {
      label: "Soundcloud Link",
      value: soundcloudLink,
      onChangeText: setSoundcloudLink,
    },
  ];
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.heading}>Your Profile</Text>
      <FlatList
        data={profileInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View key={item.label} style={{ flexDirection: "column" }}>
            <Text style={styles.label}>{item.label}</Text>
            {edit ? (
              <TextInput
                value={item.value}
                style={styles.editableInputField}
                onChangeText={item.onChangeText}
              />
            ) : (
              <Text style={styles.inputField}>{item.value}</Text>
            )}
          </View>
        )}
        ListFooterComponent={
          <>
            <View>
              <Text style={styles.label}>Genres</Text>
              <GenresDropdown onGenresSelected={handleGenresChange} currentGenres={genres}/>
            </View>
            {/* audio upload */}
            <View style={styles.audioHeading}>
              <Text style={styles.label}>Audio File</Text>
            {edit && (
              <TouchableOpacity onPress={handleAudioUpload}>
                <Text style={{ fontSize: 30 }}>+</Text>
              </TouchableOpacity>
            )}
            </View>
              <Text style={styles.audioFile}>
                File: {audioFileName ? audioFileName : "No audio uploaded"}
              </Text>
            {/* audio upload */}
            <View style={styles.imageHeading}>
              <Text style={styles.label}>Images</Text>
            {edit && (
              <TouchableOpacity onPress={handleImageUpload}>
                <Text style={{ fontSize: 30 }}>+</Text>
              </TouchableOpacity>
            )}
            </View>
            <View style={styles.mainImageContainer}>
              { images.length > 0 ? 
                (images.map((image, index) => (
                  <View style={styles.imageContainer} key={index}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: 60, height: 70, borderRadius: 3 }}
                    />
                    {edit && (
                      <TouchableOpacity onPress={() => handleDeleteImage(image, index)}>
                        <Text>X</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )))
              : (
                  <View style={styles.noImageContainer}>
                    <Text>No Images uploaded</Text>
                  </View>
                )}
            </View>
            {edit ? (
              // <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              //   <TouchableOpacity onPress={() => setEdit(false)} style={styles.button}>
              //     <Text style={styles.buttonText}>Cancel</Text>
              //   </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.button}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              // </View>
            ) : (
              <TouchableOpacity onPress={() => setEdit(true)} style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={() => navigation.navigate("PreviewProfile", {name, bio, images, audio, genres})} 
              style={styles.previewProfileButton}>
              <Text style={styles.buttonText}>Preview Profile</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.availabiltyHeading}>Set your availability</Text>
              <SetAvailabilityCalendar 
                loggedInUserId={loggedInUserId} 
                initialAvailability={availability}
                />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
  mainContainer: {
    marginTop: 40,
    display: "flex",
    alignSelf: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputField: {
    backgroundColor: "white",
    height: 40,
    width: 340,
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  editableInputField: {
    backgroundColor: "#fff3e3",
    height: 40,
    width: 320,
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    alignItems: "center",
  },
  button: {
    height: 40,
    width: 150,
    fontSize: 20,
    backgroundColor: "#f57c00",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },
  previewProfileButton: {
    height: 50,
    width: 250,
    fontSize: 20,
    backgroundColor: "black",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },
  audioHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5
  },
  audioFile: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 16,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    width: 60,
    height: 100
  }, 
  imageHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 350,
    height: 100
  },
  mainImageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  availabiltyHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
});
