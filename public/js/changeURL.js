const onButton = document.getElementById('button');
const onSelection = document.getElementById('selection');
const search = document.getElementById('search');


// Funcion que nos permite elegir a que api haceder
onButton.addEventListener('click', function(){

    switch(onSelection.value){
        case 'api/products':
        case 'api/search':
            window.location.href = `/${onSelection.value}/${search.value}`;
        break;

        case 'api/categories/:id/products':
            window.location.href = `/api/categories/${search.value}/products`
        break;

        case 'api/suppliers/:id':
            window.location.href = `/api/suppliers/${search.value}`
        break;

        case 'api/suppliers/:id/products':
            window.location.href = `/api/suppliers/${search.value}/products`
        break;
    }

});