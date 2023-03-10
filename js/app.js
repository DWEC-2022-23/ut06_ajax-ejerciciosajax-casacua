const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

document.addEventListener('DOMContentLoaded', () => {
  filterLabel.textContent = "Ocultar los que no hayan respondido";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });


});

/**
 * ! Creamos de manera dinamica el contenido del fichero JSON, llamandola desde la funcion MOSTRAR()
 */
function createLI(nombre, confirmado) {
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }

  // console.log(nombre)

  const li = document.createElement('li');
  appendToLI('span', 'textContent', nombre);
  appendToLI('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'remove');

  // ul.appendChild(li);
  /**
  * ! Comprobamos que si el checkbox esta activado se añada la clase "responded"
  */
  if (confirmado) {
    li.querySelector("input[type='checkbox']").checked = true;
    li.className = 'responded';
  }

  return li;
}

/**
  * * Al invitar a alguien, captura el valor del input, crea un nuevo invitado con CREATELI() y borra el valor del input 
  */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';

  crear(text);
  let li = createLI(text);
  await new Promise(r => setTimeout(r, 125));
  let invitado = await search("nombre=" + text);

  li.id = invitado[0].id;
  ul.appendChild(li);
});

/**
* ! Cambiamos el estado de confirmado o no confirmado del invitado en cuestion
*/
ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
  // console.log("DESDE CHECK")
  // console.log(listItem)

  if(!listItem.querySelector("li")){
    console.log("Ha")
    actualizar(listItem);};
});

/**
* ! En el momento en el que se pulsa uno de los botones dentro de un invitado salta este evento. Dependiendo de si ha pulsado sobre borrar, editar o guardar. 
*/
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {
      remove: () => {
        borrar(li);
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
        // console.log(li)
        // console.log("DESDE SAVE")
        // console.log(li)
        actualizar(li);
      }
    };

    // select and run action in button's name
    nameActions[action]();
  }
});



// html.dataset.atributo = valor







