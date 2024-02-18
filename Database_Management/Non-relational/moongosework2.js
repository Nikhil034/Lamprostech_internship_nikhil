const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/main');
mongoose.set('debug', true);

mongoose.model('User', mongoose.Schema({ name: String }));

const app = express();

app.get('/users/:tenantId', function (req, res) {
    const db = mongoose.connection.useDb(`tenant_${req.params.tenantId}`, {
        // `useCache` tells Mongoose to cache connections by database name, so
        // `mongoose.connection.useDb('foo', { useCache: true })` returns the
        // same reference each time.
        useCache: true
    });
    // Need to register models every time a new connection is created
    if (!db.models['User']) {
        db.model('User', mongoose.Schema({ name: String }));
    }
    console.log('Find users from', db.name);
    db.model('User').find().
        then(users => res.json({ users })).
        catch(err => res.status(500).json({ message: err.message }));
});

app.listen(3000);