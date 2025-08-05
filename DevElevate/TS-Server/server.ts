import { app } from "./app";
import { connectDB } from "./config/db.config";
import { MONGO_URI, PORT } from "./config/env.config";

app.listen(PORT, () => {
    if (MONGO_URI) {
        connectDB();
    } else {
        console.log('MongoDB connection skipped - PDF routes will work without database');
    }
    console.log(`Serving on http://localhost:${PORT}`);
})