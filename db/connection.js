const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,{
}).then(() => {
    console.log("Mongodb connected");
}).catch((error) => {
    console.log("Mongodb Error" + error);
})
