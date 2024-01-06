const {Schema, model} = require("mongoose");
const dayjs = require("dayjs");
const { ObjectId } = require("bson");

const reactionSchema = new Schema (
    {
        reactionId: {
            Type: ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            Type: String,
            required: true,
            maxLength: 280
        },
        username: {
            Type:String,
            required: true
        },
        createdAt: {
            Type:String,
            default: dayjs(),
            get: (value) => value.format("DD/MM/YYYY h:m")
        }
    }
)

const thoughtSchema = new Schema (
    {
        thoughtText: {
            Type:String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            Type:Date,
            default: dayjs(),
            get: (value) => value.format("DD/MM/YYYY h:m")
        },
        username: {
            Type:String,
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