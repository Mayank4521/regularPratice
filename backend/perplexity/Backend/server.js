import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/config/database.js';

const PORT = 3000;

try {
	await connectDB();
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
} catch (error) {
	console.error('Failed to start server:', error.message);
	process.exit(1);
}
