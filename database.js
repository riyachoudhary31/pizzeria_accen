const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect("mongodb://localhost:27017/Pizzeria",{useNewUrlParser: true,useUnifiedTopology: true },(error)=>{
    if(error){
        console.log("Could not connect to Database.");
    }
    else{
        console.log("*********Successfully Connected to Database************");
    }

});

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    id: String,
    iname: String
});
const toppingSchema = new Schema({
    id: Number,
    tname: String,
    price: Number
})

const pizzaSchema = new Schema({
    id : Number,
    type : String,
    price : Number,
    name : String,
    image : String,
    description : String,
    ingredients: [ingredientsSchema],
    topping: [toppingSchema]

},{collection:"pizzaMenu"});

module.exports.Pizzas = mongoose.model('Pizzas',pizzaSchema);

let pizzaData = fs.readFileSync(__dirname+'/pizza.json','utf-8');
let pizzas = JSON.parse(pizzaData.trim());

// Pizzas.insertMany(pizzas)
// .then((response)=>{console.log("Entered records.",response);})
// .catch((error)=>{console.log("Error in inserting data:-",error);});


const toppingsandingredientsSchema = new Schema({
    id:Number,
    tname:String,
    price: Number,
    image:String
},{collection:"DIYpizza"});

module.exports.DIYpizza = mongoose.model('DIYpizzas',toppingsandingredientsSchema);

let toppingsData = fs.readFileSync(__dirname+'/toppingsandingredients.json','utf-8');
let toppings = JSON.parse(toppingsData.trim());

// DIYpizza.insertMany(toppings)
// .then((response)=>{
//     console.log("Entered Records.",response);
// })
// .catch((error)=>{
//     console.log("Error in inserting toppings:-",error);
// })

