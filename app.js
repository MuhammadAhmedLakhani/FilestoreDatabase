import {
    initializeApp
    , getFirestore,
    db,
    doc,
    setDoc, collection, addDoc
    , increment,
    onSnapshot,
    deleteDoc 


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

    

    console.log(todo.value)

    


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

let list1 = document.getElementById("list")

//delete function

 let delTodo =async (id)=> {
    console.log("deleteId", id)
    await  deleteDoc(doc(db,"todos",id))
}

window.delTodo  = delTodo

let getData = () => {

    console.log("data lekar aao")

    onSnapshot(collection(db, "todos"), (Snapshot) => {
        // Respond to data

        list1.innerHTML = ""


        Snapshot.docChanges().forEach((change)=>{

            console.log(change.type)

        })




        Snapshot.forEach((doc) => {
            

            console.log(doc.data())

            // console.log("change",change.type)

            let { todo } = doc.data()

            list1.innerHTML += `<li>${todo}</li><button onClick = delTodo('${doc.id}')>Delete</button>`

        })

        console.log("data fetched")
        

        


    })

}

getData()















