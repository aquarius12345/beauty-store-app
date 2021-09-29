require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db.config');
const cors = require('cors');

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

//Rotas publicas

//Middleware

//Rotas Privadas


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));