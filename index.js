const express = require('express')//web framework
const app = express();//express object
const mongoose = require('mongoose');


//middleware for json
//body-parser is now deprecated
app.use(express.json());


//Importing routes and creating middleware to run the routes
const postroute = require('./routes/post');
app.use('/posts', postroute);


//conecting Database
const key = require('./keys').key;
mongoose.connect(key,
                   {useNewUrlParser : true, useUnifiedTopology: true},
                   () => console.log('Connected'));


//Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));


