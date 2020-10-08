import { Schema } from "mongoose";

export const MessageSchema = new Schema({
    name: {
        type: Schema.Types.String,
        isRequired: true
    },
    message: {
        type: Schema.Types.String,
        isRequired: true
    },
    images: {
        type: [Schema.Types.String]
    }
}, {
    versionKey: false
});
