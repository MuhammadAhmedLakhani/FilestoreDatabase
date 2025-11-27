import {
    initializeApp
    , getFirestore,
    db,
    doc,
    setDoc, collection, addDoc
    , increment,
    onSnapshot


} from './firebase.js'


console.log("Working")


// setDoc is primary for adding unique data data which has an id


// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });



// --addDb




let add = async () => {

    let todo = document.getElementById("todo")

    let list = document.getElementById("list")

    console.log(todo.value)

    list.innerHTML += `<li> ${todo.value}</li>`


    let ref = collection(db, "todos");

    await addDoc(ref, {
        id: increment(1),
        todo: todo.value
    })

    console.log("Todo Added")

    todo.value = ""








    // ...
};


















let todoBtn = document.getElementById("todoBtn")

todoBtn.addEventListener("click", add)

///getting data from firestore database through  onSnapshot method

let getData = () => {


    onSnapshot(collection(db, "todos"), (Snapshot) => {
        // Respond to data

        Snapshot.forEach((doc) => {

            console.log("data---->", doc.data())

        });

    })

}

getData()
















