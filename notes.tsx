// converting firebase storage refs to urls in homepage.

// const getImageURL = async (imageRef: string) => {
//   const ref = firebase.storage().refFromURL(imageRef)
//   const url = await ref.getDownloadURL()
//   return url
// }

// useEffect(() => {
//   firebase
//     .firestore()
//     .collection('DJs')
//     .onSnapshot(async (querySnapshot) => {
//       const allDjs: djData[] = [];
//       const promises: Promise<string>[] = [];

//       querySnapshot.forEach(async (doc) => {
//         const dj = doc.data();
//         const imageURLs: string[] = [];

//         if (dj.images.length > 0) {
//           dj.images.forEach((ref: string) => {
//             const promise = getImageURL(ref);
//             promises.push(promise);  
//             promise.then((url) => {
//               imageURLs.push(url);
//             });
//           });
//         }

//         dj.images = imageURLs;
//         dj.id = doc.id
//         allDjs.push(dj);
//       });

//       await Promise.all(promises);  
//       setDjs(allDjs);
//       console.log("All DJs retrieved");
//     });
// }, []);