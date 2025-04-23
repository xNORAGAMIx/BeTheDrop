import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // role: {
    //   type: String,
    //   required: [true, "role is required"],
    //   enum: ["admin", "organisation", "donor", "hospital"],
    // },
    // name: {
    //   type: String,
    //   required: function () {
    //     if (this.role === "donor" || this.role === "admin") {
    //       return true;
    //     }
    //     return false;
    //   },
    // },
    // organisationName: {
    //   type: String,
    //   required: function () {
    //     if (this.role === "organisation") {
    //       return true;
    //     }
    //     return false;
    //   },
    // },
    // hospitalName: {
    //   type: String,
    //   required: function () {
    //     if (this.role === "hospital") {
    //       return true;
    //     }
    //     return false;
    //   },
    // },
    // email: {
    //   type: String,
    //   required: [true, "email is required"],
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: [true, "password is required"],
    // },
    // website: {
    //   type: String,
    // },
    // address: {
    //   type: String,
    //   required: [true, "address is required"],
    // },
    // phone: {
    //   type: String,
    //   required: [true, "phone number is required"],
    // },

    name: {
      type: String,
      required: [true, "Name is required"],
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitals",
      required: function () {
        return this.role === "hospital";
      },
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
    }, 
    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      required: [true, "Blood group is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    lastDonationDate: {
      type: Date,
    },
    healthConditions: {
      type: [String],
    },
    role: {
      type: String,
      enum: ["admin", "organisation", "donor", "hospital"],
      default: "donor",
      required: [true, "Role is required"],
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    donationHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donations",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
