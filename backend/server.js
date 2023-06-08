const express = require('express')

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:admin@cluster0.97abxn6.mongodb.net/User?retryWrites=true&w=majority"
const client = new MongoClient(uri)

const cors = require('cors');

const app = express()
const port = 5000

app.use(cors());
app.use(express.json())

async function store(username, email, password, account_number) {
    try {
        await client.connect();
        const db = client.db('User');
        const collection = db.collection('users');

        // Find the first document in the collection
        const data = await collection.insertOne({
            username: username,
            email: email,
            password: password,
            account_number: account_number,
            date: Date()
        })
        console.log(data);
    } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
    }
}

async function find(email, password) {
    try {
        await client.connect();
        const db = client.db('User');
        const collection = db.collection('users');

        // Find the documents in the collection
        const result = await collection.find({
            email: email,
            password: password,
        }).toArray();

        console.log(result);
    } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
    }
}



app.post('/login', (req, res) => {

    console.log(req.body);

    const { email, password } = req.body

    find(email, password).catch(console.error)

    res.json(
        {
            message: "Received the data from the front end",
        }
    )


})

app.post('/signup', (req, res) => {

    console.log(req.body);

    const { username, email, password, account_number } = req.body

    store(username, email, password, account_number).catch(console.error)

    res.json(
        {
            message: "Received the data from the front end",
        }
    )
})

app.listen(
    port, () => {
        console.log(`Example app listening on port ${port}`);
    }
)