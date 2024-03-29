module.exports = function loadedAtPlugin(schema, options) {
    schema.virtual('loadedAt').
        get(function () { return this._loadedAt; }).
        set(function (v) { this._loadedAt = v; });

    schema.post(['find', 'findOne'], function (docs) {
        if (!Array.isArray(docs)) {
            docs = [docs];
        }
        const now = new Date();
        for (const doc of docs) {
            doc.loadedAt = now;
        }
    });
};

// game-schema.js
const loadedAtPlugin = require('./loadedAt');
const gameSchema = new Schema({ /* ... */ });
gameSchema.plugin(loadedAtPlugin);

// player-schema.js
const loadedAtPlugin = require('./loadedAt');
const playerSchema = new Schema({ /* ... */ });
playerSchema.plugin(loadedAtPlugin);