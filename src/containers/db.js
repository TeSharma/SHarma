const { mongoose } = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/sharmawallet';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
};

mongoose.connect(DB_URL, OPTIONS)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));


module.exports = mongoose;