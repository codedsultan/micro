import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

// Define the URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true, // Set to false to remove 'required' validation
    unique: false,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  customShortUrl: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: null,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// Create the Model from the Schema
const Url = mongoose.model('Url', urlSchema);


export default async function migrate() {

    console.log("Script started");
  try {
    console.log('Starting migration...');

    // Ensure you're connected to MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        autoIndex: true,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 60000,
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
    }

    console.log('MongoDB connection established.');

    // Step 1: Drop the existing unique index on the `longUrl` field if it exists
    const indexes = await Url.collection.indexes();
    const uniqueLongUrlIndex = indexes.find(index => index.key.longUrl === 1);

    if (uniqueLongUrlIndex) {
      console.log('Dropping the unique index for `longUrl` field...');
      await Url.collection.dropIndex(uniqueLongUrlIndex.name); // Drop the unique index
    } else {
      console.log('No unique index found for `longUrl` field.');
    }

    // Step 2: Update documents if needed (e.g., removing the required validation in schema)
    // console.log('Removing required validation from `longUrl` field...');
    // await Url.updateMany({}, { $unset: { longUrl: "" } }); // This will remove the required validation from the documents

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1); // Exit if there's an error
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}
