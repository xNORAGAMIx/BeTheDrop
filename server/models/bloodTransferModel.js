import mongoose from 'mongoose';

const bloodTransferSchema = new mongoose.Schema({
    fromHospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals',
        required: [true, 'fromHospital id is required'],
    },
    toHospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals',
        required: [true, 'toHospital id is required'],
    },
    bloodGroup: {
        type: String,
        enum: [
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-',
        ],
        required: [true, 'blood group is required'],
    },
    quantityInML: {
        type: Number,
        required: [true, 'quantity is required'],
    },
    transferDate: {
        type: Date,
        required: [true, 'transfer date is required'],
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'recordedBy id is required'],
    },
}, { timestamps: true });

const BloodTransfer = mongoose.model('bloodTransfers', bloodTransferSchema);
export default BloodTransfer;
