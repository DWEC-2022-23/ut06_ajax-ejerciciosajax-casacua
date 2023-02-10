/**
 * ! Al inicializar la pagina, muestra todos los invitados que haya en el fichero JSON
*/
const requestURL = "http://localhost:3000/invitados";
const xhr = new XMLHttpRequest();

class Invitado {
    constructor(id, nombre, confirmado) {
        this.id = id;
        this.nombre = nombre;
        this.confirmado = confirmado;
    }
}

const promesa = mostrar(requestURL);

promesa
    .then(function imprimirPosts(json) {
        const listaInvitados = JSON.parse(json);
        listaInvitados.forEach(invitado => {
            let li = createLI(invitado.nombre, invitado.confirmado)
            li.id = invitado.id;
            ul.appendChild(li);
        });
        console.log('ok')
    })
    .catch(function handleErrors(error) {
        console.log('Error: ', error)
    })

/**
 * ! Cuando se crea un invitado, guardar cambios en el fichero JSON
 */
function crear(nombre) {
    const request = new XMLHttpRequest();
    let nuevoInvitado = new Invitado(0, nombre, false);
    // Definir la comunicación
    request.open("POST", requestURL, true);
    // Cabeceras de la solicitud como si fuera un formulario, necesario si se utiliza POST
    request.setRequestHeader("Content-type", "application/json");
    //Enviamos los parámetros
    request.send(JSON.stringify(nuevoInvitado));
    // console.log(nuevoInvitado);
    // return nuevoInvitado;
}

/**
 * ! Aqui se muestran todos los datos que tiene el json. Debe llamarse despues de cada actualizacion
 */
function mostrar(url) {
    return new Promise(function (resolve, reject) {
        xhr.timeout = 3000;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.ontimeout = function () {
            reject("timeout");
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}

/**
 * ! Cuando se actualiza un invitado, guardar cambios en el fichero JSON
 */
function actualizar(invitado) {
    let objeto = new Invitado(invitado.id, invitado.firstElementChild.textContent, invitado.querySelector("input").checked);
    // console.log(objeto)
    xhr.open("PUT", requestURL + "/" + objeto.id, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(objeto));
}

/**
 * ! Cuando se borra un invitado, guardar cambios en el fichero JSON
 */
function borrar(invitado) {
    xhr.open("DELETE", requestURL + "/" + invitado.id, true);
    xhr.send();
}

function search(predicate) {
    console.log("Entrando en search")
    const request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.open("GET", requestURL + "?" + predicate, true);
        // console.log(requestURL + "?" + predicate)
        request.send();
        request.onload = () => {
            console.log("todo bien")
            /*if (request.status == 200)*/resolve(JSON.parse(request.response))
        }
        request.onerror = () => {
            console.log("error")
            reject("Se ha roto algo :(")
        };
    })
}

function esperando() {
    return new Promise(() => {
      setTimeout(() => {
        console.log("Retornando");
      }, 2000);
    });
}
