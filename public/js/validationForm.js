// Todos los inputs
const productID = document.form.productID,
      productName = document.form.productName,
      supplierID = document.form.supplierID,
      categoryID = document.form.categoryID,
      quantityPerUnit = document.form.quantityPerUnit,
      unitPrice = document.form.unitPrice,
      unitsInStock = document.form.unitsInStock,
      unitsOnOrder = document.form.unitsOnOrder,
      reorderLevel = document.form.reorderLevel,
      discontinued = document.form.discontinued;

const inputs = [productID, 
                productName,
                supplierID, 
                categoryID, 
                quantityPerUnit, 
                unitPrice, 
                unitsInStock,
                unitsOnOrder,
                reorderLevel,
                discontinued
               ];

// Variable para validar si hay errores
let error = false;

// Iterador que asigna la funcion de removeClassError a los input
inputs.forEach((_input)=>{
  removeClassError(_input, _input.placeholder);
});

// Valida si todos los input cumplen con la condiciones establesidas
function validation(){

  if(isNaN(productID.value)){
    erroValidated(productID, "Este campo debé ser de tipo numerico")
  }

  if(isNaN(supplierID.value)){
    erroValidated(supplierID, "Este campo debé ser de tipo numerico")
  }

  if(isNaN(categoryID.value)){
    erroValidated(categoryID, "Este campo debé ser de tipo numerico")
  }


  if(isNaN(unitPrice.value)){
    erroValidated(unitPrice, "Este campo debé ser de tipo numerico")
  }


  if(isNaN(unitsInStock.value) || unitsInStock.value > 32767){
    erroValidated(unitsInStock, "Este campo debé ser de tipo numerico no superior a 32767");
  }
  
  
  if(isNaN(unitsOnOrder.value) || unitsOnOrder.value > 32767){
    erroValidated(unitsOnOrder, "Este campo debé ser de tipo numerico no superior a 32767");
  }
  

  if(isNaN(reorderLevel.value) || reorderLevel.value > 32767){
    erroValidated(reorderLevel, "Este campo debé ser de tipo numerico no superior a 32767");
  }


  if(isNaN(discontinued.value) || discontinued.value > 127){
    erroValidated(discontinued, "Este campo debé ser de tipo numerico no superior a 127");
  }

  if(!error){

    fetchValidated('/api/supplierID', { body: `supplierID=${supplierID.value}` })
    .then(json => json.json())
    .then(data => { data.error ? erroValidated(supplierID, "Este provedor no se encuentra registrado porfavor elija otro") : true
       return fetchValidated('/api/categoryID', { body: `categoryID=${categoryID.value}` })
      })
    .then(json => json.json())
    .then(data => { data.error ? erroValidated(categoryID, "Esta categoria no se encuentra registrada porfavor elija otra") : true})
    .then(()=>{
      if(!error){
        document.form.send.click();
      }
    });
  }
}

// Valida si todos los input estan vacios
function isEmpty(){
    error = false;
    inputs.forEach((_input)=>{
        if(_input.value === ""){
          _input.classList.add('errorValidation');
          _input.value = "";
          _input.placeholder = "Campo obligatorio";
          error = true;
        }
    });

    if(!error){
        validation();
    }
}

// Muestra un error causado por un input y le asigna una clase de error
function erroValidated(_input, _mensaje){
  _input.placeholder = _mensaje;
  _input.classList.add('errorValidation');
  _input.value = ""
  removeClassError(_input, 'ReorderLevel');
  error = true;
}

// Funcion que asigna un evento para remover la clase error a un input
function removeClassError(elementImput, placeholder){
    elementImput.addEventListener('focus', function(){
        this.classList.remove('errorValidation');
        this.placeholder = placeholder;
    });
}

// fetch que valida que existe el provedor y categoria que el cliente escriba
async function fetchValidated(url, option) {
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: option.body
  });
  return response;
}