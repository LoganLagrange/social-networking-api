const {Schema, model} = require("mongoose");
const dayjs = require("dayjs");
const { ObjectId } = require("bson");

const reactionSchema = new Schema (
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type:String,
            required: true
        },
        createdAt: {
            type:String,
            default: dayjs(),
            get: (value) => value.format("DD/MM/YYYY h:m")
        }
    }
)

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type:String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type:Date,
            default: dayjs(),
            get: (value) => value.format("DD/MM/YYYY h:m")
        },
        username: {
            type:String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;