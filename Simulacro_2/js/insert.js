export function insertarContenido(){    
    document.addEventListener("DOMContentLoaded",()=>{
        document.body.insertAdjacentHTML("afterbegin",`<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <a class="navbar-brand" href="./index.html">LocalChat</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a id="btn-home" class="nav-link active" aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./register.html">Regístrate</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./login.html">Iniciar sesión</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Configuración
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Tema de la página</a></li>
                <li><a class="dropdown-item" href="#">Cambiar de cuenta</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Idioma</a></li>
                </ul>
            </li>
            </ul>
            <form class="d-flex" role="search">
            <button class="btn btn-danger disabled" type="submit">Cerrar sesión</button>
            </form>
        </div>
        </div>
    </nav>`)
    })

    document.addEventListener("DOMContentLoaded",()=>{
        const btn_home = document.querySelector("#btn-home");
        if (window.location.pathname == "/index.html") {
            btn_home.href  = "./centralFeed.html";
            btn_home.textContent = "Central Feed";
        }
    })
}