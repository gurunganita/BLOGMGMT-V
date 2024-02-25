const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const bookmarkSchema = new Schema({
  blogs: [{ type: ObjectId, required: true, ref: "Blog" }],
  users: { type: ObjectId, required: true, ref: "User" },
});
module.exports = new model("Bookmark", bookmarkSchema);
