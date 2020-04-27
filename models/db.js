const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const myCon = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

myCon.connect((err) => {
    if (err) {
        console.log('Error : ' + err);

    }
    console.log(' Database connected.......')
});


module.exports = myCon;