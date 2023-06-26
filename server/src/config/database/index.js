const mongoose = require('mongoose');

async function connect() {
   try {
    await mongoose.connect('yourstringconnectmongodb', {
      useNewUrlParser: true,
    });
    console.log('Connect sucessfully');
   } catch (error) {
    console.log('Connect failure' + error);
   }
}

module.exports = { connect };
