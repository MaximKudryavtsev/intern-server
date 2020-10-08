"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
class Database {
    connect() {
        this.getConnection().once("open", () => console.log("database connected"));
    }
    getConnection() {
        return mongoose.createConnection(process.env.DATABASE_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }
    getAdminModel(name, schema, collection) {
        return this.getConnection().model(name, schema, collection);
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map