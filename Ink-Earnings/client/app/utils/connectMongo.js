const mongoose = require('mongoose')

main().then(()=>{
    console.log('connected to db')
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const contentSchema = new Schema({
  blocks: { type: Array, required: true }
});

const Content = mongoose.model('Content', contentSchema);