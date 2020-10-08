import * as mongoose from "mongoose";
import { Connection, Model, Schema, Document } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

type TDocument<T> = T extends Document ? T : Document;

export class Database {
    connect(): void {
        this.getConnection().once("open", () => console.log("database connected"))
    }

    getConnection(): Connection {
        return mongoose.createConnection(process.env.DATABASE_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }

    getAdminModel<T>(name: string, schema: Schema, collection?: string) {
        return this.getConnection().model(name, schema, collection);
    }
}
