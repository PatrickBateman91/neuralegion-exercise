const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./userRouter');
require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use(userRouter);

app.get('/', (req, res) => {
    res.send('Hello to neuralegion back end!')  
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))