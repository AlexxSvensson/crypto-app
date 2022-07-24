module.exports = async function() {
  const { MongoClient } = require('mongodb');
  const options = { 
                    useUnifiedTopology: true, // avoid deprecation warning
                    useNewUrlParser: true
                  };
  const url = process.env.MONGO_DB_URL;
  const port = process.env.MONGO_DB_PORT;
  let db;
  const dbName = 'crypto';
  let err, client = await MongoClient.connect(`${url}:${port}`, options);
  if (err) return console.log(err)
  db = await client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
  process.on('SIGINT', async () => {
    console.log("db shutting down")
    await db.disconnect();
    process.exit();
  });
  return db;  
}
