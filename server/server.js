const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const keys=require('./config/keys'); // henüz oluşturmadın

require('./models/Players'); //henüz oluştrumadın
require('./utils/redis');
const app=express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(keys.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

require('./routes/leaderboard')(app) //henüz oluşturmadın
app.listen(port, () => console.log(`app is listening on port ${port}!`));
