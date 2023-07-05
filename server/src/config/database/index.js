const mongoose = require('mongoose');

async function connect() {
   try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todolist.2upbpt5.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    console.log('Connect sucessfully');
   } catch (error) {
    console.log('Connect failure' + error);
   }
}

module.exports = { connect };
