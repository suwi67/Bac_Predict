module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/baccarat',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            retryReads: true,
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 10000,
        }
    }
}; 