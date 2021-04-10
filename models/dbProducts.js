var connection = require('./dbConnection');

// Aqui van todas la cosultas MySql
let dbProducts = ()=>{};

dbProducts.getAllProducts = (db) => connection.query('SELECT * FROM products ORDER BY CategoryID ASC', db);

dbProducts.getSearch = (search, db) => connection.query('SELECT * FROM products WHERE ProductName LIKE ? OR SupplierID LIKE ? OR CategoryID LIKE ?', [search, search, search], db);

dbProducts.getOneProducts = (idProduct, db) => connection.query('SELECT * FROM products WHERE ProductID = ?', idProduct ,db);

dbProducts.getSupplierid = (supplierid, db) => connection.query('SELECT SupplierID FROM suppliers WHERE SupplierID = ?', supplierid, db);

dbProducts.getCategoryid = (categoryID , db) => connection.query('SELECT CategoryID  FROM categories WHERE CategoryID  = ?', categoryID , db);

dbProducts.insertProduct = ( 
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
    db) =>{

        connection
        .query(`INSERT INTO products (ProductID ,
        ProductName, SupplierID , CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder,
        ReorderLevel, Discontinued) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [
        productID,
        productName,
        supplierID,
        categoryID,
        quantityPerUnit,
        unitPrice,
        unitsInStock,
        unitsOnOrder,
        reorderLevel,
        discontinued
        ],
        db
        );
}

dbProducts.getCategoryProducts = (categoryID , db) => connection.query('SELECT categories.CategoryID, categories.CategoryName, categories.Description, categories.Picture, products.ProductID FROM categories NATURAL JOIN products WHERE CategoryID = ?', categoryID , db);

dbProducts.getOneSupplier = (idSupplier , db) => connection.query('SELECT * FROM suppliers WHERE SupplierID  = ?', idSupplier ,db);

dbProducts.getSuppliersProducts = (suppliersID , db) => connection.query('SELECT suppliers.SupplierID , suppliers.CompanyName, suppliers.ContactName, suppliers.ContactTitle, suppliers.Address, suppliers.City, suppliers.Region, suppliers.PostalCode, suppliers.Country, suppliers.Phone, suppliers.Fax, suppliers.HomePage, products.ProductID FROM suppliers NATURAL JOIN products WHERE SupplierID = ?', suppliersID , db);

dbProducts.deletedSuppliers = (suppliersID , db) => connection.query('DELETE FROM suppliers WHERE SupplierID = ?', suppliersID , db);

dbProducts.update = (ProductID, ProductName, SupplierID , CategoryID , QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, db) => connection.query('UPDATE products SET ProductID=?, ProductName=?, SupplierID=?, CategoryID=?, QuantityPerUnit=?, UnitPrice=?, UnitsInStock=?, UnitsOnOrder=?, ReorderLevel=?, Discontinued=? WHERE ProductID=?', [ProductID, ProductName, SupplierID , CategoryID , QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, ProductID], db);

module.exports = dbProducts;