import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    // inventoryType: {
    //   type: String,
    //   required: [true, "inventory type required"],
    //   enum: ["in", "out"],
    // },
    // bloodGroup: {
    //   type: String,
    //   required: [true, "blood group is required"],
    //   enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    // },
    // quantity: {
    //   type: Number,
    //   required: [true, "blood quanity is required"],
    // },
    // // email: {
    // //   type: String,
    // //   required: [true, "Donor email is Required"],
    // // },
    // // organisation: {
    // //   type: mongoose.Schema.Types.ObjectId,
    // //   ref: "users",
    // //   required: [true, "organisation is required"],
    // // },
    // hospital: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: function () {
    //     return this.inventoryType === "out";
    //   },
    // },
    // status: {
    //   type: String,
    //   enum: ["available", "expired", "used"],
    //   default: "available",
    // },
    // donor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: function () {
    //     return this.inventoryType === "in";
    //   },
    // },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitals",
      required: [true, "hospital is required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantityInML: {
      type: Number,
      required: [true, "blood quantity is required"],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

inventorySchema.index({ hospital: 1, bloodGroup: 1 }, { unique: true });

const inventoryModel = mongoose.model("Inventory", inventorySchema);
export default inventoryModel;
