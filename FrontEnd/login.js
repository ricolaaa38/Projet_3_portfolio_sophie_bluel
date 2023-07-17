async function getUser() {

    let users = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
}
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    });  

    if (response.ok === true) {
        let result = await response.json(); 
        let token = result.token;
        window.location.href = "index.html"
        console.log(result)
        localStorage.setItem("token", token)
    } else {
        console.log("une erreur c'est produite")
    };

}


const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault();
    getUser();
   
})