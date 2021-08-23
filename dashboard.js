firebase.auth().onAuthStateChanged((user) => {
    const username = document.getElementById("username");
    const contact = document.getElementById("contact");
    const country = document.getElementById("country");
    const city = document.getElementById("city");

    
    if (user) {
        var uid = user.uid;

        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                console.log("Snapshot", snapshot);
                console.log("Snapshot Data", snapshot.data());
                console.log("Snapshot username Data", snapshot.data().username);
                console.log("Snapshot contact Data", snapshot.data().contact);
                console.log("Snapshot contact Data", snapshot.data().country);
                console.log("Snapshot contact Data", snapshot.data().city);
                username.innerText = snapshot.data().username;
                contact.innerText = snapshot.data().contact;
                country.innerText = snapshot.data().country;
                city.innerText = snapshot.data().city;
            }).catch((er) => {
                console.log("Error", er);
            })

    } else {
        location.href("./login.html")

        // ...
        // console.log('user is not signed in to retrive username');
    }
});
// my 

// function addTodo(){
// var dishname = document.getElementById("todo").value;
// document.getElementById("firstdish").innerHTML=dishname;
// }

// tody item
var userID;
 var todoArray = []

firebase.auth().onAuthStateChanged((user) => {
    const username = document.getElementById("username");
    if (user) {
        userID = user.uid;

        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                // console.log("Snapshot", snapshot);
                // console.log("Snapshot Data", snapshot.data());
                // console.log("Snapshot username Data", snapshot.data().username);
                username.innerText = snapshot.data().username;
                getTodo(userID);

            }).catch((er) => {
                console.log("Error", er);
            })

    } else {
        location.href("./login.html")

        // ...
        // console.log('user is not signed in to retrive username');
    }
});




let addTodo = () => {

    var todo = document.getElementById("todo").value;

    firebase.firestore().collection("todos").add({
            todo: todo,
            uid: userID
        })
        .then(function() {
            console.log(userID);
            console.log("Data Added");
            getTodo(userID);
        })
        .catch(function(error) {
            console.log(error);
        })

}


let getTodo = (userID) => {
    todoArray = []
    firebase.firestore().collection("todos").where("uid", "==", userID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                todoArray.push(doc.data());

                document.getElementById("main").innerHTML = "";

            });
            todoArray.forEach((item, index) => {
                // yahn pe console
                console.log(index, item.todo);

                // document.getElementById("main").innerHTML = "";

                var mainDiv = document.createElement("div")
                var para = document.createElement("p")
                var text = document.createTextNode(item.todo)

                para.appendChild(text)
                mainDiv.appendChild(para)
               var a= document.getElementById("main").appendChild(mainDiv)


            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
       
        var dish = document.getElementById("todo").value;
        var price =document.getElementById("todoprice").value;
        var desc =document.getElementById("tododescription").value;
        

       document.getElementById("dishname").innerHTML=dish;
       document.getElementById("priceses").innerHTML=price;
       document.getElementById("description").innerHTML=desc;
        }
    
    





let logOut = () => {
    firebase.auth().signOut()
        .then(function() {
            location.href = "./index.html"
        })
        .catch(function(er) {
            console.log(er);
        })
}






