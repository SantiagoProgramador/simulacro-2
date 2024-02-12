import { insertarContenido } from "./insert.js";

insertarContenido();

const url_Post = "http://localhost:3000/post";
const url_users = "http://localhost:3000/users";
const containerPost = document.querySelector("#container-post");
const containerProfile = document.querySelector("#container-profile");
const itemListFriends = document.querySelector("#find-friends");

document.addEventListener("DOMContentLoaded",()=>{
    printPosts();
    printUsers();
})

async function printPosts(){
    const response = await fetch(`${url_Post}?_embed=user`);
    const data = await response.json();
    console.log(data);

    data.forEach(post => {
        containerPost.innerHTML += `
        <div class="card mb-3 bg-secondary">
            <div class="card-body m-4">
                <div class="form-group">
                    <label class="form-control reloadTitle" for="title"><strong>${post.title}</strong></label>
                </div>
                <div class="form-group">
                    <label class="form-control" for="Description"><strong>${post.description}</strong></label>
                </div>
                <div class="form-group m-2" id="image${post.id}">
                    <img  class="w-30 h-30" src="${post.image}" alt="RandomPicture">
                </div>
                <div class="form-group">
                    <label class="form-control" for="Description"><strong>${post.user.name}</strong></label>
                </div>
            </div>
        </div>
        `
    });

}

async function printUsers(){
    const idProfile = localStorage.getItem("user");
    const response = await fetch(url_users);
    const data = await response.json();

    data.forEach(user=>{
        if (user.id === idProfile) {
            containerProfile.innerHTML =`
            <h5 class="card-title">Hola, ${user.name}👋!</h5>
            <div class="container">
                <img class="rounded-circle img-fluid d-block mx-auto" src="${user.urlImage}" alt="ProfilePicture">
            </div>
            `
        } else {
            itemListFriends.innerHTML += `
            <li class="message">
                <button type="button" data-id="${user.id}" class="btn-chat">
                <img class="logo" src="${user.urlImage}" alt="FriendPicture"/>
                <p class="nameChat"><strong>${user.name}</strong></p>
                </button>
		    </li>
            `
        }
        const btnAddFriend = document.querySelectorAll(".btn-chat");
        btnAddFriend.forEach(boton=>{
            boton.addEventListener("click",(event)=>{
                const idFriend = event.target.getAttribute("data-id");
                console.log(idFriend);
            })
        })
        
    })
} 
