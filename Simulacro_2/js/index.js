import { insertarContenido } from "./insert.js";

insertarContenido();
//Selectores
const url_Post = "http://localhost:3000/post";
const thePosts = document.querySelector("#contPost");
const postTitle = document.querySelector("#title");
const postContent = document.querySelector ("#textArea");
const postPicture = document.querySelector("#imageInput");
const formPost = document.querySelector("#formPost");
// const btnAddtePost = document.querySelector("#btn-addPost");
const localId = localStorage.getItem("user");
//Eventos
document.addEventListener("DOMContentLoaded",()=>{
    printPosts();
})

formPost.addEventListener("submit",(event)=>{
    event.preventDefault();

    addPost();
})

//Aquí terminan los eventos

async function addPost(){
    
    const filePost = postPicture.files[0];
	const formDataPost = new FormData();
	formDataPost.append("file", filePost);
	formDataPost.append("upload_preset", "ofhdugqi");

	const responseImgPost = await fetch(
		"https://api.cloudinary.com/v1_1/dnftdsxo1/image/upload",
		{
			method: "POST",
			body: formDataPost,
		}
	);

	const dataImgPost = await responseImgPost.json();
    const post = {
        userId: localId,
        title: postTitle.value,
        description: postContent.value,
        image: dataImgPost.url
    }
    try {
        await fetch(url_Post,{
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(post)
		});
        
    } catch (error) {
        console.error(error);
    }
    printPosts();
}

async function printPosts(){
    const response = await fetch(`${url_Post}?_embed=${localId}`);
    const data = await response.json();
    thePosts.innerHTML = "";
    data.forEach(posts => {
        thePosts.innerHTML += `
    <div class="card mb-3">
        <div class="card-body">
            <div class="form-group">
            <input type="text" class="form-control reloadTitle"  rows="3" id="title${posts.id}" value="${posts.title}" disabled required >
            </div>
            <div class="form-group">
                <label for="textArea">What are your thoughs:</label>
                <input type="text" class="form-control"  rows="3" id="description${posts.id}" value="${posts.description}" disabled required >
            </div>
            <div class="form-group m-2" id="image${posts.id}">
                <img  class="w-30 h-30" src="${posts.image}" alt="RandomPicture">
            </div>
            <div class="form-group" id="cont${posts.id}">
                <button type="button" class="btn btn-primary btn-editPost" data-id=${posts.id}>Edit</button>
                <button type="button" class="btn btn-danger btn-deletePost" data-id=${posts.id}>Delete</button>
            </div>
        </div>
    </div>
        `
    });
    const btnDeletePost = document.querySelectorAll(".btn-deletePost");
    btnDeletePost.forEach(boton => {
        boton.addEventListener("click",async (event)=>{
            const idDeletepost = event.target.getAttribute("data-id");
            await fetch(`${url_Post}/${idDeletepost}`,{
                method: "DELETE"
            })
        })
    });
    const btnEditPost = document.querySelectorAll(".btn-editPost");
    btnEditPost.forEach(boton => {
        boton.addEventListener("click",(event)=>{
            const idEditpost = event.target.getAttribute("data-id");
            const container = document.querySelector(`#cont${idEditpost}`);
            const btnAdd = document.createElement("button");
            btnAdd.textContent = "Save Changes";
            btnAdd.classList.add("btn");
            btnAdd.classList.add("btn-success");
            btnAdd.type = "submit";
            container.appendChild(btnAdd);
            
            callInputPost(idEditpost);
            btnAdd.addEventListener("click",(event)=>{
                event.preventDefault();
                editPost(idEditpost);
            })
        })
    }); 
}

async function callInputPost(idPost) {
    const inputTitle = document.querySelector(`#title${idPost}`);
    const inputDescription = document.querySelector(`#description${idPost}`);
    const containerImg = document.querySelector(`#image${idPost}`);
    
    inputTitle.disabled = false;
    inputDescription.disabled = false;
    containerImg.innerHTML = `
    <label for="imageInput">Change the picture:</label>
    <input type="file" class="form-control-file" id="imageInput${idPost}" required/>
    `
}

async function editPost(idPost){
    const newTitlePost = document.querySelector(`#title${idPost}`);
    const newDescriptionPost = document.querySelector(`#description${idPost}`);
    const newImagePost = document.querySelector(`#imageInput${idPost}`);
    
    const filePost = newImagePost.files[0];
	const formDataPost = new FormData();
	formDataPost.append("file", filePost);
	formDataPost.append("upload_preset", "ofhdugqi");

	const responseImgPost = await fetch(
		"https://api.cloudinary.com/v1_1/dnftdsxo1/image/upload",
		{
			method: "POST",
			body: formDataPost,
		}
	);

	const dataImgPost = await responseImgPost.json();

    const newPost = {
        title: newTitlePost.value,
        description: newDescriptionPost.value,
        image: dataImgPost.url
    }

    await fetch(`${url_Post}/${idPost}`,{
        method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost)
    })
}