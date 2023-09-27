const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const { pizzas, pizzaList } = require('./pizzas');
const { toppings } = require('./toppings');

const app = express();

app.use(bodyparser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/pizzas',(request,response)=>{
    database.Pizzas.find({})
    .then((resp)=>{
        console.log("FETCHED PIZZAS"+pizzaList);
        response.json(pizzaList);
       
    })
    .catch((err)=>{
        console.log("Error in get pizzas",err);
        response.status(404).send("Error in getting pizzas");
    });
});

app.get('/DIYpizza',(request,response)=>{
    database.DIYpizza.find({})
    .then((resp)=>{
        console.log("FETCHED DIYPIZZA");
        response.send(toppings);
    })
    .catch((err)=>{
        console.log("Error in get pizzas",err);
        response.status(404).send("Error in fetching DIYpizza");
    });
});


app.listen(3000,()=>{
    console.log("Server ready at port 3000");
});