const myToken = localStorage.getItem("token");

if (myToken !== "") {
    console.log("connecté", myToken)
} else {
    console.log("non connecté", myToken)
}