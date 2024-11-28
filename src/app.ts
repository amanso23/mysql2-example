import express from "express";
import { Database } from "@/database/Database";
import { Logger } from "@/utils/Logger";
import { dbConfig } from "@/config/dbConfig";

async function startServer() {
    const logger = new Logger();
    await Database.initialize(logger, dbConfig);
    
    const userRoutes = (await import("@/routes/user.routes")).default;

    const app = express();
    app.use(express.json());
    app.use("/users", userRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer().catch((err) => {
    console.error("Error initializing the server:", err);
});








