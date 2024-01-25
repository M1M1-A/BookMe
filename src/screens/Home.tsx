import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View id="djCard" style={styles.djCard}>
          {/* <Image source={}/> */}
          <View id="djInfo">
            <Text>Bio ajhdjahsjdhsja</Text>
            <Text>Links, insta</Text>      
          </View>
          <TouchableOpacity style={styles.button}>
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
