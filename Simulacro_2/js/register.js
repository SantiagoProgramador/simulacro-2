import { insertarContenido } from "./insert.js";
insertarContenido();

//Selectores
const url_Users = "http://localhost:3000/users";
const registerForm = document.querySelector("#registerForm");
const userName = document.querySelector("#userName");
const userPicture = document.querySelector("#userPicture");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#userPassword");
const confirmPassword = document.querySelector("#confirmPassword");


//Eventos 
registerForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    userRegister();
})

async function userRegister(){
    
    if (!validatePassword()) {
        alert("Algo salió mal al ingresar la contraseña, inténtalo nuevamente");
        return;
    }
    
    if (await validateEmail()) {
        alert("Algo salió mal al ingresar el correo, inténtalo nuevamente");
        return;
    }
    
    const fileUser = userPicture.files[0];
	const formDataUser = new FormData();
	formDataUser.append("file", fileUser);
	formDataUser.append("upload_preset", "ofhdugqi");

	const responseImgUser = await fetch(
		"https://api.cloudinary.com/v1_1/dnftdsxo1/image/upload",
		{
			method: "POST",
			body: formDataUser,
		}
	);

	const dataImgUser = await responseImgUser.json();
    const userInfo = {
    "name": userName.value,
    "email": userEmail.value,
    "password": userPassword.value,
    "urlImage": dataImgUser.url
    };
    
    try {
        const answer = await fetch(url_Users,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        if (answer.ok) {
            alert("Te has registrado satisfactoriamente.");
            window.location.href = "login.html";
        } else alert("Algo salió mal");
    } catch (error) {
        alert("Algo salió mal");
    }

}

async function validateEmail(){
    try{
        const answer = await fetch(`${url_Users}?email=${userEmail.value}`);
        const data = await answer.json();
        
        return data.length
    }catch(error){
        return false
    }
}

function validatePassword(){
    const regexp_password = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  
    if (userPassword.value !== confirmPassword.value) {
        alert("Las contraseñas deben ser iguales");
        return false;
    }
    if (!regexp_password.test(userPassword.value)) {
        alert("Contraseña no válida")
        return false;
    };

    return true;
}