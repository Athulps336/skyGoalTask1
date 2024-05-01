require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db/connection');

const app = express();

app.use(express.json());
app.use(cors()); 

const router = require('./routes/router');
app.use(router);

const port = process.env.PORT || 5000; // Use process.env.PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

