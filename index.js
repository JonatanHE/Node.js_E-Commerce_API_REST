const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require ('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routers/authRoute");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
dbConnect();
// app.use('/', (req, res) => {
//     res.send("Hola desde el lado del servidor");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/user', authRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});