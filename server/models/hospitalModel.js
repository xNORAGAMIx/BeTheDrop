import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    website: {
        type: String,
        required: true,
        trim: true,
    },
}, {timestamps: true});

const Hospital = mongoose.model('hospitals', hospitalSchema);
export default Hospital;
// This model defines the structure of the hospital data in the MongoDB database.