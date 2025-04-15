const dotenv = require('dotenv').config();
// DATABASE SETUP / CONNECTION
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_DB_CONNECTION_STRING;
const client = new MongoClient(url);
client.connect();
console.log("mongodb connection string: " + url)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// USER API ENDPOINTS:

// POST /api/users/register
// register user | WORKING POSTMAN
app.post('/api/users/register', async (req, res, next) => {
    // incoming: login, password, firstName, lastName, email
    // outgoing: error
    const { login, password, firstName, lastName, email } = req.body;

    // check if email is formatted correctly
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(200).json({ error: 'Invalid email format' });
    }

    // check if email already taken
    const db = client.db();
    const echeck = db.collection('Users').find({ Email: email }).toArray();
    if (echeck.length > 0) {
        return res.status(200).json({ error: 'Email already taken' });
    }

    // check if login already taken
    const lcheck = db.collection('Users').find({ Login: login }).toArray();
    if (lcheck.length > 0) {
        return res.status(200).json({ error: 'Login already taken' });
    }

    // HASH PASSWORD HERE ?
    const hashedPassword = password; // Replace with actual hashing logic?

    // create new user
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: hashedPassword,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    var error = '';
    try {
        const db = client.db();
        const result = await db.collection('Users').insertOne(newUser);
        console.log("user registered: " + result);
    } catch (e) {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

// POST /api/users/login
// login user | WORKING POSTMAN
app.post('/api/users/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;

    // hash password here ?
    const hashedPassword = password; // Replace with actual hashing logic?

    const db = client.db();
    const results = await
        db.collection('Users').find({ login: login, password: hashedPassword }).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if (results.length > 0) {
        id = results[0]._id;
        fn = results[0].firstName;
        ln = results[0].lastName;
    }
    var ret = { id: id, firstName: fn, lastName: ln, error: error };
    res.status(200).json(ret);
});

// DOCUMENT API ENDPOINTS:
// GET /api/documents
// Display all documents | WORKING POSTMAN
app.get('/api/documents', async (req, res, next) => {
    // incoming: userId
    const userId = req.query.userId;

    var error = '';
    // What is to be exported
    var documents = [];

    // No username provided
    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
    }

    // outgoing: documents[], error
    try {
        // Gets database connection
        const db = client.db();
        // Gets the documents, sorting by most recently updated, and turns it into an array
        documents = await db.collection('Documents').find({ userId: userId }).sort({ updatedAt: -1 }).toArray();
    } catch (e) {
        error = e.toString();
    }

    return res.status(200).json({ documents, error });
});

// POST /api/documents
// Create new document | working postman
app.post('/api/documents', async (req, res, next) => {
    // incoming: userId, title, content
    // outgoing: documentId, error
    const { userId, title, content } = req.body;

    // create new user
    const newDocument = {
        userId: userId,
        title: title,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    var id = '';
    var error = '';
    try {
        const db = client.db();
        const result = await db.collection('Documents').insertOne(newDocument);
        console.log("document created: " + result);
        id = result.insertedId.toString();
    } catch (e) {
        error = e.toString();
    }
    var ret = { documentId: id, error: error };
    res.status(200).json(ret);
});

// GET /api/documents/:id
// GET SPECIFIC DOCUMENT | CRASHING POSTMAN
app.get('/api/documents/:id', async (req, res, next) => {
    // incoming: userId, documentId
    // outgoing: title, content, createdAt, updatedAt, error

    const userId = req.query.userId;
    const documentId = req.params.id;

    if (!/^[a-f\d]{24}$/i.test(documentId)) {
        return res.status(400).json({ error: 'Invalid document ID format' });
    }

    var query = {
        _id: new ObjectId(documentId.toString()),
        userId: userId
    };

    console.log("docId: " + query._id);
    console.log("userId: " + query.userId);
    var result = '';
    var error = '';
    var ret = { error: "" }

    try {
        const db = client.db();
        result = await db.collection('Documents').findOne(query)
        console.log("document retrieved: " + result)
    }
    catch (e) {
        error = e.toString();
    }

    if (result != null) {
        ret = {
            title: result.title,
            content: result.content,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            error: error
        };
    } else if (error === "") {
        return res.status(404).json({ error: 'Document not found' });
    }

    ret.error = error;
    res.status(200).json(ret);
});

// PUT /api/documents/:id
// Update document | CRASHING POSTMAN
app.put('/api/documents/:id', async (req, res, next) => {
    // incoming: userId, documentId, title, content
    // outgoing: error

    const { userId, title, content } = req.body;
    const documentId = req.params.id;

    var filter = {
        _id: new ObjectId(documentId.toString()),
        userId: userId
    };
    var update = {
        $set: {
            title: title,
            content: content,
            updatedAt: new Date()
        }
    }
    var result = '';
    var error = '';

    try {
        const db = client.db();
        result = await db.collection('Documents').updateOne(filter, update)
        console.log("document updated?: " + result.modifiedCount)
    }
    catch (e) {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// DELETE /api/documents/:id
// Delete document | CRASHING POSTMAN
app.delete('/api/documents/:id', async (req, res, next) => {
    // incoming: userId, documentId
    // outgoing: error

    const userId = req.body.userId;
    const documentId = req.params.id;

    var query = {
        _id: new ObjectId(documentId.toString()),
        userId: userId
    };
    console.log("docId: " + query._id);
    console.log("userId: " + query.userId);
    var result = '';
    var error = '';

    try {
        const db = client.db();
        result = await db.collection('Documents').deleteOne(query)
        console.log("document retrieved: " + result)
    }
    catch (e) {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// GET /api/documents/search?q=searchTerm
// displays searched documents | crashing postman
app.get('/api/documents/search', async (req, res, next) => {
    // incoming: userId, searchTerm
    const userId = req.query.userId;
    const searchTerm = req.query.q;

    let error = '';
    let documents = [];

    // outgoing: documents[], error
    try {
        // Gets DB connection
        const db = client.db();

        // Retrieves documents by search and converts to array, sorted by most recently updated
        documents = await db.collection('Documents')
            .find({
                userId: userId,
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { content: { $regex: searchTerm, $options: 'i' } }
                ]
            })
            .sort({ updatedAt: -1 })
            .toArray();
    } catch (e) {
        error = e.toString();
    }

    return res.status(200).json({ documents, error });
});



// OLD CARDS LAB API ENDPOINTS
app.post('/api/addcard', async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    const { userId, card } = req.body;
    const newCard = { Card: card, UserId: userId };
    var error = '';
    try {
        //const db = client.db();
        const result = db.collection('Cards').insertOne(newCard);
    }
    catch (e) {
        error = e.toString();
    }
    cardList.push(card);
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.trim();
    //const db = client.db();
    const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*' } }).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push(results[i].Card);
    }
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});

app.listen(5000); // start Node + Express server on port 5000