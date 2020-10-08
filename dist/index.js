"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const database_1 = require("./database");
const app = express();
const server = http.createServer(app);
const db = new database_1.Database();
dotenv.config({ path: ".env" });
app.use(express.json());
app.use('/static', express.static('media'));
db.connect();
server.listen(process.env.PORT, () => {
    console.log("Server connected on", process.env.PORT);
});
//# sourceMappingURL=index.js.map