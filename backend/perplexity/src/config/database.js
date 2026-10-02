import mongoose from 'mongoose';

export async function connectDB() {
	const mongoUri = process.env.MONGODB_URI

	if (!mongoUri) {
		throw new Error('Set MONGODB_URI or MONGO_URI in the environment');
	}

	await mongoose.connect(mongoUri);
	console.log('Connected to MongoDB');
}
