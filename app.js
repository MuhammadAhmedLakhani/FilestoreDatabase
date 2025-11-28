import {
    initializeApp
    , getFirestore,
    db,
    doc,
    setDoc, collection, addDoc
    , increment,
    onSnapshot,
    deleteDoc, updateDoc,
    serverTimestamp,
    query
    , where,
    orderBy,
    limit,startAt,
    startAfter 


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
        id: 1,
        todo: todo.value,
        timestamp: serverTimestamp()
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

let lastDoc;


let getData = () => {

    let q = query(collection(db, "todos"), orderBy("todo"), limit(2))

    console.log("data lekar aao")
    onSnapshot(q, (Snapshot) => {
        // Respond to data

        list1.innerHTML = ""


        Snapshot.docChanges().forEach((change) => {

            console.log(change.type)

        })



        let arr = []

        Snapshot.forEach((doc) => {

            console.log("data--->", doc.data())

            // console.log("change",change.type)

            let { todo, timestamp } = doc.data()

            arr.push(doc.data())


            console.log("fetch timestamp--->", timestamp.toDate())

            list1.innerHTML += `<li><input disabled id = "${doc.id}"   type = "text"  value = "${todo}" >      <button onClick = delTodo('${doc.id}')>Delete<button  onClick = updateTodo('${doc.id}')>Edit</button></li>  `


        })

        console.log("data fetched")


        lastDoc = arr[arr.length - 1]

        console.log(lastDoc.todo)
    })

}

getData()


let loadMore = () => {


    let q = query(collection(db, "todos"), orderBy("todo"), startAfter(lastDoc.todo),limit(2))

    console.log("data lekar aao")
    onSnapshot(q, (Snapshot) => {
        // Respond to data

        console.log(Snapshot)

        
        Snapshot.forEach((doc) => {

            console.log("data--->", doc.data())

            // console.log("change",change.type)

            let { todo, timestamp } = doc.data()
            


            // console.log("fetch timestamp--->", todo.toDate())

            list1.innerHTML += `<li><input disabled id = "${doc.id}"   type = "text"  value = "${todo}" >      <button onClick = delTodo('${doc.id}')>Delete<button  onClick = updateTodo('${doc.id}')>Edit</button></li>  `



        })

        console.log("data fetched paginated")


        


    })

}



setTimeout(()=>{
    console.log("it a time")
    loadMore()


},5000)













let updateTodo = (id) => {

    let todo_Input = document.getElementById(id)

    todo_Input.disabled = false

    let update = todo_Input.parentNode.childNodes[3]

    update.innerHTML = "Update"

    let updated_Todo

    update.addEventListener('click', () => {

        update.innerHTML = "Edit"

        todo_Input.disabled = true




        updated_Todo = todo_Input.value

        console.log(updated_Todo)

        console.log("updating db now")


        updateDB(id, updated_Todo)






    })


    let updateDB = async (id, updated_Todo) => {


        await updateDoc(doc(db, "todos", id), {
            id: 1,
            todo: updated_Todo,
            timestamp: serverTimestamp()
        })
        console.log("update done")

    }









    console.log("update function", id)
    // updateDoc(doc(db,"todos",id))


}

window.updateTodo = updateTodo






















//-----indexing


//due to advance querry in line      firebase didnot allow this compledx querry
//instead prompted to do indexing
//in indexing we follow same querry but made ealier so that no more seaching of large data required as before database is ready with these type of querrry result
//when indeixng created as in this case then results will be fetched automatically









