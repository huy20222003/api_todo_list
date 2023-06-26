const mongoose = require('mongoose');

async function connect() {
   try {
    await mongoose.connect('mongodb://127.0.0.1/todo_list', {
      useNewUrlParser: true,
    });
    console.log('Connect sucessfully');
   } catch (error) {
    console.log('Connect failure' + error);
   }
}

module.exports = { connect };
