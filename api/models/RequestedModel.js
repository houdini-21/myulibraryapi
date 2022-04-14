const mongoose = require("mongoose");

const RequestedModel = mongoose.model("Requests", {
  idBook: { type: Schema.Types.ObjectId, ref: "Books" },
  idStudent: { type: Schema.Types.ObjectId, ref: "Users" },
  dateRequest: Date,
  dateReturn: Date,
  status: Boolean,
});

module.exports = RequestedModel;
