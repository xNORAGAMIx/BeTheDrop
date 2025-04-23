import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "donor id is required"],
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospitals",
        required: [true, "hospital id is required"],
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "recordedBy id is required"],
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
        required: [true, "blood group is required"],
    },
    quantityInML: {
        type: Number,
        required: [true, "quantity is required"],
    },
    donationDate: {
        type: Date,
        required: [true, "donation date is required"],
    },
}, {timestamps: true});

const Donation = mongoose.model("donations", donationSchema);
export default Donation;