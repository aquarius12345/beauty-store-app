require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db.config');
const cors = require('cors');
const adminAuth = require('./routes/adminAuth.routes');
const authMiddleware = require('./middlewares/auth.middleware');
const adminRoutes = require('./routes/admin.routes');
const productsRoutes = require('./routes/products.routes');
const userAuth = require('./routes/userAuth.routes');
const userRoutes = require('./routes/user.routes');

//Conexao
connectDB();

const app = express();

app.use(cors());

app.use(express.json());


////Rotas publicas
app.use('/', adminAuth);
app.use('/', productsRoutes);
app.use('/', userAuth);
app.use('/', userRoutes);

///Middleware
app.use(authMiddleware);

////Rotas Privadas
app.use('/', adminRoutes);




app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));