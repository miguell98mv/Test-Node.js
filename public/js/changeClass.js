let changeClass = document.getElementById('changeClass');
let select = document.getElementById('createProduct');

// Funcion para mostrar y ocultar la interfaz de crear producto
function change(){
    if(changeClass.classList.contains('hidden')){
        changeClass.classList.remove('hidden');
    }else{
        changeClass.classList.add('hidden');
    }

    if(select.classList.contains('select')){
        select.classList.remove('select');
    }else{
        select.classList.add('select');
    }
}