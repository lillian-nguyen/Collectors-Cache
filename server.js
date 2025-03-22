import express from 'express'; // importing Express using ES modules syntax
import dotenv from 'dotenv'
dotenv.config();
import { MongoClient } from 'mongodb'; // import MongoClient with ES Modules
const app = express(); // create instance of Express app 
import path from 'path'
const dirname = path.resolve();
// set endpoint for server
const PORT = process.env.PORT;
// create uri varaible for connection string
const uri = process.env.DB_STRING;

//async function to connect to database
async function connectToDatabase(){
    try {
        //connect using connection string uri
        const client = await MongoClient.connect(uri);
        console.log('Connected to MongoDB')
        //assign database to db variable
        const db = client.db('Collection')
        // assign collectorsItem collection to items variable
        const items = db.collection('collectorsItem');
        // return items to work with it elsewhere
        return items;
        } catch(err){
            console.error(err)
    }
}

// function to hold middleware and route handlers
function createServer(items){
    // set ejs as templating engine
    app.set('view engine', 'ejs');
    //middleware: get data from req body
    app.use(express.static('public'));
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());

    // route handlers
app.get('/', async (req, res) => {
   try{ 
    //find documents in a collection
    const itemsList = await items.find().toArray();
    //log list of items
    console.log(itemsList);
    res.render('index.ejs', {itemsInfo: itemsList})
} catch(err){
    console.error(`Error retrieving list of items: ${err}`);
}
});

app.post('/addItem', async (req, res) => {
    try{
        //insert item into collection
        const result = await items.insertOne({
            name: req.body.name,
            image: req.body.imageUrl,
            owned: false
        })
        console.log(result)
        //redirect to home page
        res.redirect('/');
    } catch(err){
        console.error(`Could not add item: ${err}`)
    }
});

app.delete('/deleteItem', async (req, res) => {
    try{
        const result = await items.deleteOne({name: req.body.name});
        res.json('Item successfully deleted')
    } catch(err){
        console.error(`Failed to delete item: ${err}`)
    }
})

app.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}!`));
}

async function main(){
    try{
        //call connectToDatabase() and assign return value to items variable
        const items = await connectToDatabase();
        //call createServer() and pass in items
        createServer(items)
    } catch(err){
        console.error(`Failed to start application: ${err}`);
    }
}

//run app
main()
