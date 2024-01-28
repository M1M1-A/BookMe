const { db } = require('./firebase')

// Sample data to be added to the Firestore collection
const data = [
  { field1: 'value1', field2: 'value2' },
  { field1: 'value3', field2: 'value4' },
  // Add more documents as needed
];

// Reference to the Firestore collection
const collectionRef = collection(db, 'DJs');

// Add documents to the collection
data.forEach(async (docData) => {
  try {
    await addDoc(collectionRef, docData);
    console.log('Document added successfully:', docData);
  } catch (error) {
    console.error('Error adding document:', error);
  }
});