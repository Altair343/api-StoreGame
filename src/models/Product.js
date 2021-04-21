import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    imgPublicId: String,
    imgURL: String,
    categories: [
        {
          type: String,
        },
      ],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Product", productSchema);