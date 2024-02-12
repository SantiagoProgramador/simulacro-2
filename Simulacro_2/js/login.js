import { insertarContenido } from "./insert.js";
insertarContenido();

const url_Users = "http://localhost:3000/users"
const loginForm = document.querySelector("#loginForm");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");

//Eventos
loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    userLogin();
})

async function userLogin(){
    const response = await fetch(`${url_Users}?email=${userEmail.value}`);
    const data = await response.json();
    if (data.length) {
        if (data[0].password === userPassword.value) {
            localStorage.setItem("user",data[0].id)
            window.location.href = "index.html"
        }  else{
            alert("Contraseña incorrecta");
        }
    }  else{
        alert("Este correo no está registrado");
    }
}



