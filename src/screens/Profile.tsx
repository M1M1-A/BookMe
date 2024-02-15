import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthenticatedUserContext } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'

const Profile = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [audio, setAudio] = useState<string>();
  const [genres, setGenres] = useState<string[]>([]);
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [soundcloudLink, setSoundcloudLink] = useState<string>("");
  const [availability, setAvailability] = useState("");
  const [edit, setEdit] = useState<boolean>(false);

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

      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchDj();
  }, [loggedInUserId]); 

  const handleSave = () => {
    setEdit(false);
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
  
        setImages(newImages)
        console.log("Image uploaded")
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // onSave add the images array including new urls to the DJs document

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
    { label: "Audio link", value: audio, onChangeText: setAudio },
    { label: "Genres", value: `${genres} `, onChangeText: setGenres },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.heading}>Your Profile</Text>
      {profileInfo.map((item) => (
        <View key={item.label} style={{ flexDirection: "column" }}>
          <Text style={styles.label}>{item.label}</Text>
          {edit ? (
            <TextInput
              value={item.value}
              style={styles.inputField}
              onChangeText={item.onChangeText}
            />
          ) : (
            <Text style={styles.inputField}>{item.value}</Text>
          )}
        </View>
      ))}
        <View style={styles.imageHeading}>
          <Text style={styles.label}>Images</Text>
          {/* upload image */}
          <TouchableOpacity onPress={handleImageUpload}>
            <Text style={{fontSize: 30}}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainImageContainer} >
        { images.map((image, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image 
              source={{uri: image}}
              style={{width: 60, height: 70}}
            />
            <TouchableOpacity onPress={() => handleDeleteImage(image, index)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        </View>
      {edit ? (
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setEdit(true)} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: "#F7F8FB",
    height: 40,
    width: 280,
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
    width: 70,
    fontSize: 20,
    backgroundColor: "#f57c00",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  }, 
  imageHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainImageContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
});
