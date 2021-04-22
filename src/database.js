const mongoose = require('mongoose');
import config from "./config";

mongoose.connect(config.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
    .then(db => console.log('Conexión a la DataBase'))
    .catch(err => console.log(err));