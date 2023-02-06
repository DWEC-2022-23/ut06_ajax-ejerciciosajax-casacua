
    // const requestURL = "http://localhost:3000/invitados";
    // const request = new XMLHttpRequest();

    // request.open('GET', requestURL);
    // request.responseType = 'json';
    // request.send();
// console.log(JSON.stringify(request));

// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', mostrar);
// }

const promesa = mostrar();

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

function crear(invitado) {
    
}

function mostrar() {
    const requestURL = "http://localhost:3000/invitados";
    return new Promise (function (resolve, reject){
        const xhr = new XMLHttpRequest();
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
        xhr.open("GET", requestURL, true);
        xhr.send();
    });
}

function actualizar(invitado) {
    
}

function borrar(invitado) {
    
}