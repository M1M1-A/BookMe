import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import Slider from "@react-native-community/slider"
import React, { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AudioPlayer = ({audioUrl}) => {
  const [sound, setSound] = useState()
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const playButton = require('../../assets/Play.png')
  const pauseButton = require('../../assets/Pause.png')

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync()
      } else {
        await sound.playAsync()
      }
      setIsPlaying(!isPlaying)
    } else {
      const { sound } = await Audio.Sound.createAsync({uri: audioUrl})

      setSound(sound)
      console.log("Playing mix")
      await sound.playAsync()
      setIsPlaying(true)

      setInterval(async () => {
        const { positionMillis, durationMillis } = await sound.getStatusAsync();
        setPosition(positionMillis);
        setDuration(durationMillis);
      }, 1000);
    }
  }

  const onSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  }
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //       console.log("unloading sound")
  //       sound.unloadAsync()
  //     }
  //     : undefined
  // }, [sound])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playPauseSound}>
        <Image
          source={ isPlaying ? pauseButton : playButton}
          style={styles.buttons}
        />
      </TouchableOpacity>
      <Slider
        style={{ width: 325, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={onSeek}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="grey"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {  
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    height: windowHeight * 0.07,
    width: windowWidth * 1,
    alignSelf: 'center'
  },
  buttons: {
    width: 50,
    height: 50,
    margin: 10
  }
})


export default AudioPlayer;