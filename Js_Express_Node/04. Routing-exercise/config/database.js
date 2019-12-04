const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = config => {
    //requires both it seems
    mongoose.connect(config.dbPath, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = mongoose.connection;

    //the bottom two, you just have to read the documentation, in order to be familiar with it...

    db.once('open', err => {
        if (err) throw err;
    });


    db.on('error', reason => {
        console.log(reason);
    });
};