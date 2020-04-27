const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'request receive' })
});

require('./routes/products.routes')(app);
app.listen(5000, () => {
    console.log('server is up and listening at port 5000');
})