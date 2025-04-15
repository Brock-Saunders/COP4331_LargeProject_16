const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
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

// hashing functions
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}


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
    const echeck = await db.collection('Users').find({ Email: email }).toArray();
    if (echeck.length > 0) {
        return res.status(200).json({ error: 'Email already taken' });
    }

    // check if login already taken
    const lcheck = await db.collection('Users').find({ Login: login }).toArray();
    if (lcheck.length > 0) {
        return res.status(200).json({ error: 'Login already taken' });
    }

    // HASH PASSWORD
    const hashedPassword = await hashPassword(password);
    console.log("hashed password: " + hashedPassword);

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
    var id = -1;
    var firstName = '';
    var lastName = '';
    var error = '';
    const { login, password } = req.body;

    const db = client.db();
    const user = await db.collection('Users').findOne({ login: login });
    if (!user) {
        return res.status(200).json({ error: 'Invalid login credentials' });
        console.log("user not found: " + login);
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
        return res.status(200).json({ error: 'Invalid login credentials' });
        console.log("passwords do not match: " + password + " != " + user.password);
    }
    console.log("user logged in: " + user.Login);

    var id = user._id
    var fn = user.firstName;
    var ln = user.lastName;

    var ret = { id: id, firstName: fn, lastName: ln, error: error };
    res.status(200).json(ret);
});

// GET /api/users/username
// Retrieve username (login) by userId
app.get('/api/users/username', async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
    }

    if (!/^[a-f\d]{24}$/i.test(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
    }

    try {
        const db = client.db();
        const user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ username: user.login }); // Return the login field as username
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// DOCUMENT API ENDPOINTS:

// GET /api/documents
// Display all documents | WORKING POSTMAN
app.get('/api/documents', async (req, res, next) => {
    // incoming: userId
    const { userId } = req.body;

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

    console.log("TRYING CREATE DOCUMENT");

    const { userId, title, content } = req.body;

    // check if userId is provided and valid
    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
    }
    if (!/^[a-f\d]{24}$/i.test(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
    }

    // check if title is provided
    if (!title) {
        return res.status(400).json({ error: 'Missing title parameter' });
    }

    // create new document
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

// GET /api/documents/search
// displays searched documents | working postman
app.get('/api/documents/search', async (req, res, next) => {
    // incoming: userId, searchTerm
    // outgoing: documents[], error

    console.log("TRYING SEARCH DOCUMENTS");

    const { userId, searchTerm } = req.body;

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

// GET /api/documents/:id
// GET SPECIFIC DOCUMENT | WORKING POSTMAN
app.get('/api/documents/get', async (req, res, next) => {
    // incoming: userId, documentId
    // outgoing: title, content, createdAt, updatedAt, error

    console.log("TRYING GET DOCUMENT");

    const { userId, documentId } = req.body;

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
// Update document | WORKING POSTMAN
app.put('/api/documents/update', async (req, res, next) => {
    // incoming: userId, documentId, title, content
    // outgoing: error

    console.log("TRYING UPDATE DOCUMENT");

    const { userId, documentId, title, content } = req.body;

    console.log("docId: " + documentId);
    console.log("userId: " + userId);

    if (!/^[a-f\d]{24}$/i.test(documentId)) {
        return res.status(400).json({ error: 'Invalid document ID format' });
    }

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
// Delete document | WORKING POSTMAN
app.delete('/api/documents/delete', async (req, res, next) => {
    // incoming: userId, documentId
    // outgoing: error

    console.log("TRYING DELETE DOCUMENT");

    const { userId, documentId } = req.body;

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


app.listen(5000); // start Node + Express server on port 5000