import dotenv from "dotenv";
dotenv.config();

import http from "http"

import { connectDB } from "./config/db.js";
import app from "./app.js";
import { seedAdmin } from "./config/seedAdmin.js";
import { Server } from "socket.io";

let io: Server;
export { io };

const startServer = async () => {
    try {
        await connectDB();

        seedAdmin();

        const PORT = process.env.PORT || 8081;

        const server = http.createServer(app);      // creating http server from Express app

        // Attach server to Socket.IO
        io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            }
        });

        io.on("connection", (socket) => {
            console.log(`Client Connected: ${socket.id}`);

            socket.on("disconnect", () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();
