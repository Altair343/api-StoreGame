import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
    {
        paymentId: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        ProductId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        receiptUrl: String,
        amount: Number,
        serialGame: String,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Payment", paymentSchema);