// filter bookings custom dropdown

// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React, { useState } from "react";

// const FilterBookingsDropdown = ({ handleFilter }) => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [selections, setSelections] = useState([]);

//   const handleSelection = (selection) => {
//     const isSelected = selections.includes(selection);

//     if (isSelected) {
//       const updatedSelections = selections.filter((item) => item !== selection);
//       setSelections(updatedSelections);
//     } else {
//       setSelections([...selections, selection]);
//     }
//   };

//   const handleApplyFilter = () => {
//     handleFilter(selections);
//     setShowOptions(false);
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <View>
//         <TouchableOpacity onPress={() => setShowOptions(true)}>
//           <Text>Filter</Text>
//         </TouchableOpacity>
//       </View>
//       {showOptions && (
//         <View>
//           <TouchableOpacity
//             onPress={() => handleSelection("requested")}
//             style={
//               selections.includes("requested")
//                 ? styles.selectedOption
//                 : styles.option
//             }
//           >
//             <Text
//               style={{
//                 color: selections.includes("requested") ? "white" : "black",
//               }}
//             >
//               Requested
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => handleSelection("confirmed")}
//             style={
//               selections.includes("confirmed")
//                 ? styles.selectedOption
//                 : styles.option
//             }
//           >
//             <Text
//               style={{
//                 color: selections.includes("confirmed") ? "white" : "black",
//               }}
//             >
//               Confirmed
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleApplyFilter}
//             style={styles.applyFilter}
//           >
//             <Text style={styles.applyFilterText}>Apply Filter</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default FilterBookingsDropdown;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 2,
// },
//   option: {
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 5,
//   },
//   selectedOption: {
//     padding: 10,
//     backgroundColor: "#fad161",
//     borderRadius: 5,
//   },
//   selectedOptionText: {
//     color: "white",
//   },
//   applyFilter: {
//     backgroundColor: "green",
//     padding: 5,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   applyFilterText: {
//     color: "white",
//     alignSelf: "center",
//   },
// });


// handleFilter function for AllBookings

// const handleFilter = (selections) => {
//   let filtered = allBookings;

//   if (selections.length > 0) {
//     filtered = allBookings.filter((booking) =>
//       selections.includes(booking.bookingStatus)
//     );
//   }

//   setFilteredBookings(filtered);
// };