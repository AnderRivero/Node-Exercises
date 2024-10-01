import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"], unique: true },
  available: { type: Boolean, default: true },
  price: { type: Number, default: 0.0 },
  description: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "the user is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "the Category is required"],
  },
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, opcions) {
    delete ret._id;
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
