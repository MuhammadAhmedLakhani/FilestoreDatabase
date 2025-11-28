import {
    initializeApp
    , getFirestore,
    db,
    doc,
    setDoc, collection, addDoc
    , increment,
    onSnapshot,
    deleteDoc, updateDoc,
    serverTimestamp ,
    query
    , where


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
        id:1,
        todo: todo.value,   
        timestamp:serverTimestamp()
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

let delTodo = async (id) => {
    console.log("deleteId", id)
    await deleteDoc(doc(db, "todos", id))
}

window.delTodo = delTodo

let getData = () => {

    let q = query(collection(db, "todos"),where("id" , "==" , 12))

    console.log("data lekar aao")

    onSnapshot(q, (Snapshot) => {
        // Respond to data

        list1.innerHTML = ""


        Snapshot.docChanges().forEach((change) => {

            console.log(change.type)

        })




        Snapshot.forEach((doc) => {

            console.log("data--->",doc.data())

            // console.log("change",change.type)

            let { todo , timestamp} = doc.data()

            console.log("fetch timestamp--->", timestamp.toDate())

            list1.innerHTML += `<li><input disabled id = "${doc.id}"   type = "text"  value = "${todo}" >      <button onClick = delTodo('${doc.id}')>Delete<button  onClick = updateTodo('${doc.id}')>Edit</button></li>  `


            console.log(list1.innerHTML)

        })

        console.log("data fetched")





    })

}

getData()




let updateTodo = (id) => {

    let todo_Input = document.getElementById(id)

    todo_Input.disabled = false

    let update = todo_Input.parentNode.childNodes[3]

    update.innerHTML = "Update"

    let updated_Todo

    update.addEventListener('click', () => {

        update.innerHTML = "Edit"

        todo_Input.disabled = true




       updated_Todo =  todo_Input.value

       console.log(updated_Todo)

        console.log("updating db now")


        updateDB(id,updated_Todo)





       
    })


    let updateDB = async (id,updated_Todo)=>{

        
        await  updateDoc(doc(db,"todos", id ),{
            id:1,
            todo:updated_Todo
        })
        console.log("update done")

    }









    console.log("update function", id)
    // updateDoc(doc(db,"todos",id))


}

window.updateTodo = updateTodo






















