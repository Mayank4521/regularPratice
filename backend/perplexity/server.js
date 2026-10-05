import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/config/database.js';
import { testAI } from './src/services/ai.service.js';

const PORT = 3000;

try {
	await connectDB();
	await testAI();
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
} catch (error) {
	console.error('Failed to start server:', error.message);
	process.exit(1);
}
