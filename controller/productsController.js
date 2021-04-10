const dbProducts = require('../models/dbProducts');

// Aqui van todos los controllers
let products = ()=>{};

products.getAllProducts = (req, res)=>{
    dbProducts.getAllProducts((error, datos)=>{
        error ? res.render('products', {error: 'Hubo un error con la peticion products'}) : res.render('products', {datos: datos});
    });
}


products.getSearch = (req, res)=>{

    if(req.params.search){
        
        dbProducts.getSearch(req.params.search, (error, datos)=>{
            if(datos.length !== 0){
                error ? res.render('products', {error: `Hubo un error en la conexion a la Basedatos`}) : res.render('products', {datos: datos});
            }else{
                res.render('products', {error: `No se encontro ninguna concidencia para "${req.params.search}"`})
            }    
        });
    }else{
        res.render('products', {error: `Debés de escribir algo para la busqueda`})
    }
}


products.getOneProducts = (req, res) =>{
    dbProducts.getOneProducts(req.params.idProduct, (error, datos)=>{
        
        if(datos.length !== 0){
            error ? res.render('products', {error: `Hubo un error en la conexion a la Basedatos`}) : res.render('products', {datos: datos});
        }else{
           res.render('products', {error: `No hay ningun producto con el ID "${req.params.idProduct}"`})
        }
    });
}


products.insertProduct = (req, res) =>{

    let productID = req.body.productID,
        productName = req.body.productName,
        supplierID = req.body.supplierID,
        categoryID = req.body.categoryID,
        quantityPerUnit = req.body.quantityPerUnit,
        unitPrice = req.body.unitPrice,
        unitsInStock = req.body.unitsInStock,
        unitsOnOrder = req.body.unitsOnOrder,
        reorderLevel = req.body.reorderLevel,
        discontinued = req.body.discontinued;

    
    dbProducts.insertProduct(
        productID,
        productName,
        supplierID,
        categoryID,
        quantityPerUnit,
        unitPrice,
        unitsInStock,
        unitsOnOrder,
        reorderLevel,
        discontinued,
        (error, datos)=>{
        
        if(datos.length !== 0){
            error ? res.render('products', {error: `Hubo un error en la conexion a la Basedatos`}) : res.redirect('/api/products');
        }else{
           res.render('products', {error: `No hay ningun producto con el ID "${req.params.idProduct}"`})
        }
    });
}


products.getSupplierid = (req, res)=>{
    dbProducts.getSupplierid(req.body.supplierID, (error, datos)=>{
        if(datos.length !== 0){
            res.send({error: false});
        }else{
            res.send({error: true});
        }
    });
}


products.getCategoryid = (req, res)=>{
    dbProducts.getCategoryid(req.body.categoryID, (error, datos)=>{
        if(datos.length !== 0){
            res.send({error: false});
        }else{
            res.send({error: true});
        }
    });
}


products.getCategoryProducts = (req, res)=>{
    dbProducts.getCategoryProducts(req.params.idCategory, (error, datos)=>{
        if(datos.length !== 0){
            error ? res.render('category', {error: `Hubo un error en la conexion a la Basedatos`}) : res.render('category', {datos: datos});
        }else{
           res.render('category', {error: `No hay ningun categorias con el ID "${req.params.idCategory}"`})
        }
    });
}


products.getOneSupplier = (req, res)=>{
    dbProducts.getOneSupplier(req.params.id, (error, datos)=>{
        if(datos.length !== 0){
            error ? res.render('supplier', {error: `Hubo un error en la conexion a la Basedatos`}) : res.render('supplier', {datos: datos});
        }else{
           res.render('supplier', {error: `No hay ningun provedor con el ID " ${req.params.id}"`})
        }
    });
}


products.getSuppliersProducts = (req, res)=>{
    dbProducts.getSuppliersProducts(req.params.id, (error, datos)=>{
        if(datos.length !== 0){
            error ? res.render('supplier', {error: `Hubo un error en la conexion a la Basedatos`}) : res.render('supplier', {datos: datos});
        }else{
           res.render('supplier', {error: `No hay ningun provedor con el ID " ${req.params.id}"`})
        }
    });
}


products.deletedSuppliers = (req, res)=>{
    dbProducts.deletedSuppliers(req.params.id, (error, datos)=>{
        res.redirect('/')
    });
}


products.getOneEdit= (req, res) =>{
    dbProducts.getOneProducts(req.params.id, (error, datos)=>{
        
        if(datos.length !== 0){
            error ? res.render('edit', {error: `Hubo un error en la conexion a la Basedatos`}) : res.render('edit', {datos: datos});
        }else{
           res.render('edit', {error: `No hay ningun producto con el ID "${req.params.idProduct}"`})
        }
    });
}


products.update = (req, res) =>{

    let productID = req.body.productID,
        productName = req.body.productName,
        supplierID = req.body.supplierID,
        categoryID = req.body.categoryID,
        quantityPerUnit = req.body.quantityPerUnit,
        unitPrice = req.body.unitPrice,
        unitsInStock = req.body.unitsInStock,
        unitsOnOrder = req.body.unitsOnOrder,
        reorderLevel = req.body.reorderLevel,
        discontinued = req.body.discontinued;

    
    dbProducts.update(
        productID,
        productName,
        supplierID,
        categoryID,
        quantityPerUnit,
        unitPrice,
        unitsInStock,
        unitsOnOrder,
        reorderLevel,
        discontinued,
        (error, datos)=>{
            error ? res.render('products', {error: `No se pudo actualizar el producto ${productID}`}) : res.redirect('/api/products');
    });
}

module.exports = products;