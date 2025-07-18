// variables
const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = [];

//event liseners
eventListeners();

function eventListeners(){
    //cuando el usuario agrega una nueva nota
    formulario.addEventListener('submit', agregarNota);

    //cuando el documento esta cargado
    document.addEventListener('DOMContentLoaded', ()=> {
        notas = JSON.parse( localStorage.getItem('nota')) || []; //se trae la vaiable al hacer el setItem
        console.log(notas)

        crearHTML();
    })
}

//funciones
function agregarNota(e){
    e.preventDefault();
    
    //text area donde el usuario escribe
    const nota = document.querySelector('#nota').value;

    //validacion
    if(nota === ''){
        mostrarError('La nota no puede estar vacia')
        return ///evita que se ejecuten mas lineas de codigo en un if
    }

    const notaObj = {
        id: Date.now(),
        nota: nota //tambien podemos dejarlo solo como 'nota', la llave y el valor seran igual en nombre
    }

    //añadir al arreglo de notas
    notas = [...notas, notaObj];
    
    //crear HTML ua vez agregado
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error'); ///clase de css

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar alerta luego de un segundo
    setTimeout(()=>{
        mensajeError.remove();
    }, 1000);
}


//listado de notas
function crearHTML(){
    limpiarHTML();
    if(notas.length > 0){
        notas.forEach( nota =>{
            //agregar btn de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = ()=>{
                borrarNota(nota.id);
            }
            
            //crear el HTML/lista
            const li = document.createElement('li');
            
            //añadir el texto a la lista
            li.innerText = nota.nota;
            
            //asignar el btn
            li.appendChild(btnEliminar);
            
            //insertarlo en el html
            listaNotas.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agrega las notas actuales al storage
function sincronizarStorage(){
    localStorage.setItem('nota', JSON.stringify(notas));
}

//eliminar una nota
function borrarNota(id){
    notas = notas.filter( nota => nota.id !== id ); //trae todos los demas excepto al que le dimos clic
    crearHTML();
}

//limpiar htmñ
function limpiarHTML(){
    while(listaNotas.firstChild){ //mientras haya elemnetos
        listaNotas.removeChild(listaNotas.firstChild) //remover el primer hijo
    }
}

