import { View, Text } from 'react-native'
import React, { useState } from 'react'
import MultiSelect from 'react-native-multiple-select'

const GenresDropdown = ({onGenresSelected}) => {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([
    { id: 1, name: "RnB" },
    { id: 2, name: "Hip Hop" },
    { id: 3, name: "Afrobeats" },
    { id: 4, name: "Soul" }
  ]);

  const handleGenresChange = (selectedGenres) => {
    const selectedGenreNames = selectedGenres.map(item => {
      const genre = genres.find(genre => genre.id === item);
      return genre ? genre.name : '';
    });
    setSelectedGenres(selectedGenres);
    onGenresSelected(selectedGenreNames);
  };

  return (
    <View>
      <Text>Select multiple options:</Text>
      <MultiSelect 
        items={genres}
        uniqueKey="id"
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