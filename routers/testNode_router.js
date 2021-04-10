'use strict';

const controller = require('../controller/allExports');
const express = require('express');
const router = express.Router();


// Aqui estas todas las rutas de mi aplicacion

router.get('/', (req, res, next) => { res.render('index') });

router.get('/api/products', controller.products.getAllProducts);

router.post('/api/products', controller.products.insertProduct);

router.get('/api/search/', controller.products.getSearch);

router.get('/api/search/:search', controller.products.getSearch);

router.get('/api/products/:idProduct', controller.products.getOneProducts);

router.get('/api/categories/:idCategory/products', controller.products.getCategoryProducts);

router.get('/api/suppliers/:id', controller.products.getOneSupplier);

router.post('/api/supplierID', controller.products.getSupplierid);

router.post('/api/categoryID', controller.products.getCategoryid);

router.get('/api/suppliers/:id/products', controller.products.getSuppliersProducts);

router.get('/api/deletedSuppliers/:id', controller.products.deletedSuppliers);

router.get('/api/edit/:id', controller.products.getOneEdit);

router.post('/api/productos/update', controller.products.update);

router.use((req, res)=>{ 
    res.render("index", {error404: 'ERROR 404'});
});


module.exports = router;
