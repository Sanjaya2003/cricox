// const { MongoClient } = require('mongodb');

// async function searchDocuments() {
//   const connectionString = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';

//   try {
//     const client = await MongoClient.connect(connectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('Connected to MongoDB successfully!');

//     // Specify the database and collection you want to search in
//     const databaseName = 'test';
//     const collectionName = 'user';

//     const db = client.db(databaseName);
//     const collection = db.collection(collectionName);

//     // Your search query
//     const searchQuery = {
//       age: 30, // For example, searching for documents with age greater than or equal to 25
//       // Add more conditions as needed
//     };

//     // Find documents that match the search query
//     const result = await collection.find(searchQuery).toArray();

//     console.log('Found documents:');
//     console.log(result);

//     client.close();
//     console.log('Connection closed.');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// searchDocuments();
// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1