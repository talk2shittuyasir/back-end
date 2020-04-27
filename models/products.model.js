const connection = require('./db');
//create constructor for products.

const Product = function(newPro) {

    this.pro_name = newPro.pro_name;
    this.price = newPro.price;
};

//add r method to create a new product;
Product.create = (newPro, result) => {
    connection.query("INSERT INTO products SET ?", newPro, (err, res) => {
        if (err) {
            console.log('error : ' + err)
            result(err, null);
            return;
        }

        console.log("Product Created Successfully" + { id: res.pro_id, ...newPro });
        result(null, { id: res.pro_id, ...newPro });
    });
};

//view all products
Product.viewAll = (result) => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log('Error : ' + err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

// view one Product

Product.viewOne = (proId, result) => {
    connection.query("SELECT * FROM products WHERE pro_id =?", [proId], (err, res) => {
        if (err) {
            console.log("error : " + err)
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Product found : ' + res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'product not found' }, null);


    });

};

// update r product 
Product.update = (proId, pro, result) => {
    connection.query("UPDATE products SET pro_name= ?, price= ? ", [pro.pro_name, pro.price, proId], (err, res) => {
        if (err) {
            console.log('error : ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            console.log('product not found');
            result({ kind: 'product not found' });
            return;

        }
        console.log('product updated......' + { pro_id: proId, ...pro });
        result(null, { pro_id: proId, ...pro });

    });

};

// remove a product

Product.removeOne = (proId, result) => {
    connection.query("DELETE FROM products WHERE pro_id = ?", [proId], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }
        // check if the customer exist
        if (res.affectedRows == 0) {

            console.log('products not found');
            result({ kind: 'product not found' });
            return;
        }
        console.log('product deleted......')
        result(null, res);

    });
};

module.exports = Product;