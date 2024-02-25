import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MultiSelect from 'react-native-multiple-select'

const GenresDropdown = ({onGenresSelected, currentGenres}) => {
  const [selectedGenres, setSelectedGenres] = useState()
  const genres = [
    { name: "RnB" },
    { name: "Hip Hop" },
    { name: "Afrobeats" },
    { name: "Soul" }
  ];

  useEffect(() => {
    setSelectedGenres(currentGenres)
  }, [currentGenres])

  const handleGenresChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
    onGenresSelected(selectedGenres);
  };

  return (
    <View>
      {/* <Text>Select multiple options:</Text> */}
      <MultiSelect 
        items={genres}
        uniqueKey="name"
        onSelectedItemsChange={handleGenresChange}
        selectedItems={selectedGenres}
        selectText="Select Genres"
        searchInputPlaceholderText="Search Genres..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
    </View>
  )
}

export default GenresDropdown