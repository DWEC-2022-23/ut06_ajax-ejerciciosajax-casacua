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
    listaInvitados.forEach(invitado => createLI(invitado.nombre, invitado.confirmado));
    console.log('ok')
  })
 // .then(ul.appendChild(li))
  .catch(function handleErrors(error) {
    console.log('Error: ', error)
  })

/**
 * ! Cuando se crea un invitado, guardar cambios en el fichero JSON
 */
function crear(nombre) {
    let nuevoInvitado = new Invitado(0, nombre, false);
    let inv = JSON.stringify(nuevoInvitado);
    // Definir la comunicación
    xhr.open( "POST", requestURL, true );
    // Cabeceras de la solicitud como si fuera un formulario, necesario si se utiliza POST
    xhr.setRequestHeader("Content-type", "application/json");
    //Enviamos los parámetros
    xhr.send(inv);
    let i = 0;
    //!!Cómo asignar id
    let id = inv.dataset.id;
    console.log(id)
    console.log(inv);
}


/**
 * ! Aqui se muestran todos los datos que tiene el json. Debe llamarse despues de cada actualizacion
 */
function mostrar(url) {
    return new Promise (function (resolve, reject){
        xhr.timeout = 3000;
        xhr.onreadystatechange = function(e){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(xhr.response);
                } else{
                    reject(xhr.status);
                }
            }
        };
        xhr.ontimeout = function(){
            reject("timeout");
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}

/**
 * TODO Cuando se actualiza un invitado, guardar cambios en el fichero JSON
 */
function actualizar(invitado) {
    
}

/**
 * TODO Cuando se borra un invitado, guardar cambios en el fichero JSON
 */
function borrar(invitado) {
    console.log(invitado)
//!Eto eh así?
    let borrar = invitado.querySelector("span").textContent;
    borrar = invitado.id;
    // let inv = JSON.stringify(nuevoInvitado);
    // Definir la comunicación
    xhr.open( "DELETE", requestURL + "/" + borrar, true);
    // Cabeceras de la solicitud como si fuera un formulario, necesario si se utiliza POST
    // xhr.setRequestHeader("Content-type", "application/json");
    //Enviamos los parámetros
    xhr.send();
    console.log(xhr)
    // forEach()
}