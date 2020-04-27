const Product = require('../models/products.model');

exports.create = (req, res) => {

    // check for empty input/payload
    if (!req.body) {
        res.status(404).send({
            message: 'one or more input(s) missing'
        });
    }
    //create instance of the product

    const product = new Product({
        pro_name: req.body.pro_name,
        price: req.body.price
    });

    //store the product to database
    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Internal Server error while inserting record!!!,"
            });
        } else {
            res.send(data);
        }
    });
};
// search for all products 
exports.searchAll = (req, res) => {
    Product.viewAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Internal Server error while retrieving record!!!,"
            });
        } else {
            res.send(data);
        }

    });
};
// search individual products by id;
exports.viewAProduct = (req, res) => {
    Product.viewOne(req.params.pro_id, (err, data) => {
        if (err) {
            if (err.kind === "product not found") {
                res.status(400).send({ message: 'no record found' });
            } else {
                res.status(500).send({ message: err.message || "Internal Server error while retrieving record!!!" });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    // check for errors
    if (!req.body) {
        res.status(400).send({
            message: 'one or more input(s) missing'
        });
    }
    // try updating 
    Product.update(req.params.pro_id, new Product(req.body), (err, data) => {

        if (err) {
            if (err.kind === "product not found") {
                res.status(400).send({ message: 'no record found' });
            } else {
                res.status(500).send({ message: err.message || "Internal Server error while Updating record!!!" });
            }
        } else {
            res.send(data);
        }

    });
};

exports.deleteOne = (req, res) => {
    Product.removeOne(req.params.pro_id, (err, data) => {
        if (err) {
            if (err.kind === "product not found") {
                res.status(400).send({ message: 'no record found' });
            } else {
                res.status(500).send({ message: err.message || "Internal Server error while removing record!!!" });
            }
        } else {
            res.send({ message: 'record deleted !' });
        }

    })
}