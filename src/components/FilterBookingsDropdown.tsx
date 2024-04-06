import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import checkIcon from '../../assets/check.png'

const FilterBookingsDropdown = ({ handleFilter }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selections, setSelections] = useState([]);

  const handleSelection = (selection) => {
    const isSelected = selections.includes(selection);

    if (isSelected) {
      const updatedSelections = selections.filter((item) => item !== selection);
      setSelections(updatedSelections);
    } else {
      setSelections([...selections, selection]);
    }
  };

  const handleApplyFilter = () => {
    handleFilter(selections);
    setShowOptions(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>
      {showOptions && (
        <View>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleSelection("requested")}
              style={
                selections.includes("requested")
                  ? styles.selectedOption
                  : styles.option
              }
            >
              <Text>Requested</Text>
            </TouchableOpacity>
            { selections.includes('requested') && (
              <Image source={checkIcon} style={{width: 30, height: 30}}/>
            )}
          </View>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleSelection("confirmed")}
              style={
                selections.includes("confirmed")
                  ? styles.selectedOption
                  : styles.option
              }
            >
            <Text>Confirmed</Text>
            </TouchableOpacity>
            { selections.includes('confirmed') && (
              <Image source={checkIcon} style={{width: 30, height: 30}}/>
            )}
          </View>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleSelection("cancelled")}
              style={
                selections.includes("cancelled")
                  ? styles.selectedOption
                  : styles.option
              }
            >
            <Text>Cancelled</Text>
            </TouchableOpacity>
            { selections.includes('cancelled') && (
              <Image source={checkIcon} style={{width: 30, height: 30}}/>
            )}
          </View>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleSelection("rejected")}
              style={
                selections.includes("rejected")
                  ? styles.selectedOption
                  : styles.option
              }
            >
            <Text>Rejected</Text>
            </TouchableOpacity>
            { selections.includes('rejected') && (
              <Image source={checkIcon} style={{width: 30, height: 30}}/>
            )}
          </View>
          <TouchableOpacity
            onPress={handleApplyFilter}
            style={styles.applyFilter}
          >
            <Text style={styles.applyFilterText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FilterBookingsDropdown;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 2,
  },
  option: {
    padding: 5,
    borderRadius: 2,
  },
  selectedOption: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 2,
  },
  selectedOptionText: {
    color: "white",
  },
  applyFilter: {
    backgroundColor: "green",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  applyFilterText: {
    color: "white",
    alignSelf: "center",
  }
});
