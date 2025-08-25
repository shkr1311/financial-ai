const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(MONGO_URI);

    console.log(
      `MongoDB connected: ${connect.connection.host} [${connect.connection.name}]`
    );
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
