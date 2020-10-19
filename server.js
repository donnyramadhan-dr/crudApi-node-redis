const express = require('express');
const redis = require('redis');
const route = require('./routes/route');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

route(app);

app.listen(3000, () => {
    console.log(`Server started on 3000`);
});