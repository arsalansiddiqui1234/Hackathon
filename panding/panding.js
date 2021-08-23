function check(){
   var a = document.getElementById("description").value;
   document.getElementById("dishnameS").innerHTML=a;

}



let logOut = () => {
    firebase.auth().signOut()
        .then(function() {
            location.href = "../index.html"
        })
        .catch(function(er) {
            console.log(er);
        })
}