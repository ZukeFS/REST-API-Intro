const express = require('express'); //Import Express
const Joi = require('joi'); //Import Joi
const app = express(); //Create Express App on the app variable
app.use(express.json()); //used the json file 

//Reason why we have used JSON file is because any application to work on, we have to put
//in a database, so we can either use MySQL ir MongoDB or any other kind of databases. Here, we 
//have used a JSON file which has a list of data that we are gonna enter and that will be stored 
//on a server. So the data is basically stored in the JSON format.

//Give data to our server
const customers = [
    {
        title : 'Zuke',
        id : 1
    },
    {
        title : 'Suicidal',
        id : 2
    },
    {
        title : 'Maxwell',
        id : 3
    },
    {
        title : 'Zzeuss',
        id : 4
    },
    {
        title : 'Sinister',
        id : 5
    }
]

//Now what we are gonna do is basically get all the data from the server, then we are gonna find
//an information of a specific customer, then we are gonna use HTTP helper/request methods, i.e. 
//GET, POST, PUT, DELETE to update information of a specific customer. 

//Read Request Handlers
//Display message when the URL consist of '/'
app.get('/', (req, res) => { //req is basically what is send from the client's side and res is 
                             //basically what is send from the server's side.
    res.send("Welcome to Zuke REST API!");
}) //GET method is basically used to read the resource.

//Display the list of customers when URL consists of API customers
app.get('/api/customers', (req, res) => {
    res.send(customers); //here we are basically returning customer object we have mentioned above
})

//Display the Information of Specific customer when we mention the id.
app.get('api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    //If there is no valid customer Id, then display an error with the following
    if(!customer) res.status(404).send('<h2 style="font-family:  Arial, Helvetica, sans-serif; color: darkred;">Ooops... Cannot find what you are looking for!</h2>');
    res.send(customer);
})

//CREATE Request Handler
//CREATE New Customer Information
app.post('api/customers', (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error){
        res/status(404).send(error.details[0].message)
        return;
    }

    //Increment the customer id:
    const customer = {
        id : customers.length + 1,
        title : req.body.title 
    };

    customers.push(customer);
    res.send(customer);
}) //POST method is basically used to create a resource.

//Update Request Handler
//Update Existing Customer Information
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family:  Arial, Helvetica, sans-serif; color: darkred;">Not found!!</h2>');

    const {error} = validateCustomer(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

    customer.title = req.body.title;
    res.send(customer);
}) //POST method is basically used to update a resource.

//Delete Request Handler
//Delete Customer Details
app.delete('/api/customers/:id', (req, res) => {
    const customer = customer.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family:  Arial, Helvetica, sans-serif; color: darkred;">Not found!!</h2>');

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
})

//Validate Information
function validateCustomer(customer){
    const schema = {
        title: Joi.string().min(3).required
    };
    return Joi.validate(customer, schema);
}

//Port Environment Variable
const port = process.env.PORT || 2396;
app.listen(port, () => console.log(`Listening to port ${port}..`));