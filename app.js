import {initializeApp
        ,getFirestore ,
        db,
         doc,
          setDoc



} from './firebase.js'


console.log("Working")

await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});













