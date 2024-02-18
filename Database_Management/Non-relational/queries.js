//use of findOne

const Person = mongoose.model('Person', yourSchema);

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
const person = await Person.findOne({ 'name.last': 'Ghost' }, 'name occupation');
// Prints "Space Ghost is a talk show host".
console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation);


// Using query builder
await Person.
    find({ occupation: /host/ }).
    where('name.last').equals('Ghost').
    where('age').gt(17).lt(66).
    where('likes').in(['vaporizing', 'talking']).
    limit(10).
    sort('-occupation').
    select('name occupation').
    exec();



//Aggregation 

const docs = await Person.aggregate([{ $match: { 'name.last': 'Ghost' } }]);


//sort

const personSchema = new mongoose.Schema({
    age: Number
});

const Person2 = mongoose.model('Person', personSchema);
for (let i = 0; i < 10; i++) {
    await Person2.create({ age: i });
}

await Person2.find().sort({ age: -1 }); // returns age starting from 10 as the first entry
await Person2.find().sort({ age: 1 }); // returns age starting from 0 as the first entry


//findandupdate

const Character = mongoose.model('Character', new mongoose.Schema({
    name: String,
    age: Number
}));

await Character.create({ name: 'Jean-Luc Picard' });

const filter = { name: 'Jean-Luc Picard' };
const update = { age: 59 };

// `doc` is the document _before_ `update` was applied
let doc = await Character.findOneAndUpdate(filter, update);
doc.name; // 'Jean-Luc Picard'
doc.age; // undefined

doc = await Character.findOne(filter);
doc.age; // 59


//validation 

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
});
const Cat = db.model('Cat', schema);

// This cat has no name :(
const cat = new Cat();

let error;
try {
    await cat.save();
} catch (err) {
    error = err;
}

assert.equal(error.errors['name'].message,
    'Path `name` is required.');

error = cat.validateSync();
assert.equal(error.errors['name'].message,
    'Path `name` is required.');


//populate

const story = await Story.
    findOne({ title: 'Casino Royale' }).
    populate('author').
    exec();
// prints "The author is Ian Fleming"
console.log('The author is %s', story.author.name);


const story2 = await Story.
    findOne({ title: /casino royale/i }).
    populate('author', 'name').
    exec(); // only return the Persons name
// prints "The author is Ian Fleming"
console.log('The author is %s', story2.author.name);
// prints "The authors age is null"
console.log('The authors age is %s', story2.author.age);


const stories = await Story.find().populate({
    path: 'fans',
    options: { limit: 2 }
});

const libraries = await Library.find().populate('books.$*.author');


