const express = require('express');
const app = express();
require('./DB/db')
const prodRouter = require('./Routes/routes')



app.use(express.json())


app.use('/api/v1/product', prodRouter);



app.listen(3003, (req, res) => {
    console.log("server is running")
})