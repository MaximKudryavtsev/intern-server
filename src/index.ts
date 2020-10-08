import * as express from "express";
import * as http from "http";
import * as dotenv from "dotenv";
import * as path from "path";
import * as cors from "cors";
import * as fs from "fs";
import * as uuid from "uuid";
import * as formidable from "formidable";
import { Database } from "./database";
import { MessageSchema } from "./messageSchema";
import { values } from "lodash";
import * as io from "socket.io";

const app = express();
const server = http.createServer(app);
const db = new Database();
const socketServer = io(server)

dotenv.config({ path: ".env" });
app.use(express.json());
app.use(cors());
app.use('/static', express.static('media'))
// app.use('/static', express.static(path.join(__dirname, 'media')))
db.connect();

app.post("/messages", ((req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = `${path.resolve()}/files`;
    form.keepExtensions = true;
    form.multiples = true;
    form.parse(req, (async (err, fields, files) => {
        const fileNames: string[] = [];
        const fileList = values(files);
        for (let i = 0; i < fileList.length; i++) {
            const fileName = uuid.v4();
            fileNames.push(fileName);
            fs.renameSync(fileList[i].path, form.uploadDir + "/" + fileName)
        }
        await db.getConnection().model("messages", MessageSchema, "messages").create({
            ...fields,
            images: fileNames
        })
        socketServer.on("connection", (socket) => {
            socket.emit("updateMessages");
        })
        res.send("ok")
    }))
}))

app.get("/messages", async (req, res) => {
    const msgs = await db.getConnection().model("messages", MessageSchema, "messages").find();
    const data = msgs.map((item: any) => ({...item, images: item.images ? item.images.map((img) => `http://localhost:8080/static/${img}`) : []}))
    res.send(data);
})

server.listen(process.env.PORT, () => {
    console.log("Server connected on", process.env.PORT);
});
