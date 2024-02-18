const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' });
await small.save();

await Tank.create({ size: 'small' });

// or, for inserting large batches of documents
await Tank.insertMany([{ size: 'small' }]);


//await Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec();
//await Tank.deleteOne({ size: 'large' });
//await Tank.deleteOne({ size: 'large' });
//await Tank.updateOne({ size: 'large' }, { name: 'T-90' });


// const MyModel = mongoose.model('Test', new Schema({ name: String }));
// const doc = new MyModel();

// doc instanceof MyModel; // true
// doc instanceof mongoose.Model; // true
// doc instanceof mongoose.Document; // true
