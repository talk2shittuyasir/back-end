module.exports = (app) => {

    const products = require('../controllers/products.controllers');

    //route to create a product.
    app.post('/products/api', products.create);

    app.get('/products/api', products.searchAll);

    app.get('/products/api/:pro_id', products.viewAProduct);

    app.put('/products/api/:pro_id', products.update);
    app.delete('/products/api/:pro_id', products.deleteOne);
};