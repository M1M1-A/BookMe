import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const imageUploadModal = ({visible}) => {
  return (
    <Modal visible={visible} animationType='fade'>
      <Text>Select a image to upload</Text>
      <TouchableOpacity>
        <Text>Open image libray</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Confirm selection</Text>
      </TouchableOpacity>
    </Modal>
  )
}

export default imageUploadModal