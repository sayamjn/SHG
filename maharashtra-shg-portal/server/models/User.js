const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    age: {
      type: Number,
      required: [true, 'Please add age']
    },
    gender: {
      type: String,
      required: [true, 'Please add gender'],
      enum: ['Male', 'Female', 'Other']
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number']
    },
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    country: {
      type: String,
      required: [true, 'Please add country']
    },
    state: {
      type: String,
      required: [true, 'Please add state']
    },
    city: {
      type: String,
      required: [true, 'Please add city']
    },
    district: {
      type: String,
      required: [true, 'Please add district']
    },
    taluka: {
      type: String,
      required: [true, 'Please add taluka']
    },
    ward: {
      type: String
    },
    aadhaar: {
      type: String
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
      required: true
    },
    role: {
      type: String,
      enum: ['member', 'secretary', 'president', 'treasurer'],
      default: 'member'
    },
    active: {
      type: Boolean,
      default: true
    },
    joinDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);