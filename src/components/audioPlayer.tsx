import { View, Text } from 'react-native'
import React from 'react'
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';

const setUpPlayer = async () => {
  const song = {
    url: "https://firebasestorage.googleapis.com/v0/b/bookme-f607f.appspot.com/o/DJs%2FEkany%2FTrimmed%20Ekany%20Mix%20'24.mp3?alt=media&token=cd7b0651-4748-4bb9-86c0-f12a6c8488d4", 
    title: 'Ekany Mix',
    artist: 'EKany',
  }
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add(song)
}

const togglePlayback = async (playbackState) => {
  const currentTrack = TrackPlayer.getActiveTrackIndex()

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }
}

const audioPlayer = () => {
  const playbackState = usePlaybackState()

  return (
    <View>
      <Text>audioPlayer</Text>
    </View>
  )
}

export default audioPlayer