const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skill: { type: String, required: true },
  date: { type: Date, required: true },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

